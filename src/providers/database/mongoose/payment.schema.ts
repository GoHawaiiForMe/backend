import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PaymentStatus } from 'src/common/constants/paymentStatus.type';

@Schema({ timestamps: true })
export class Payment {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({ type: String })
  userId: string | null;

  @Prop({ isRequired: true })
  amount: number;

  @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;
}

export type PaymentDocument = HydratedDocument<Payment>;

const PaymentSchema = SchemaFactory.createForClass(Payment);
export default PaymentSchema;
