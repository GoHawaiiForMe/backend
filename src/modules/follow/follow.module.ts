import { Module } from '@nestjs/common';
import PrismaModule from 'src/providers/database/prisma/prisma.module';
import FollowRepository from './follow.repository';
import FollowController from './follow.controller';
import FollowService from './follow.service';
import UserStatsModule from '../userStats/userStats.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'stats'
    }),
    PrismaModule,
    UserStatsModule
  ],
  controllers: [FollowController],
  providers: [FollowService, FollowRepository],
  exports: []
})
export default class FollowModule {}
