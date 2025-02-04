import { Inject, Injectable } from '@nestjs/common';
import PaymentRepository from './payment.repository';
import { PaymentStatusEnum } from 'src/common/constants/paymentStatus.type';
import { PaymentToClientProperties } from 'src/common/types/payment/payment.type';
import Payment from 'src/common/domains/payment/payment.domain';
import UnauthorizedError from 'src/common/errors/unauthorizedError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { PaymentClient } from '@portone/server-sdk';
import NotFoundError from 'src/common/errors/notFoundError';
import { GetPaymentError, Payment as PaymentType } from '@portone/server-sdk/payment';
import InternalServerError from 'src/common/errors/internalServerError';
import BadRequestError from 'src/common/errors/badRequestError';

@Injectable()
export default class PaymentService {
  constructor(
    private readonly repository: PaymentRepository,
    @Inject('PAYMENT_CLIENT') private readonly portone: PaymentClient
  ) {}

  // 클라이언트 측에서 결제 완료 확인용
  async get(userId: string, paymentId: string): Promise<PaymentToClientProperties> {
    const payment = await this.repository.findById(paymentId);
    if (userId !== payment.getUserId()) {
      throw new UnauthorizedError(ErrorMessage.USER_UNAUTHORIZED);
    }

    return payment.toClient();
  }

  async create(userId: string, data: { amount: number }): Promise<PaymentToClientProperties> {
    const payment = Payment.create({ userId, amount: data.amount, status: PaymentStatusEnum.PENDING });
    const savedPayment = await this.repository.create(payment.get());

    return savedPayment.toClient();
  }

  async syncPayment(paymentId: string) {
    // DB에 결제 정보가 들어왔는지 확인하기
    const payment = await this.repository.findById(paymentId);
    if (!payment) {
      throw new NotFoundError(ErrorMessage.PAYMENT_NOT_FOUND);
    }

    // 실제 결제된 정보를 PG사에서 불러오기
    let actualPayment: PaymentType;
    try {
      actualPayment = await this.portone.getPayment({ paymentId });
    } catch (e) {
      if (e instanceof GetPaymentError) return false;
      throw e;
    }

    if (actualPayment.status !== PaymentStatusEnum.PAID) {
      throw new BadRequestError(ErrorMessage.PAYMENT_IN_PROGRESS);
    }

    // 실결제 정보와 DB 결제 정보 검증 및 동기화
    const isValidPayment = actualPayment.amount.total === payment.getAmount();
    if (!isValidPayment) {
      await this.portone.cancelPayment({ paymentId, reason: ErrorMessage.PAYMENT_AMOUNT_ERROR });
      throw new InternalServerError(ErrorMessage.PAYMENT_AMOUNT_ERROR);
    }
    payment.update(PaymentStatusEnum.PAID);
    return payment.toClient();
  }
}
