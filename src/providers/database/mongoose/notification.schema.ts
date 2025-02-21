import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { NotificationEvent } from 'src/modules/notification/types/notification.types';

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
export type NotificationDocument = HydratedDocument<Notification> & { createdAt?: Date; updatedAt?: Date };

const NotificationSchema = SchemaFactory.createForClass(Notification);
export const NotificationModel = mongoose.model('Notification', NotificationSchema);

export default NotificationSchema;
