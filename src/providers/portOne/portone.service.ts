import { Inject, Injectable } from '@nestjs/common';
import { GetPaymentError, PortOneProvider } from './portone.provider';
import { PaymentClient } from '@portone/server-sdk';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import BadRequestError from 'src/common/errors/badRequestError';

@Injectable()
export class PortOneService implements PortOneProvider {
  private client: PaymentClient;

  constructor(@Inject('PORTONE_SECRET') private readonly secret: string) {
    this.client = PaymentClient({ secret });
  }

  async getPayment(paymentId: string) {
    try {
      return await this.client.getPayment({ paymentId });
    } catch (error) {
      if (error instanceof GetPaymentError) {
        return null;
      }
      throw new GetPaymentError(ErrorMessage.PAYMENT_BAD_REQUEST);
    }
  }

  async cancelPayment(paymentId: string, reason: string): Promise<boolean> {
    try {
      await this.client.cancelPayment({ paymentId, reason });
      return true;
    } catch (error) {
      throw new BadRequestError('결제를 취소하지 못했습니다');
    }
  }
}
