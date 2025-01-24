import { Module } from '@nestjs/common';
import ReviewController from './review.controller';
import ReviewService from './review.service';
import ReviewRepository from './review.repository';
import PlanModule from '../plan/plan.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'stats'
    }),
    PlanModule
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: []
})
export default class ReviewModule {}
