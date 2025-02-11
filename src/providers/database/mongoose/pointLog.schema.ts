import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PointEventEnum } from 'src/common/constants/pointEvent.type';

@Schema({ timestamps: true })
export class PointLog {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({ isRequired: true, type: String, index: true, unique: false })
  userId: string | null;

  @Prop({ isRequired: true, type: String, enum: PointEventEnum })
  event: PointEventEnum;

  @Prop({ isRequired: true })
  value: number;
}

export type PointLogDocument = HydratedDocument<PointLog>;

const PointLogSchema = SchemaFactory.createForClass(PointLog);
export default PointLogSchema;
