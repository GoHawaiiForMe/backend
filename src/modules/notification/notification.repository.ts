import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from 'src/providers/database/mongoose/notification.schema';
import { Model } from 'mongoose';
import { NotificationProperties } from './types/notification.types';
import INotification from './domain/notification.interface';
import NotificationMapper from './domain/notification.mapper';

@Injectable()
export default class NotificationRepository {
  constructor(@InjectModel(Notification.name) private notification: Model<Notification>) {}

  async get(userId: string): Promise<INotification[]> {
    const notifications = await this.notification.find({ userId });

    return notifications.map((data) => new NotificationMapper(data).toDomain());
  }

  async findById(id: string): Promise<INotification> {
    const notification = await this.notification.findById(id).exec();

    return new NotificationMapper(notification).toDomain();
  }

  async create(data: NotificationProperties): Promise<INotification> {
    const notification = await this.notification.create(data);

    return new NotificationMapper(notification).toDomain();
  }

  async update(data: NotificationProperties): Promise<INotification> {
    const notification = await this.notification.findByIdAndUpdate(data.id, { $set: data }, { new: true });

    return new NotificationMapper(notification).toDomain();
  }
}
