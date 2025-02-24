import { Controller, Get, Param, Patch, Sse } from '@nestjs/common';
import NotificationService from './notification.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { interval, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationProperties } from './types/notification.types';

@Controller('notifications')
export default class NotificationController {
  constructor(private readonly service: NotificationService) {}
  @Get()
  async getNotifications(@UserId() userId: string): Promise<NotificationProperties[]> {
    return await this.service.get(userId);
  }

  @Patch(':notificationId')
  async markAsRead(@Param('notificationId') id: string): Promise<NotificationProperties> {
    return await this.service.update(id);
  }

  // 로그인 시 알림 SSE stream 연결 요청
  @Sse('stream')
  stream(@UserId() userId: string): Observable<{ data: string }> {
    console.log(`SSE connection for userId: ${userId}`);

    // 40초마다 Heartbeat 전송하여 연결 유지
    const heartbeat$ = interval(40000).pipe(map(() => ({ data: 'ping' })));
    const notification$ = this.service.stream(userId).pipe(
      map((content: string) => {
        return { data: content };
      })
    );

    // Heartbeat와 알림 stream 병합
    return merge(heartbeat$, notification$);
  }
}
