import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { Plan } from '@prisma/client';
import PlanService from './plan.service';
import { Public } from 'src/decorator/public.decorator';
import PlanQueryOptions from './type/planQueryOptions';
import PlanQueryOptionDTO from './type/planQueryOptions.dto';
import { User } from 'src/decorator/user.decorator';
import CreatePlanDataDTO from './type/createPlanData.dto';
import CreatePlanData from './type/createPlanData.interface';

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

  @Post()
  async postPlan(@User() dreamerId: string, @Body() data: CreatePlanDataDTO): Promise<Plan> {
    const serviceData: CreatePlanData = { ...data, dreamerId };
    const plan = await this.planService.postPlan(serviceData);
    return plan;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlan(@User() requestUserId: string, @Param('id') id: string): Promise<void> {
    const plan = await this.planService.deletePlan(id, requestUserId);
  }
}
