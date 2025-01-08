import { Controller, Get, Param, Patch, Post, Sse } from '@nestjs/common';
import NotificationService from './notification.service';
import { User } from 'src/decorator/user.decorator';
import { interval, map, Observable } from 'rxjs';

@Controller('notification')
export default class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get()
  async getNotification(@User() userId: string) {
    return await this.service.get(userId);
  }

  @Patch(':notificationId')
  async markAsRead(@Param('notificationId') id: string) {
    return await this.service.update(id);
  }
}
