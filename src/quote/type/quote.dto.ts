import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsBoolean, IsDefined, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import ErrorMessage from 'src/common/enums/error.message';
import BadRequestError from 'src/common/errors/badRequestError';
import { StatusEnum } from 'src/common/types/status.type';

/**
 * NOTE.
 * 드리머 입장 planId, page, pageSize, status(대기, 완료, 만료)
 * 메이커 입장 유저토큰, page, pageSize,
 */

export class DreamerQuoteQueryOptionsDTO {
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  pageSize: number = 2;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    } else {
      throw new BadRequestError(ErrorMessage.BOOLEAN_BAD_REQUEST_isSent);
    }
  })
  isConfirmed: boolean = false;
}
export class MakerQuoteQueryOptions {
  /**
   * NOTE. 보낸견적 조회, 취소된 플랜
   */
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  pageSize: number = 2;

  //NOTE. NestJS에서는 DTO에서 boolean값으로 변환이 이상함
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    } else {
      throw new BadRequestError(ErrorMessage.BOOLEAN_BAD_REQUEST_isSent);
    }
  })
  isSent: boolean;
}
/**
 * NOTE. 들어올 수 있는 값
 * 1. 내가 보낸 견적 중 뽑혔거나 대기중인 견적(isSent = true)
 * isConfirmed가 true 모두 + false지만 플랜이 PENDING 상태
 *
 * 2. 내가 보낸 견적 중 뽑힐 일이 없는 견적(isSent = false)
 * isConfirmed가 false고 플랜이 PENDING가 아닌 견적 모두
 */
