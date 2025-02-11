import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import PlanModule from '../plan/plan.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [ScheduleModule.forRoot(), BullModule.registerQueue({ name: 'stats' }, { name: 'points' }), PlanModule],
  providers: [TasksService]
})
export default class TaskModule {}
