import Payment from './payment.domain';
import { PaymentDocument } from 'src/providers/database/mongoose/payment.schema';

export default class PaymentMapper {
  constructor(private readonly payment: PaymentDocument) {}

  toDomain() {
    if (!this.payment) return null;

    return new Payment({
      id: this.payment._id.toString(),
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
