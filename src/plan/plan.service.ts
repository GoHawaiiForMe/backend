import { Injectable } from '@nestjs/common';
import { Plan } from '@prisma/client';
import PlanRepository from './plan.repository';

@Injectable()
export default class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}
  async getPlanById(id: string): Promise<Plan> {
    const plan = await this.planRepository.finById(id);
    return plan;
  }
}
