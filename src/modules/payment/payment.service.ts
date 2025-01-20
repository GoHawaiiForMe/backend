import { Injectable } from '@nestjs/common';
import PaymentRepository from './payment.repository';
import { PaymentStatus } from 'src/common/constants/paymentStatus.type';
import { PaymentToClientProperties } from 'src/common/types/payment/payment.type';
import Payment from 'src/common/domains/payment/payment.domain';
import UnauthorizedError from 'src/common/errors/unauthorizedError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';

@Injectable()
export default class PaymentService {
  constructor(private readonly repository: PaymentRepository) {}

  async get(userId: string, paymentId: string): Promise<PaymentToClientProperties> {
    const payment = await this.repository.findById(paymentId);
    if (userId !== payment.getUserId()) {
      throw new UnauthorizedError(ErrorMessage.USER_UNAUTHORIZED);
    }

    return payment.toClient();
  }

  async create(userId: string, data: { amount: number }): Promise<PaymentToClientProperties> {
    const payment = new Payment({ userId, amount: data.amount, status: PaymentStatus.PENDING });
    const savedPayment = await this.repository.create(payment.get());

    return savedPayment.toClient();
  }
}
