import { OnEvent } from '@nestjs/event-emitter';
import NotificationService from './notification.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationListener {
  constructor(private readonly notification: NotificationService) {}

  @OnEvent('notification')
  async handleNotificationEvent({ userId, event, payload }): Promise<void> {
    await this.notification.create({ userId, event, payload });
  }
}
