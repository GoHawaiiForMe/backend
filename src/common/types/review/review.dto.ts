import { IsInt, IsNotEmpty, IsPositive, IsString, IsUUID } from 'class-validator';

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
