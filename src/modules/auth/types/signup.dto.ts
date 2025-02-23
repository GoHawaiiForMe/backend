import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProfileImage, ProfileImageValues } from 'src/common/constants/image.type';
import { OAuthProvider } from 'src/common/constants/oauth.type';
import { Role, RoleValues } from 'src/common/constants/role.type';
import { ServiceArea, ServiceAreaValues } from 'src/common/constants/serviceArea.type';
import { TripType, TripTypeValues } from 'src/common/constants/tripType.type';

export class SignupUserDTO {
  @ApiProperty({ example: 'DEFAULT_1', enum: RoleValues })
  @IsEnum(RoleValues)
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
  provider: OAuthProvider;

  @IsString()
  @IsOptional()
  providerId: string;
}

export class SignupProfileDTO {
  @ApiProperty({ example: 'DEFAULT_1', enum: ProfileImageValues })
  @IsEnum(ProfileImageValues)
  @IsNotEmpty()
  image: ProfileImage;

  @ApiProperty({ example: ['FOOD_TOUR'], enum: TripTypeValues })
  @IsEnum(TripTypeValues, { each: true })
  @ArrayNotEmpty()
  tripTypes: TripType[];

  @ApiProperty({ example: ['SEOUL', 'INCHEON'], enum: ServiceAreaValues })
  @IsEnum(ServiceAreaValues, { each: true })
  @ArrayNotEmpty()
  serviceArea: ServiceArea[];
}

export default class SignupDTO {
  user: SignupUserDTO;
  profile: SignupProfileDTO;
}
