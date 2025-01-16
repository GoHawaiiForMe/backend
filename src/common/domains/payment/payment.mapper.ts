import { PaymentProperties } from 'src/common/types/payment/payment.type';
import Payment from './payment.domain';

export default class PaymentMapper {
  constructor(private readonly payment: PaymentProperties) {}

  toDomain() {
    if (!this.payment) {
      return null;
    }

    return new Payment({
      id: this.payment.id,
      userId: this.payment.userId,
      amount: this.payment.amount,
      status: this.payment.status,
      createdAt: this.payment.createdAt,
      updatedAt: this.payment.updatedAt
    });
  }
}
