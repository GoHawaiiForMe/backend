import { Controller, Get, Param, Patch, Post, Sse } from '@nestjs/common';
import NotificationService from './notification.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { map, Observable } from 'rxjs';
import { Public } from 'src/common/decorators/public.decorator';
import { NotificationEventName, NotificationProperties } from '../../common/types/notification/notification.types';

@Controller('notifications')
export default class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post()
  async createNotification(@UserId() userId: string) {
    return await this.service.create({
      userId,
      event: NotificationEventName.CONFIRM_QUOTE,
      payload: { nickName: '테스트' }
    });
  }

  @Get()
  async getNotifications(@UserId() userId: string): Promise<NotificationProperties[]> {
    return await this.service.get(userId);
  }

  @Patch(':notificationId')
  async markAsRead(@Param('notificationId') id: string): Promise<NotificationProperties> {
    return await this.service.update(id);
  }

  // 로그인 시 알림 SSE stream 연결 요청
  @Public()
  @Sse('stream')
  stream(@UserId() userId: string): Observable<{ data: string }> {
    console.log(`SSE connection for userId: ${userId}`);
    return this.service.stream(userId).pipe(
      map((content: string) => {
        return { data: content };
      })
    );
  }
}
