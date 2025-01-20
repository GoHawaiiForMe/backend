import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/common/constants/role.type';

export default class UpdateUserDTO {
  @ApiProperty({ example: 'DEFAULT_1', enum: Role })
  @IsEnum(Role)
  @IsOptional()
  role: Role;

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
