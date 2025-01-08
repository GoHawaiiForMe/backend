import { Injectable } from '@nestjs/common';
import NotificationRepository from './notification.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationProperties } from './type/notification.types';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/enums/error.message';

@Injectable()
export default class NotificationService {
  constructor(
    private readonly repository: NotificationRepository,
    private eventEmitter: EventEmitter2
  ) {}

  async get(userId: string): Promise<NotificationProperties[]> {
    const notifications = await this.repository.get(userId);

    return notifications.map((n) => n.get());
  }

  async create(userId: string, content: string): Promise<NotificationProperties> {
    const notification = await this.repository.create(userId, content);

    return notification.get();
  }

  async update(id: string): Promise<NotificationProperties> {
    const notification = await this.repository.findById(id);
    if (!notification) {
      throw new BadRequestError(ErrorMessage.NOTIFICATION_NOT_FOUND);
    }

    notification.update();
    const readNotification = await this.repository.update(notification.get());

    return readNotification.get();
  }
}
