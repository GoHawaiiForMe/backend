import { IsInt, IsNotEmpty, IsPositive, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ReviewAllProperties } from './review.types';

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
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  pageSize: number = 5;
}

export class GetReviewsResponseDTO {
  totalCount: number;
  groupByCount?: { rating: number; count: number }[];
  list: ReviewAllProperties[];
}
