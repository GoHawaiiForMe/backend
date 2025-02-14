import { Optional } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import validateBooleanValue from 'src/common/utilities/validateBooleanValue';

/**
 * NOTE.
 * 드리머 입장 planId, page, pageSize,
 * 메이커 입장 유저토큰, page, pageSize,
 */

export class DreamerQuoteQueryOptionsDTO {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  pageSize: number = 2;

  @IsOptional()
  @Transform(({ value }) => validateBooleanValue(value, ErrorMessage.QUOTE_BAD_REQUEST_IS_SENT))
  isConfirmed: boolean = false;
}
export class MakerQuoteQueryOptionsDTO {
  /**
   * NOTE. 보낸견적 조회, 취소된 플랜
   */
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @Type(() => Number)
  @Min(1)
  pageSize: number = 2;

  //NOTE. NestJS에서는 DTO에서 boolean값으로 변환이 이상함
  @Transform(({ value }) => validateBooleanValue(value, ErrorMessage.QUOTE_BAD_REQUEST_IS_SENT))
  @IsNotEmpty()
  isSent: boolean;
}

export class CreateQuoteDataDTO {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateQuoteDataDTO {
  @Optional()
  @IsBoolean()
  isConfirmed: boolean = true;
}
