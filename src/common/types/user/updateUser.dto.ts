import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/common/constants/role.type';

export default class UpdateUserDTO {
  @ApiProperty({ example: 'DEFAULT_1', enum: RoleEnum })
  @IsEnum(RoleEnum)
  @IsOptional()
  role: RoleEnum;

  @IsString()
  @IsOptional()
  nickName: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  newPassword: string;

  @IsString()
  @IsOptional()
  confirmNewPassword: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;
}
