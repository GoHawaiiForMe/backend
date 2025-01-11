import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import ErrorMessage from 'src/common/enums/error.message';
import BadRequestError from 'src/common/errors/badRequestError';
import { Status, StatusEnum } from 'src/common/types/status.type';

export interface QuoteQueryOptions {
  planId?: string;
  status: StatusEnum[];
  page: number;
  pageSize: number;
}
/**
 * NOTE.
 * 드리머 입장 planId, page, pageSize, status(대기, 완료, 만료)
 * 메이커 입장 유저토큰, page, pageSize,
 */

export class QuoteQueryOptionsByDreamerDTO {
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray() //NOTE. 피그마의 대기중은 PENDING+CONFIRMED
  @ArrayNotEmpty()
  @IsEnum(StatusEnum, { each: true })
  status: StatusEnum[];

  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  pageSize: number = 2;
}
// export class QuoteQueryOptionByMakerDTO {
//   /**
//    * NOTE. 보낸견적 조회, 취소된 플랜
//    */
//   @IsOptional()
//   @Type(() => Number)
//   page: number = 1;

//   @IsOptional()
//   @Type(() => Number)
//   pageSize: number = 2;
// }
