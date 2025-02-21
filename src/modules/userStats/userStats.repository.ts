import { Injectable } from '@nestjs/common';

import { UserStatsProperties } from 'src/modules/userStats/types/userStats.types';
import DBClient from 'src/providers/database/prisma/DB.client';
import { IUserStats } from './domain/userStats.interface';
import UserStatsMapper from './domain/userStats.mapper';

@Injectable()
export default class UserStatsRepository {
  constructor(private readonly db: DBClient) {}

  async getByUserId(userId: string): Promise<IUserStats> {
    const stats = await this.db.userStats.findUnique({ where: { userId } });

    return new UserStatsMapper(stats).toDomain();
  }

  async create(userId: string, data: Partial<UserStatsProperties>): Promise<IUserStats> {
    const stats = await this.db.userStats.create({ data: { userId, ...data } });

    return new UserStatsMapper(stats).toDomain();
  }

  async update(userId: string, data: Partial<UserStatsProperties>): Promise<IUserStats> {
    const stats = await this.db.userStats.update({ where: { userId }, data });

    return new UserStatsMapper(stats).toDomain();
  }
}
