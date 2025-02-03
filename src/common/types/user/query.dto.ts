import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { MakerOrderBy } from './user.types';
import { ServiceArea, ServiceAreaEnum } from 'src/common/constants/serviceArea.type';
import { TripType, TripTypeEnum } from 'src/common/constants/tripType.type';

export class PaginationQueryDTO {
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  pageSize: number = 10;
}

export class GetMakerListQueryDTO {
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  pageSize: number = 5;

  @Transform(({ value }) => MakerOrderBy[value])
  orderBy: MakerOrderBy = MakerOrderBy.REVIEWS;

  @IsOptional()
  @IsEnum(ServiceAreaEnum)
  serviceArea: ServiceArea;

  @IsOptional()
  @IsEnum(TripTypeEnum)
  serviceType: TripType;

  @IsOptional()
  @IsString()
  keyword: string;
}
