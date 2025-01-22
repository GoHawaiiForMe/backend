import { Module } from '@nestjs/common';
import PrismaModule from 'src/providers/database/prisma/prisma.module';
import FollowRepository from './follow.repository';
import FollowController from './follow.controller';
import FollowService from './follow.service';
import RedisService from 'src/providers/cache/redis.service';
import UserStatsModule from '../userStats/userStats.module';

@Module({
  imports: [PrismaModule, UserStatsModule],
  controllers: [FollowController],
  providers: [FollowService, FollowRepository, RedisService],
  exports: []
})
export default class FollowModule {}
