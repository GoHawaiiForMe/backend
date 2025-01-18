import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import PlanService from '../plan/plan.service';
import { StatusEnum } from 'src/common/constants/status.type';

@Injectable()
export class TasksService {
  constructor(private readonly planService: PlanService) {}

  @Cron('0 0 0 * * *', { timeZone: 'Asia/Seoul' })
  async updatePlanStatus() {
    await this.planService.updateAutoStatus(StatusEnum.PENDING);
    await this.planService.updateAutoStatus(StatusEnum.CONFIRMED);
  } //TODO. 로그
}
