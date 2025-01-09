import { Controller, Get, Param, Patch, Post, Sse } from '@nestjs/common';
import NotificationService from './notification.service';
import { User } from 'src/decorator/user.decorator';
import { map, Observable } from 'rxjs';
import { Public } from 'src/decorator/public.decorator';
import { NotificationProperties } from './type/notification.types';

@Controller('notifications')
export default class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get()
  async getNotifications(@User() userId: string): Promise<NotificationProperties[]> {
    return await this.service.get(userId);
  }

  @Patch(':notificationId')
  async markAsRead(@Param('notificationId') id: string): Promise<NotificationProperties> {
    return await this.service.update(id);
  }

  // 로그인 시 알림 SSE stream 연결 요청
  @Public()
  @Sse('stream/:userId')
  stream(@Param('userId') userId: string): Observable<any> {
    console.log(`SSE connection for userId: ${userId}`);
    return this.service.stream(userId).pipe(
      map((content: string) => {
        return { data: content };
      })
    );
  }
}
