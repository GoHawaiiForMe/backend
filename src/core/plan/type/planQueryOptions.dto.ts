import { ServiceArea, TripType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import PlanOrder from 'src/common/enums/planOrder';

export default class PlanQueryOptionDTO {
  @Transform(({ value }) => PlanOrder[value])
  orderBy: PlanOrder = PlanOrder.RECENT;

  @IsOptional()
  @IsEnum(TripType, { each: true })
  @Transform(({ value }) => {
    return Array.isArray(value) ? value : value ? [value] : [];
  })
  tripType: TripType[];

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
