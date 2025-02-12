import { IsString, IsOptional, IsDate, IsEnum, IsNotEmpty, IsInt, IsArray, Min, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import PlanOrder from 'src/common/constants/planOrder.enum';
import validateBooleanValue from 'src/common/utilities/validateBooleanValue';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { StatusValues, Status } from 'src/common/constants/status.type';
import { TripType, TripTypeValues } from 'src/common/constants/tripType.type';
import { ServiceArea, ServiceAreaValues } from 'src/common/constants/serviceArea.type';

export class CreatePlanDataDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  tripDate: Date;

  @IsEnum(TripTypeValues)
  @IsNotEmpty()
  tripType: TripType;

  @IsEnum(ServiceAreaValues)
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

export class MyPlanQueryDTO {
  @Transform(({ value }) => PlanOrder[value])
  orderBy: PlanOrder = PlanOrder.RECENT;

  @Transform(({ value }) => {
    return Array.isArray(value) ? value : value ? [value] : [];
  })
  @IsArray()
  @IsEnum(StatusValues, { each: true })
  @IsOptional()
  status: Status[];

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
  })
  reviewed: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
  })
  readyToComplete: boolean;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 3;
}

export class PlanQueryOptionDTO {
  @Transform(({ value }) => PlanOrder[value])
  orderBy: PlanOrder = PlanOrder.RECENT;

  @IsOptional()
  @IsEnum(TripTypeValues, { each: true })
  @Transform(({ value }) => {
    return Array.isArray(value) ? value : value ? [value] : [];
  })
  tripType: TripType[];

  @IsOptional()
  @Transform(({ value }) => validateBooleanValue(value, ErrorMessage.PLAN_IS_ASSIGNED_BAD_REQUEST))
  isAssigned: boolean;

  @IsOptional()
  @IsString()
  keyword?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 5;
}

export class ServiceAreaDTO {
  @Transform(({ value }) => ServiceAreaValues[value])
  @IsIn(Object.values(ServiceAreaValues))
  serviceArea: ServiceArea;
}

export type GroupByCount = {
  serviceArea?: ServiceArea;
  tripType?: TripType;
  count: number;
}[];
