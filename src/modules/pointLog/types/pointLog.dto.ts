import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetPointLogQueryDTO {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize: number = 5;
}
