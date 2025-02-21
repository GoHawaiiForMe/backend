import { Injectable } from '@nestjs/common';
import UserStatsRepository from './userStats.repository';

import { UserStatsProperties, UserStatsToClientProperties } from 'src/modules/userStats/types/userStats.types';
import RedisService from 'src/providers/cache/redis.service';
import { IUserStats } from './domain/userStats.interface';
import UserStatsMapper from './domain/userStats.mapper';
import UserStats from './domain/userStats.domain';

@Injectable()
export default class UserStatsService {
  constructor(
    private readonly repository: UserStatsRepository,
    private readonly redis: RedisService
  ) {}

  async get(userId: string): Promise<UserStatsToClientProperties> {
    const stats = await this.redis.getStats(userId);
    let userStats: IUserStats = new UserStatsMapper({ ...stats, userId }).toDomain();

    if (!userStats.isValidStats()) {
      userStats = await this.repository.getByUserId(userId);
      if (!userStats) {
        // TODO. UserStats 목데이터 추가 후 삭제
        userStats = UserStats.create({ userId });
      }
      await this.redis.cacheStats(userId, userStats.toObject());
    }

    return userStats.toObject();
  }

  async update(userId: string, data: Partial<UserStatsProperties>): Promise<UserStatsToClientProperties> {
    const stats = await this.repository.getByUserId(userId);

    if (stats !== null) {
      stats.update(data);
      const updatedUser = await this.repository.update(userId, data);

      return updatedUser.toObject();
    } else {
      return await this.create(userId, data);
    }
  }

  async create(userId: string, data: Partial<UserStatsProperties>): Promise<UserStatsToClientProperties> {
    const stats = UserStats.create({ ...data, userId });
    const newUserStats = await this.repository.create(userId, stats.toObject());

    return newUserStats.toObject();
  }
}
