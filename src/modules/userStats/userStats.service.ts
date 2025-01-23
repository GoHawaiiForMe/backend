import { Injectable } from '@nestjs/common';
import UserStatsRepository from './userStats.repository';
import UserStats from 'src/common/domains/userStats/userStats.domain';
import { UserStatsProperties, UserStatsToClientProperties } from 'src/common/types/userStats/userStats.types';
import RedisService from 'src/providers/cache/redis.service';
import UserStatsMapper from 'src/common/domains/userStats/userStats.mapper';
import { IUserStats } from 'src/common/domains/userStats/userStats.interface';

@Injectable()
export default class UserStatsService {
  constructor(
    private readonly repository: UserStatsRepository,
    private readonly redis: RedisService
  ) {}

  async get(userId: string): Promise<UserStatsToClientProperties> {
    const stats = await this.redis.getStats(userId);
    let user: IUserStats = new UserStatsMapper({ ...stats, userId }).toDomain();

    if (!user.isValidStats()) {
      user = await this.repository.getByUserId(userId);
      if (!user) {
        user = UserStats.create({ userId });
      }
      await this.redis.cacheStats(userId, user.toObject());
    }

    return user.toObject();
  }

  async update(userId: string, data: Partial<UserStatsProperties>): Promise<UserStatsToClientProperties> {
    const user = await this.repository.getByUserId(userId);

    if (user !== null) {
      user.update(data);
      const updatedUser = await this.repository.update(userId, data);

      return updatedUser.toObject();
    } else {
      return await this.create(userId, data);
    }
  }

  async create(userId: string, data: Partial<UserStatsProperties>): Promise<UserStatsToClientProperties> {
    const user = UserStats.create({ ...data, userId });
    const newUser = await this.repository.create(userId, user.toObject());

    return newUser.toObject();
  }
}
