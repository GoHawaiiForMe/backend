import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { PaymentStatusEnum } from 'src/modules/payment/types/payment.type';

@Schema({ timestamps: true })
export class Payment {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({ isRequired: true, type: String, unique: true, index: true })
  paymentId: string;

  @Prop({ type: String })
  userId: string | null;

  @Prop({ isRequired: true })
  orderName: string;

  @Prop({ isRequired: true })
  amount: number;

  @Prop({ default: 'card' })
  method: string;

  @Prop({ default: 'KRW' })
  currency: string;

  @Prop({ type: String, enum: PaymentStatusEnum, default: PaymentStatusEnum.PENDING })
  status: PaymentStatusEnum;
}

export type PaymentDocument = HydratedDocument<Payment> & { createdAt?: Date; updatedAt?: Date };

const PaymentSchema = SchemaFactory.createForClass(Payment);
export const PaymentModel = mongoose.model('Payment', PaymentSchema);

export default PaymentSchema;
