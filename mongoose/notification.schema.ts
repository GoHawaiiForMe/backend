import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop()
  userId: string | null;

  @Prop({ isRequired: true })
  content: string;

  @Prop({ default: false })
  isRead: boolean;
}
export type NotificationDocument = HydratedDocument<Notification>;

const NotificationSchema = SchemaFactory.createForClass(Notification);
export default NotificationSchema;
