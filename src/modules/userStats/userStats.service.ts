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

  async updateReviewData(userId: string, rating: number, isAdd?: boolean): Promise<UserStatsToClientProperties> {
    const user = await this.repository.getByUserId(userId);

    if (user !== null) {
      user.updateReviewData(rating, isAdd);
      const updatedUser = await this.repository.update(userId, user.getTotalReviews());

      return updatedUser.toObject();
    } else {
      return await this.create(userId, { totalReviews: 1, averageRating: rating });
    }
  }

  async updateTotalFollows(userId: string, isAdd?: boolean): Promise<UserStatsToClientProperties> {
    const user = await this.repository.getByUserId(userId);

    if (user !== null) {
      user.updateTotalFollows(isAdd);
      const updatedUser = await this.repository.update(userId, user.getTotalFollows());

      return updatedUser.toObject();
    } else {
      return await this.create(userId, { totalFollows: 1 });
    }
  }

  async updateTotalConfirms(userId: string, isAdd?: boolean): Promise<UserStatsToClientProperties> {
    const user = await this.repository.getByUserId(userId);

    if (user !== null) {
      user.updateTotalConfirms(isAdd);
      const updatedUser = await this.repository.update(userId, user.getTotalConfirms());

      return updatedUser.toObject();
    } else {
      return await this.create(userId, { totalConfirms: 1 });
    }
  }

  async create(userId: string, data: Partial<UserStatsProperties>): Promise<UserStatsToClientProperties> {
    const user = UserStats.create({ ...data, userId });
    const newUser = await this.repository.create(userId, user.toObject());

    return newUser.toObject();
  }
}
