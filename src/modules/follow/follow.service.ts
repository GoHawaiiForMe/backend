import { Injectable } from '@nestjs/common';
import FollowRepository from './follow.repository';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import Follow from '../../common/domains/follow/follow.domain';
import RedisService from 'src/providers/cache/redis.service';
import UserStatsService from '../userStats/userStats.service';

@Injectable()
export default class FollowService {
  constructor(
    private readonly repository: FollowRepository,
    private readonly redis: RedisService,
    private readonly userStats: UserStatsService
  ) {}

  async get(userId: string) {
    const follows = await this.repository.get(userId);

    const followList = await Promise.all(
      follows.map(async (follow) => {
        let makerStats = await this.redis.getStats(follow.getMakerId());
        if (!makerStats) {
          makerStats = await this.userStats.get(follow.getMakerId());
          if (!makerStats) {
            makerStats = { totalReviews: 0, averageRating: 0, totalFollows: 0, totalConfirms: 0 };
          }
          await this.redis.cacheStats(userId, makerStats);
        }
        const followData = follow.toClient();

        return { ...followData, makerStats };
      })
    );

    return followList;
  }

  // 찜 기능: Dreamer -> Maker
  async create(dreamerId: string, makerId: string): Promise<null> {
    const follow = await this.repository.find(dreamerId, makerId);

    if (follow) {
      throw new BadRequestError(ErrorMessage.FOLLOW_EXIST);
    }

    const data = new Follow({ dreamerId, makerId });
    return await this.repository.create(data.toDB());
  }

  async delete(dreamerId: string, makerId: string): Promise<null> {
    const follow = await this.repository.find(dreamerId, makerId);

    if (!follow) {
      throw new BadRequestError(ErrorMessage.FOLLOW_NOT_FOUND);
    }

    return await this.repository.delete(follow.toDB().id);
  }
}
