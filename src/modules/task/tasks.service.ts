import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import PlanService from '../plan/plan.service';
import { StatusValues } from 'src/common/constants/status.type';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class TasksService {
  constructor(
    private readonly planService: PlanService,
    @InjectQueue('stats') private readonly statQueue: Queue,
    @InjectQueue('points') private readonly pointQueue: Queue
  ) {}

  @Cron('0 0 0 * * *', { timeZone: 'Asia/Seoul' })
  async handleMidnightTasks() {
    await this.updatePlanStatus();
    await this.retryQueues();
  }

  private async updatePlanStatus() {
    await this.planService.autoUpdateStatus(StatusValues.PENDING);
    await this.planService.autoUpdateStatus(StatusValues.CONFIRMED);
  } //TODO. 로그

  private async retryQueues() {
    await this.statQueue.retryJobs();
    await this.pointQueue.retryJobs();
  }
}
