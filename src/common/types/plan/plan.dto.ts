import { TripType, ServiceArea } from '@prisma/client';
import { IsString, IsOptional, IsDate, IsEnum, IsNotEmpty, IsInt } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import PlanOrder from 'src/common/constants/planOrder.enum';

export class CreatePlanDataDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsEnum(TripType)
  @IsNotEmpty()
  tripType: TripType;

  @IsEnum(ServiceArea)
  @IsNotEmpty()
  serviceArea: ServiceArea;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string | null;
}

export class PlanQueryOptionDTO {
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

export class UpdateAssignDataDTO {
  @IsString()
  @IsNotEmpty()
  assigneeId: string;
}
