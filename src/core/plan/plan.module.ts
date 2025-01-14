import { Module } from '@nestjs/common';
import PlanController from './plan.controller';
import PlanRepository from './plan.repository';
import PlanService from './plan.service';
import UserModule from 'src/core/user/user.module';
import QuoteModule from 'src/core/quote/quote.module';

@Module({
  imports: [UserModule, QuoteModule],
  controllers: [PlanController],
  providers: [PlanRepository, PlanService],
  exports: [PlanRepository]
})
export default class PlanModule {}
