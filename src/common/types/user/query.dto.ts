import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginationQueryDTO {
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  pageSize: number = 10;
}
