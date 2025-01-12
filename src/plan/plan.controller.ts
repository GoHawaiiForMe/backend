import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { Plan } from '@prisma/client';
import PlanService from './plan.service';
import PlanQueryOptionDTO from './type/planQueryOptions.dto';
import { User } from 'src/decorator/user.decorator';
import CreatePlanDataDTO from './type/createPlanData.dto';
import CreatePlanData from './type/createPlanData.interface';
import UpdateAssignDataDTO from './type/updateAssignData.dto';
import { DreamerQuoteQueryOptionsDTO } from 'src/quote/type/quote.dto';
import { QuoteToClientProperties } from 'src/quote/type/quoteProperties';

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

  @Get(':planId/quotes')
  async getQuotesByPlanId(
    @User() userId: string,
    @Param('planId') planId: string,
    @Query() options: DreamerQuoteQueryOptionsDTO
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const serviceOptions = { ...options, planId };
    const { totalCount, list } = await this.planService.getQuotesByPlanId(serviceOptions, userId);
    return { totalCount, list };
  }

  @Post()
  async postPlan(@User() dreamerId: string, @Body() data: CreatePlanDataDTO): Promise<Plan> {
    const serviceData: CreatePlanData = { ...data, dreamerId };
    const plan = await this.planService.postPlan(serviceData);
    return plan;
  }

  @Patch(':id/assign')
  async assignPlan(
    @User() requestUserId: string,
    @Param('id') id: string,
    @Body() data: UpdateAssignDataDTO
  ): Promise<Plan> {
    const plan = await this.planService.updatePlanAssign(id, requestUserId, data);
    return plan;
  }

  @Patch(':id/complete')
  async completePlan(@User() requestUserId: string, @Param('id') id: string): Promise<Plan> {
    const plan = await this.planService.updatePlanComplete(id, requestUserId);
    return plan;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlan(@User() requestUserId: string, @Param('id') id: string): Promise<void> {
    await this.planService.deletePlan(id, requestUserId);
  }
}
