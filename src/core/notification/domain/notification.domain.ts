import { NotificationProperties } from '../type/notification.types';
import INotification from './notification.interface';

export default class Notification implements INotification {
  readonly id?: string;
  readonly userId: string;
  content: string;
  isRead: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(notification: NotificationProperties) {
    this.id = notification?.id;
    this.userId = notification.userId;
    this.content = notification.content;
    this.isRead = notification.isRead;
    this.createdAt = notification?.createdAt;
    this.updatedAt = notification?.updatedAt;
  }

  static create(data: NotificationProperties) {
    return new Notification(data);
  }

  update(): void {
    this.isRead = true;
  }

  get() {
    return {
      id: this.id,
      userId: this.userId,
      content: this.content,
      isRead: this.isRead,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
