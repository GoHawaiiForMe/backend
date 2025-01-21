import { Injectable } from '@nestjs/common';
import UserStatsRepository from './userStats.repository';
import UserStats from 'src/common/domains/userStats/userStats.domain';
import { UserStatsProperties, UserStatsToClientProperties } from 'src/common/types/userStats/userStats.types';

@Injectable()
export default class UserStatsService {
  constructor(private readonly repository: UserStatsRepository) {}

  async get(userId: string): Promise<UserStatsToClientProperties> {
    const user = await this.repository.getByUserId(userId);

    return user?.toObject();
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
