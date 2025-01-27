import { Module } from '@nestjs/common';
import FollowRepository from './follow.repository';
import FollowController from './follow.controller';
import FollowService from './follow.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'stats'
    })
  ],
  controllers: [FollowController],
  providers: [FollowService, FollowRepository],
  exports: [FollowService]
})
export default class FollowModule {}
