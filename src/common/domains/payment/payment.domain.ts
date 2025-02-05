import { PaymentProperties, PaymentStatusEnum, PaymentToClientProperties } from 'src/common/types/payment/payment.type';
import { IPayment } from './payment.interface';

export default class Payment implements IPayment {
  private readonly id?: string;
  private readonly paymentId: string;
  private readonly userId: string;
  private readonly orderName: string;
  private readonly amount: number;
  private readonly method: string;
  private readonly currency: string;
  private status: PaymentStatusEnum;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(payment: PaymentProperties) {
    this.id = payment?.id;
    this.paymentId = payment.paymentId;
    this.userId = payment.userId;
    this.orderName = payment.orderName;
    this.amount = payment.amount;
    this.method = payment.method;
    this.currency = payment.currency;
    this.status = payment.status;
    this.createdAt = payment?.createdAt;
    this.updatedAt = payment?.updatedAt;
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

  getPaymentId(): string {
    return this.paymentId;
  }

  toDB(): PaymentProperties {
    return {
      paymentId: this.paymentId,
      userId: this.userId,
      orderName: this.orderName,
      amount: this.amount,
      method: this.method,
      currency: this.currency,
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
