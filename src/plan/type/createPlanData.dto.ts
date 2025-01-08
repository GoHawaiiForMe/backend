import { TripType, ServiceArea, User } from '@prisma/client';
import { IsString, IsOptional, IsArray, IsDate, IsEnum, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
export default class CreatePlanDataDTO {
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

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  assigneeIds: string[];
}
