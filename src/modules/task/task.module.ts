import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import PlanModule from '../plan/plan.module';

@Module({
  imports: [ScheduleModule.forRoot(), PlanModule],
  providers: [TasksService]
})
export default class TaskModule {}
