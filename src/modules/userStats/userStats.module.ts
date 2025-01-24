import { Module } from '@nestjs/common';
import UserStatsService from './userStats.service';
import UserStatsSchema, { UserStats } from 'src/providers/database/mongoose/userStats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import UserStatsRepository from './userStats.repository';
import RedisService from 'src/providers/cache/redis.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserStats.name, schema: UserStatsSchema }])],
  providers: [UserStatsRepository, UserStatsService, RedisService],
  exports: [UserStatsService, UserStatsRepository]
})
export default class UserStatsModule {}
