import { PaymentStatus } from 'src/common/constants/paymentStatus.type';
import { PaymentProperties, PaymentToClientProperties } from 'src/common/types/payment/payment.type';

export interface IPayment {
  update(status: PaymentStatus): void;
  getId(): string;
  getUserId(): string;
  get(): PaymentProperties;
  toClient(): PaymentToClientProperties;
}
