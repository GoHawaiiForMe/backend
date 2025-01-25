import { IsString, IsOptional, IsDate, IsEnum, IsNotEmpty, IsInt, IsBoolean, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import PlanOrder from 'src/common/constants/planOrder.enum';
import validateBooleanValue from 'src/common/utilities/validateBooleanValue';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { Status, StatusEnum } from 'src/common/constants/status.type';
import { TripType, TripTypeEnum } from 'src/common/constants/tripType.type';
import { ServiceAreaEnum } from 'src/common/constants/serviceArea.type';

export class CreatePlanDataDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  tripDate: Date;

  @IsEnum(TripTypeEnum)
  @IsNotEmpty()
  tripType: TripTypeEnum;

  @IsEnum(ServiceAreaEnum)
  @IsNotEmpty()
  serviceArea: ServiceAreaEnum;

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
  @IsEnum(StatusEnum, { each: true })
  status: StatusEnum[];

  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  pageSize: number = 3;
}

export class PlanQueryOptionDTO {
  @Transform(({ value }) => PlanOrder[value])
  orderBy: PlanOrder = PlanOrder.RECENT;

  @IsOptional()
  @IsEnum(TripTypeEnum, { each: true })
  @Transform(({ value }) => {
    return Array.isArray(value) ? value : value ? [value] : [];
  })
  tripType: TripTypeEnum[];

  @IsOptional()
  @Transform(({ value }) => validateBooleanValue(value, ErrorMessage.PLAN_IS_ASSIGNED_BAD_REQUEST))
  isAssigned: boolean;

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

export type GroupByCount = {
  tripType: TripType;
  count: number;
}[];
