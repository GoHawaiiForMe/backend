import { Inject, Injectable } from '@nestjs/common';
import { PaymentClient } from '@portone/server-sdk';
import { Payment } from '@portone/server-sdk/payment';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import InternalServerError from 'src/common/errors/internalServerError';

@Injectable()
export class PGService {
  constructor(@Inject('PAYMENT_CLIENT') private readonly client: PaymentClient) {}

  async getPayment(paymentId: string): Promise<Payment> {
    try {
      return await this.client.getPayment({ paymentId });
    } catch (e) {
      throw new InternalServerError(ErrorMessage.PAYMENT_SERVER_ERROR);
    }
  }

  async cancelPayment(paymentId: string, reason: string): Promise<void> {
    try {
      await this.client.cancelPayment({ paymentId, reason });
    } catch (error) {
      throw new InternalServerError(ErrorMessage.PAYMENT_CANCEL_SERVER_ERROR);
    }
  }
}
