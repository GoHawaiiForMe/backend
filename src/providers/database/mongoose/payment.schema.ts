import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PaymentStatusEnum } from 'src/common/constants/paymentStatus.type';

@Schema({ timestamps: true })
export class Payment {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({ type: String })
  userId: string | null;

  @Prop({ isRequired: true })
  amount: number;

  @Prop({ type: String, enum: PaymentStatusEnum, default: PaymentStatusEnum.PENDING })
  status: PaymentStatusEnum;
}

export type PaymentDocument = HydratedDocument<Payment>;

const PaymentSchema = SchemaFactory.createForClass(Payment);
export default PaymentSchema;
