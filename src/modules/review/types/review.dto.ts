import { IsInt, IsNotEmpty, IsPositive, IsString, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ReviewAllProperties, ReviewGroupByCount } from './review.types';

export class CreateReviewDTO {
  @IsUUID()
  @IsNotEmpty()
  makerId: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  planId: string;
}

export class GetReviewsQueryDTO {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 5;
}

export class GetReviewsResponseDTO {
  totalCount: number;
  groupByCount?: ReviewGroupByCount[];
  list: ReviewAllProperties[];
}
