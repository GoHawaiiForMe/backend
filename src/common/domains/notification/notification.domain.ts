import { NotificationEvent, NotificationProperties } from '../../types/notification/notification.types';
import INotification from './notification.interface';

export default class Notification implements INotification {
  private readonly id?: string;
  private readonly userId: string;
  private event: keyof NotificationEvent;
  private payload: NotificationEvent[keyof NotificationEvent];
  private isRead: boolean;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(notification: NotificationProperties) {
    this.id = notification?.id;
    this.userId = notification.userId;
    this.event = notification.event;
    this.payload = notification.payload;
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
      event: this.event,
      payload: this.payload,
      isRead: this.isRead,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
