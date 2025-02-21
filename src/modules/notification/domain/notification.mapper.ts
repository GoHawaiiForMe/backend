import Notification from './notification.domain';
import { NotificationDocument } from 'src/providers/database/mongoose/notification.schema';

export default class NotificationMapper {
  constructor(private readonly notification: NotificationDocument) {}

  toDomain() {
    if (!this.notification) return null;

    return new Notification({
      id: this.notification._id.toString(),
      userId: this.notification.userId,
      event: this.notification.event,
      payload: this.notification.payload,
      isRead: this.notification.isRead,
      createdAt: this.notification.createdAt,
      updatedAt: this.notification.updatedAt
    });
  }
}
