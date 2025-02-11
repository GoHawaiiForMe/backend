import { Processor, WorkerHost } from '@nestjs/bullmq';
import RedisService from '../cache/redis.service';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { Job } from 'bullmq';
import UserStatsService from 'src/modules/userStats/userStats.service';
import { UserStatsProperties } from 'src/common/types/userStats/userStats.types';
import CustomError from 'src/common/errors/customError';
import { HttpStatus } from '@nestjs/common';
import { EventType } from 'src/common/constants/event.type';

@Processor('stats')
export class UserStatsProcessor extends WorkerHost {
  constructor(
    private readonly redis: RedisService,
    private readonly StatsService: UserStatsService
  ) {
    super();
  }

  async process(job: Job<{ userId: string; event: EventType; rating?: number; isAdd: boolean }>) {
    const { userId, event, rating, isAdd } = job.data;

    // 1. 데이터 조회
    const stats = await this.StatsService.get(userId);

    // 2. 데이터 계산
    switch (event) {
      case EventType.FOLLOW:
        isAdd ? (stats.totalFollows += 1) : (stats.totalFollows -= 1);
        break;
      case EventType.REVIEW:
        stats.averageRating = isAdd
          ? (stats.averageRating * stats.totalReviews + rating) / (stats.totalReviews + 1)
          : (stats.averageRating * stats.totalReviews - rating) / (stats.totalReviews - 1);
        isAdd ? (stats.totalReviews += 1) : (stats.totalReviews -= 1);
        break;
      case EventType.CONFIRM:
        isAdd ? (stats.totalConfirms += 1) : (stats.totalConfirms -= 1);
        break;
      default:
        throw new CustomError(HttpStatus.INTERNAL_SERVER_ERROR, ErrorMessage.EVENT_NOT_FOUND);
    }

    // 3. 데이터 업데이트
    await this.redis.cacheStats(userId, stats);
    await this.updateDB(userId, stats);
  }

  async updateDB(userId: string, stats: Partial<UserStatsProperties>, retries = 5) {
    let attempt = 0;

    while (attempt < retries) {
      try {
        await this.StatsService.update(userId, stats);
        return;
      } catch (error) {
        attempt++;

        if (attempt === retries) {
          console.error('UserStats 데이터 저장 실패/임시 에러 문구');
          //로그추가 TODO. 스케줄러: 일정 시간에 쌓인 것 재시도
        }
      }
    }
  }
}
