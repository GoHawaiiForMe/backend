import { ServiceArea } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import PlanOrder from 'src/common/enums/planOrder';

export default class PlanQueryOptionDTO {
  @Transform(({ value }) => PlanOrder[value])
  orderBy: PlanOrder = PlanOrder.RECENT;

  @IsOptional()
  @IsString()
  keyword?: string;

  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  pageSize: number = 5;
}
