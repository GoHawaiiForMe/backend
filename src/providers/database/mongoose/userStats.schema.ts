import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserStats {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({ type: String })
  userId: string | null;

  @Prop({ isRequired: true })
  averageRating: number;

  @Prop({ isRequired: true })
  totalReviews: number;

  @Prop({ isRequired: true })
  totalFollows: number;

  @Prop({ isRequired: true })
  totalConfirms: number;
}

export type PaymentDocument = HydratedDocument<UserStats>;

const UserStatsSchema = SchemaFactory.createForClass(UserStats);
export default UserStatsSchema;
