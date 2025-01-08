import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { Plan } from '@prisma/client';
import PlanService from './plan.service';
import { Public } from 'src/decorator/public.decorator';
import PlanQueryOptions from './type/planQueryOptions';
import PlanQueryOptionDTO from './type/planQueryOptions.dto';
import { User } from 'src/decorator/user.decorator';

@Controller('plans')
export default class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async getPlans(
    @User() makerId: string,
    @Query() options: PlanQueryOptionDTO
  ): Promise<{ totalCount: number; list: Plan[] }> {
    const { totalCount, list } = await this.planService.getPlans(makerId, options);
    return { totalCount, list };
  }

  @Get(':id')
  async getPlanById(@Param('id') id: string): Promise<Plan> {
    const plan = await this.planService.getPlanById(id);
    return plan;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlan(@User() requestUserId: string, @Param('id') id: string): Promise<void> {
    const plan = await this.planService.deletePlan(id, requestUserId);
  }
}
