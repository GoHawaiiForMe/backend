import { Injectable } from '@nestjs/common';
import PaymentRepository from './payment.repository';
import { PaymentStatusEnum, PaymentToClientProperties } from 'src/common/types/payment/payment.type';
import Payment from 'src/common/domains/payment/payment.domain';
import UnauthorizedError from 'src/common/errors/unauthorizedError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import NotFoundError from 'src/common/errors/notFoundError';
import { SavePaymentDTO } from 'src/common/types/payment/payment.dto';
import { PGService } from 'src/providers/pg/pg.service';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { PointEventEnum } from 'src/common/constants/pointEvent.type';
import ConflictError from 'src/common/errors/conflictError';

@Injectable()
export default class PaymentService {
  constructor(
    @InjectQueue('points') private readonly queue: Queue,
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
      throw new ConflictError(ErrorMessage.PAYMENT_STATUS_CONFLICT);
    }

    // 실결제 정보와 DB 결제 정보 검증 및 동기화
    const isValidPayment = actualPayment.amount.total === payment.getAmount();
    if (!isValidPayment) {
      const reason = ErrorMessage.PAYMENT_AMOUNT_ERROR;
      await this.pg.cancelPayment(paymentId, reason);
      throw new ConflictError(reason);
    }
    payment.update(PaymentStatusEnum.PAID);

    const updatedPayment = await this.repository.update(payment);

    await this.queue.add('points', {
      userId: updatedPayment.getUserId(),
      event: PointEventEnum.CHARGE,
      value: updatedPayment.getAmount() / 100
    });

    return updatedPayment.toClient();
  }
}
