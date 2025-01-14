import { NotificationProperties } from 'src/common/types/notification/notification.types';
import Notification from './notification.domain';

export default class NotificationMapper {
  constructor(private readonly notification: NotificationProperties) {}

  toDomain() {
    return new Notification({
      id: this.notification.id,
      userId: this.notification.userId,
      content: this.notification.content,
      isRead: this.notification.isRead,
      createdAt: this.notification.createdAt,
      updatedAt: this.notification.updatedAt
    });
  }
}
