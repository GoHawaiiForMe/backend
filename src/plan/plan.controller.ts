import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { Plan } from '@prisma/client';
import PlanService from './plan.service';
import PlanQueryOptionDTO from './type/planQueryOptions.dto';
import { UserId } from 'src/decorator/user.decorator';
import CreatePlanDataDTO from './type/createPlanData.dto';
import CreatePlanData from './type/createPlanData.interface';
import UpdateAssignDataDTO from './type/updateAssignData.dto';
import { CreateQuoteDataDTO, DreamerQuoteQueryOptionsDTO } from 'src/quote/type/quote.dto';
import { QuoteToClientProperties } from 'src/quote/type/quoteProperties';

@Controller('plans')
export default class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async getPlans(
    @UserId() makerId: string,
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
    @UserId() userId: string,
    @Param('planId') planId: string,
    @Query() options: DreamerQuoteQueryOptionsDTO
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const serviceOptions = { ...options, planId };
    const { totalCount, list } = await this.planService.getQuotesByPlanId(serviceOptions, userId);
    return { totalCount, list };
  }

  @Post()
  async postPlan(@UserId() dreamerId: string, @Body() data: CreatePlanDataDTO): Promise<Plan> {
    const serviceData: CreatePlanData = { ...data, dreamerId };
    const plan = await this.planService.postPlan(serviceData);
    return plan;
  }

  @Post(':planId/quotes')
  async postQuote(
    @UserId() userId: string,
    @Param('planId') planId: string,
    @Body() data: CreateQuoteDataDTO
  ): Promise<QuoteToClientProperties> {
    const quote = await this.planService.postQuote(data, userId, planId);
    return quote;
  }

  @Patch(':id/assign')
  async assignPlan(
    @UserId() requestUserId: string,
    @Param('id') id: string,
    @Body() data: UpdateAssignDataDTO
  ): Promise<Plan> {
    const plan = await this.planService.updatePlanAssign(id, requestUserId, data);
    return plan;
  }

  @Patch(':id/complete')
  async completePlan(@UserId() requestUserId: string, @Param('id') id: string): Promise<Plan> {
    const plan = await this.planService.updatePlanComplete(id, requestUserId);
    return plan;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlan(@UserId() requestUserId: string, @Param('id') id: string): Promise<void> {
    await this.planService.deletePlan(id, requestUserId);
  }
}
