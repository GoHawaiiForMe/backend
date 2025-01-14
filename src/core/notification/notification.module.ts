import { Module } from '@nestjs/common';
import NotificationController from './notification.controller';
import NotificationRepository from './notification.repository';
import NotificationService from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import NotificationSchema, { Notification } from 'mongoose/notification.schema';
import { NotificationListener } from './notification.listener';

@Module({
  imports: [MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }])],
  controllers: [NotificationController],
  providers: [NotificationRepository, NotificationService, NotificationListener],
  exports: []
})
export default class NotificationModule {}
