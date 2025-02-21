import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleValues, Role } from 'src/common/constants/role.type';

export default class UpdateUserDTO {
  @ApiProperty({ example: 'DEFAULT_1', enum: RoleValues })
  @IsEnum(RoleValues)
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
  phoneNumber: string;
}
