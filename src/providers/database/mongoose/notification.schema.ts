import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { NotificationEvent } from 'src/common/types/notification/notification.types';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ default: null })
  isDeletedAt: Date | null;

  @Prop({ type: String })
  userId: string | null;

  @Prop({ isRequired: true, type: String })
  event: keyof NotificationEvent;

  @Prop({ isRequired: true, type: Object })
  payload: NotificationEvent[keyof NotificationEvent];

  @Prop({ default: false })
  isRead: boolean;
}
export type NotificationDocument = HydratedDocument<Notification>;

const NotificationSchema = SchemaFactory.createForClass(Notification);
export default NotificationSchema;
