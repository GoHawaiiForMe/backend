import { Optional } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import ErrorMessage from 'src/common/enums/error.message';
import validateBooleanValue from 'src/common/utility/validateBooleanValue';

/**
 * NOTE.
 * 드리머 입장 planId, page, pageSize,
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
  @Transform(({ value }) => validateBooleanValue(value, ErrorMessage.QUOTE_BAD_REQUEST_IS_SENT))
  isConfirmed: boolean = false;
}
export class MakerQuoteQueryOptionsDTO {
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
  @Transform(({ value }) => validateBooleanValue(value, ErrorMessage.QUOTE_BAD_REQUEST_IS_SENT))
  isSent: boolean;
}

export class CreateQuoteDataDTO {
  @Type(() => Number)
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateQuoteDataDTO {
  //@Transform(({ value }) => validateBooleanValue(value, ErrorMessage.QUOTE_BAD_REQUEST_IS_CONFIRMED))
  @Optional()
  @IsBoolean()
  isConfirmed: boolean = true;
}
