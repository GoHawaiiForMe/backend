import { Controller, Get, Param } from '@nestjs/common';
import { Plan } from '@prisma/client';
import PlanService from './plan.service';
import { Public } from 'src/decorator/public.decorator';

@Controller('plans')
export default class PlanController {
  constructor(private readonly planService: PlanService) {}
  @Public()
  @Get(':id')
  async getPlanById(@Param('id') id: string): Promise<Plan> {
    const plan = await this.planService.getPlanById(id);
    return plan;
  }
}
