import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { UserId } from 'src/common/decorators/user.decorator';
import { CreatePlanDataDTO, MyPlanQueryDTO, PlanQueryOptionDTO, ServiceAreaDTO } from 'src/common/types/plan/plan.dto';
import PlanService from './plan.service';
import { CreatePlanData, GroupByCount } from 'src/common/types/plan/plan.type';
import { CreateQuoteDataDTO, DreamerQuoteQueryOptionsDTO } from 'src/common/types/quote/quote.dto';
import { QuoteToClientProperties } from 'src/common/types/quote/quoteProperties';
import { Role } from 'src/common/decorators/roleGuard.decorator';
import { PlanToClientProperties } from 'src/common/types/plan/plan.properties';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('plans')
export default class PlanController {
  constructor(private readonly service: PlanService) {}

  @Public()
  @Get('groupCount')
  async getPlanGroupCount(
    @Query() options: ServiceAreaDTO
  ): Promise<{ totalCount: number; groupByCount: GroupByCount }> {
    const { totalCount, groupByCount } = await this.service.getPlanGroupCount(options.serviceArea);
    return { totalCount, groupByCount };
  }

  @Get('maker')
  @Role('MAKER')
  async getPlanByMaker(
    @UserId() userId: string,
    @Query() options: PlanQueryOptionDTO
  ): Promise<{ totalCount: number; groupByCount: GroupByCount; list: PlanToClientProperties[] }> {
    const { totalCount, groupByCount, list } = await this.service.getPlansByMaker(userId, options);
    return { totalCount, groupByCount, list };
  }

  @Get('dreamer')
  @Role('DREAMER')
  async getPlansByDreamer(
    @UserId() userId: string,
    @Query() options: MyPlanQueryDTO
  ): Promise<{ totalCount: number; list: PlanToClientProperties[] }> {
    const { totalCount, list } = await this.service.getPlansByDreamer(userId, options);
    return { totalCount, list };
  }

  @Get(':id')
  async getPlanById(@UserId() userId: string, @Param('id') id: string): Promise<PlanToClientProperties> {
    const plan = await this.service.getPlanById(id, userId);
    return plan;
  }

  @Get(':planId/quotes')
  @Role('DREAMER')
  async getQuotesByPlanId(
    @UserId() userId: string, //NOTE. Dreamer의 나의 플랜에 해당하는 견적 목록 조회
    @Param('planId') planId: string,
    @Query() options: DreamerQuoteQueryOptionsDTO
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const serviceOptions = { ...options, planId };
    const { totalCount, list } = await this.service.getQuotesByPlanId(serviceOptions, userId);
    return { totalCount, list };
  }

  @Post()
  @Role('DREAMER')
  async postPlan(@UserId() dreamerId: string, @Body() data: CreatePlanDataDTO): Promise<PlanToClientProperties> {
    const serviceData: CreatePlanData = { ...data, dreamerId };

    const plan = await this.service.postPlan(serviceData);
    return plan;
  }

  @Post(':planId/quotes')
  @Role('MAKER')
  async postQuote(
    @UserId() userId: string,
    @Param('planId') planId: string,
    @Body() data: CreateQuoteDataDTO
  ): Promise<QuoteToClientProperties> {
    const quote = await this.service.postQuote(data, userId, planId);
    return quote;
  }

  @Role('DREAMER')
  @Post(':id/assign')
  async requestAssignment(
    @UserId() userId: string,
    @Param('id') id: string,
    @Body() data: { assigneeId: string }
  ): Promise<PlanToClientProperties> {
    const options = { userId, id, assigneeId: data.assigneeId };
    const plan = await this.service.requestPlanAssign(options);
    return plan;
  }

  @Patch(':id/complete')
  async completePlan(@UserId() userId: string, @Param('id') id: string): Promise<PlanToClientProperties> {
    const plan = await this.service.updatePlanComplete(id, userId);
    return plan;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlan(@UserId() userId: string, @Param('id') id: string): Promise<void> {
    await this.service.deletePlan(id, userId);
  }

  @Role('MAKER')
  @Delete(':id/assign')
  @HttpCode(HttpStatus.NO_CONTENT)
  async rejectAssignment(@UserId() userId: string, @Param('id') id: string): Promise<void> {
    await this.service.rejectPlanAssign({ id, assigneeId: userId });
  }
}
