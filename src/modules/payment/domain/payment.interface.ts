import {
  PaymentProperties,
  PaymentStatusEnum,
  PaymentToClientProperties
} from 'src/modules/payment/types/payment.type';

export interface IPayment {
  update(status: PaymentStatusEnum): void;
  getId(): string;
  getUserId(): string;
  getAmount(): number;
  getPaymentId(): string;
  toDB(): PaymentProperties;
  toClient(): PaymentToClientProperties;
}
