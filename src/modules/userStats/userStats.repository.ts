import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserStats } from 'src/common/domains/userStats/userStats.interface';
import UserStatsMapper from 'src/common/domains/userStats/userStats.mapper';
import { UserStatsProperties } from 'src/common/types/userStats/userStats.types';
import { UserStats } from 'src/providers/database/mongoose/userStats.schema';

@Injectable()
export default class UserStatsRepository {
  constructor(@InjectModel(UserStats.name) private db: Model<UserStats>) {}

  async getByUserId(userId: string): Promise<IUserStats> {
    const user = await this.db.findOne({ userId }).exec();

    return new UserStatsMapper(user).toDomain();
  }

  async create(userId: string, data: Partial<UserStatsProperties>): Promise<IUserStats> {
    const user = await this.db.create({ userId, ...data });

    return new UserStatsMapper(user).toDomain();
  }

  async update(userId: string, data: Partial<UserStatsProperties>): Promise<IUserStats> {
    const user = await this.db.findOneAndUpdate({ userId }, { $set: data }, { new: true });

    return new UserStatsMapper(user).toDomain();
  }
}
