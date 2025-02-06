import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProfileImage, ProfileImageEnum } from 'src/common/constants/image.type';
import { OAuthProviderEnum } from 'src/common/constants/oauth.type';
import { Role, RoleEnum } from 'src/common/constants/role.type';
import { ServiceArea, ServiceAreaEnum } from 'src/common/constants/serviceArea.type';
import { TripType, TripTypeEnum } from 'src/common/constants/tripType.type';

export class SignupUserDTO {
  @ApiProperty({ example: 'DEFAULT_1', enum: RoleEnum })
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: Role;

  @IsNotEmpty()
  nickName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  provider: OAuthProviderEnum;

  @IsString()
  @IsOptional()
  providerId: string;
}

export class SignupProfileDTO {
  @ApiProperty({ example: 'DEFAULT_1', enum: ProfileImageEnum })
  @IsEnum(ProfileImageEnum)
  @IsNotEmpty()
  image: ProfileImage;

  @ApiProperty({ example: ['FOOD_TOUR'], enum: TripTypeEnum })
  @IsEnum(TripTypeEnum, { each: true })
  @ArrayNotEmpty()
  tripTypes: TripType[];

  @ApiProperty({ example: ['SEOUL', 'INCHEON'], enum: ServiceAreaEnum })
  @IsEnum(ServiceAreaEnum, { each: true })
  @ArrayNotEmpty()
  serviceArea: ServiceArea[];
}

export default class SignupDTO {
  user: SignupUserDTO;
  profile: SignupProfileDTO;
}
