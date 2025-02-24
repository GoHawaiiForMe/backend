import { Module } from '@nestjs/common';
import UserModule from 'src/modules/user/user.module';
import QuoteModule from 'src/modules/quote/quote.module';
import PlanController from './plan.controller';
import PlanRepository from './plan.repository';
import PlanService from './plan.service';
import ChatRoomModule from '../chatRoom/chatRoom.module';
import { BullModule } from '@nestjs/bullmq';
import ProfileModule from '../profile/profile.module';

@Module({
  imports: [BullModule.registerQueue({ name: 'points' }), UserModule, ProfileModule, QuoteModule, ChatRoomModule],
  controllers: [PlanController],
  providers: [PlanRepository, PlanService],
  exports: [PlanRepository, PlanService]
})
export default class PlanModule {}
