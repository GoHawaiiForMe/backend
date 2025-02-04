import { PaymentStatusEnum } from 'src/common/constants/paymentStatus.type';
import { PaymentProperties, PaymentToClientProperties } from 'src/common/types/payment/payment.type';
import { IPayment } from './payment.interface';

export default class Payment implements IPayment {
  private readonly id?: string;
  private readonly userId: string;
  private readonly amount: number;
  private status: PaymentStatusEnum;

  constructor(payment: PaymentProperties) {
    this.id = payment?.id;
    this.userId = payment.userId;
    this.amount = payment.amount;
    this.status = payment.status;
  }

  static create(data: PaymentProperties) {
    return new Payment(data);
  }

  update(status: PaymentStatusEnum): void {
    this.status = status;
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getAmount(): number {
    return this.amount;
  }

  get(): PaymentProperties {
    return {
      id: this.id,
      userId: this.userId,
      amount: this.amount,
      status: this.status
    };
  }

  toClient(): PaymentToClientProperties {
    return {
      id: this.id,
      amount: this.amount,
      status: this.status
    };
  }
}
