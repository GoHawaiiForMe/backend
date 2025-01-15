import { Module } from '@nestjs/common';
import UserModule from 'src/modules/user/user.module';
import QuoteModule from 'src/modules/quote/quote.module';
import PlanController from './plan.controller';
import PlanRepository from './plan.repository';
import PlanService2 from './plan.service';

@Module({
  imports: [UserModule, QuoteModule],
  controllers: [PlanController],
  providers: [PlanRepository, PlanService2],
  exports: [PlanRepository]
})
export default class PlanModule {}
