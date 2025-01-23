import { Module } from '@nestjs/common';
import ReviewController from './review.controller';
import ReviewService from './review.service';
import ReviewRepository from './review.repository';
import PlanModule from '../plan/plan.module';

@Module({
  imports: [PlanModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: []
})
export default class ReviewModule {}
