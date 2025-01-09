import { TripType, ServiceArea } from '@prisma/client';
import { IsString, IsOptional, IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
export default class CreatePlanDataDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsEnum(TripType)
  tripType: TripType;

  @IsEnum(ServiceArea)
  serviceArea: ServiceArea;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsOptional()
  @IsString()
  address?: string | null;
}
