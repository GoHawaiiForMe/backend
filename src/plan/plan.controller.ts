import { Controller, Get, Param, Query } from '@nestjs/common';
import { Plan } from '@prisma/client';
import PlanService from './plan.service';
import { Public } from 'src/decorator/public.decorator';
import PlanQueryOptions from './type/planQueryOptions';
import PlanQueryOptionDTO from './type/planQueryOptions.dto';
import { User } from 'src/decorator/user.decorator';

@Controller('plans')
export default class PlanController {
  constructor(private readonly planService: PlanService) {}

  //@Public()
  @Get()
  async getPlans(
    @User() dreamerId: string,
    @Query() options: PlanQueryOptionDTO
  ): Promise<{ totalCount: number; list: Plan[] }> {
    const serviceOption: PlanQueryOptions = { ...options, dreamerId };
    const { totalCount, list } = await this.planService.getPlans(serviceOption);
    return { totalCount, list };
  }

  //@Public()
  @Get(':id')
  async getPlanById(@User() dreamerId: string, @Param('id') id: string): Promise<Plan> {
    console.log(dreamerId);
    const plan = await this.planService.getPlanById(id);
    return plan;
  }
}
