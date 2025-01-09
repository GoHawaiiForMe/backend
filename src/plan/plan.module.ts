import { Module } from '@nestjs/common';
import PlanController from './plan.controller';
import PlanRepository from './plan.repository';
import PlanService from './plan.service';
import UserModule from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PlanController],
  providers: [PlanRepository, PlanService]
})
export default class PlanModule {}
