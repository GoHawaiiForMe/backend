import { Injectable } from '@nestjs/common';
import NotificationRepository from './notification.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEvent, NotificationProperties } from './types/notification.types';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { Observable } from 'rxjs';

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

  async create(data: NotificationProperties): Promise<NotificationProperties> {
    const notification = await this.repository.create(data);

    const content = this.createMessage(data.event, data.payload);
    this.eventEmitter.emit(`notification:${data.userId}`, { content });

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

  stream(userId: string): Observable<string> {
    return new Observable((subscriber) => {
      const handler = (data: { content: string }) => {
        subscriber.next(data.content);
      };

      this.eventEmitter.on(`notification:${userId}`, handler);

      return () => {
        this.eventEmitter.off(`notification:${userId}`, handler);
      };
    });
  }

  createMessage<K extends keyof NotificationEvent>(event: K, props: NotificationEvent[K]): string {
    const notificationTemplates: {
      [K in keyof NotificationEvent]: (props: NotificationEvent[K]) => string;
    } = {
      ARRIVE_QUOTE: ({ nickName, tripType }) => `${nickName} Maker의 ${tripType} 견적이 도착했어요.`,
      CONFIRM_QUOTE: ({ nickName }) => `${nickName} Maker의 견적이 확정되었어요.`,
      REJECT_REQUEST: ({ nickName, planTitle }) => `${nickName} Maker가 ${planTitle} 지정견적 요청을 반려했어요.`,
      ARRIVE_REQUEST: ({ nickName, tripType }) => `${nickName} Dreamer가 ${tripType} 지정견적을 요청했어요.`,
      CONFIRM_REQUEST: ({ nickName }) => `${nickName} Dreamer의 견적이 확정되었어요.`,
      REJECT_QUOTE: ({ nickName, planTitle }) => `${nickName} Dreamer가 ${planTitle} 견적을 반려했어요.`,
      SCHEDULE: ({ planTitle }) => `내일은 ${planTitle} 여행 예정일이에요.`
    };

    const content = notificationTemplates[event];

    return content(props);
  }
}
