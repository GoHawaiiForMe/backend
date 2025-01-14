import { Injectable } from '@nestjs/common';
import NotificationMapper from './domain/notification.mapper';
import INotification from './domain/notification.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from 'mongoose/notification.schema';
import { Model } from 'mongoose';
import { NotificationProperties } from './type/notification.types';

@Injectable()
export default class NotificationRepository {
  constructor(@InjectModel(Notification.name) private notification: Model<Notification>) {}

  async get(userId: string): Promise<INotification[]> {
    const notifications = await this.notification.find({ userId });

    return notifications.map((data) => new NotificationMapper(data).toDomain());
  }

  async findById(id: string): Promise<INotification> {
    const notification = await this.notification.findById(id).exec();
    const data = { ...notification.toObject(), id: notification._id.toString() };

    return new NotificationMapper(data).toDomain();
  }

  async create(userId: string, content: string): Promise<INotification> {
    const notification = await this.notification.create({
      userId,
      content
    });

    return new NotificationMapper(notification).toDomain();
  }

  async update(data: NotificationProperties): Promise<INotification> {
    const notification = await this.notification.findByIdAndUpdate(data.id, { $set: data }, { new: true });

    return new NotificationMapper(notification).toDomain();
  }
}
