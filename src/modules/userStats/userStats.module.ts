import { Module } from '@nestjs/common';
import UserStatsService from './userStats.service';
import UserStatsRepository from './userStats.repository';
import RedisService from 'src/providers/cache/redis.service';

@Module({
  imports: [],
  providers: [UserStatsRepository, UserStatsService, RedisService],
  exports: [UserStatsService, UserStatsRepository]
})
export default class UserStatsModule {}
