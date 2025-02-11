import { Injectable } from '@nestjs/common';
import PaymentRepository from './payment.repository';
import { PaymentStatusEnum, PaymentToClientProperties } from 'src/common/types/payment/payment.type';
import Payment from 'src/common/domains/payment/payment.domain';
import UnauthorizedError from 'src/common/errors/unauthorizedError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import NotFoundError from 'src/common/errors/notFoundError';
import InternalServerError from 'src/common/errors/internalServerError';
import BadRequestError from 'src/common/errors/badRequestError';
import { SavePaymentDTO } from 'src/common/types/payment/payment.dto';
import { PGService } from 'src/providers/pg/pg.service';

@Injectable()
export default class PaymentService {
  constructor(
    private readonly repository: PaymentRepository,
    private readonly pg: PGService
  ) {}

  // 클라이언트 측에서 결제 완료 확인용
  async get(userId: string, paymentId: string): Promise<PaymentToClientProperties> {
    const payment = await this.repository.findById(paymentId);
    if (userId !== payment.getUserId()) {
      throw new UnauthorizedError(ErrorMessage.USER_UNAUTHORIZED);
    }

    return payment.toClient();
  }

  async create(userId: string, data: SavePaymentDTO): Promise<PaymentToClientProperties> {
    const payment = Payment.create({ userId, ...data, status: PaymentStatusEnum.PENDING });
    const savedPayment = await this.repository.create(payment.toDB());

    return savedPayment.toClient();
  }

  async syncPayment(id: string): Promise<PaymentToClientProperties> {
    // DB에 결제 정보가 들어왔는지 확인하기
    const payment = await this.repository.findById(id);
    if (!payment) {
      throw new NotFoundError(ErrorMessage.PAYMENT_NOT_FOUND);
    }
    const paymentId = payment.getPaymentId();

    // 실제 결제된 정보를 PG사에서 불러오기
    const actualPayment = await this.pg.getPayment(paymentId);

    if (actualPayment.status !== PaymentStatusEnum.PAID) {
      throw new BadRequestError(ErrorMessage.PAYMENT_STATUS_BAD_REQUEST);
    }

    // 실결제 정보와 DB 결제 정보 검증 및 동기화
    const isValidPayment = actualPayment.amount.total === payment.getAmount();
    if (!isValidPayment) {
      const reason = ErrorMessage.PAYMENT_AMOUNT_ERROR;
      await this.pg.cancelPayment(paymentId, reason);
      throw new InternalServerError(ErrorMessage.PAYMENT_AMOUNT_ERROR);
    }
    payment.update(PaymentStatusEnum.PAID);

    const updatedPayment = await this.repository.update(payment);
    return updatedPayment.toClient();
  }
}
