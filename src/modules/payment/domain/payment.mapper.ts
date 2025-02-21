import { PaymentProperties } from 'src/modules/payment/types/payment.type';
import Payment from './payment.domain';

export default class PaymentMapper {
  constructor(private readonly payment: PaymentProperties) {}

  toDomain() {
    if (!this.payment) {
      return null;
    }

    return new Payment({
      id: this.payment.id,
      paymentId: this.payment.paymentId,
      userId: this.payment.userId,
      orderName: this.payment.orderName,
      amount: this.payment.amount,
      method: this.payment.method,
      currency: this.payment.currency,
      status: this.payment.status,
      createdAt: this.payment.createdAt,
      updatedAt: this.payment.updatedAt
    });
  }
}
