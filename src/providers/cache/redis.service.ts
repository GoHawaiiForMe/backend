import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { UserStatsToClientProperties } from 'src/common/types/userStats/userStats.types';

@Injectable()
export default class RedisService {
  // userStats 데이터를 식별하기 위한 key prefix 추가 (추후 별도의 redis 캐싱 작업 늘어날 경우를 대비)
  private readonly userStatsKey = process.env.USER_STATS_KEY_PREFIX;

  constructor(@Inject('REDIS') private readonly redis: Redis) {}

  async getStats(userId: string): Promise<UserStatsToClientProperties> {
    const key = `${this.userStatsKey}:${userId}`;
    const data = await this.redis.hgetall(key);

    if (Object.keys(data).length > 0) {
      return {
        totalReviews: Number(data.totalReviews || 0),
        averageRating: Number(data.averageRating || 0),
        totalFollows: Number(data.totalFollows || 0),
        totalConfirms: Number(data.totalConfirms || 0)
      };
    }
    return null;
  }

  async cacheStats(userId: string, stats: Partial<UserStatsToClientProperties>): Promise<void> {
    const key = `${this.userStatsKey}:${userId}`;
    await this.redis.hmset(key, {
      totalReviews: stats.totalReviews.toString(),
      averageRating: stats.averageRating.toString(),
      totalFollows: stats.totalFollows.toString(),
      totalConfirms: stats.totalConfirms.toString()
    });
    await this.redis.expire(key, 86400); // 캐싱 데이터 만료 임시 설정: 24시간
  }
}
