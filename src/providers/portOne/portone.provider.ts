import { Payment } from '@portone/server-sdk/dist/generated/payment';

export interface PortOneProvider {
  getPayment(paymentId: string): Promise<Payment | null>;
  cancelPayment(paymentId: string, reason: string): Promise<boolean>;
}

export class GetPaymentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentError';
  }
}
