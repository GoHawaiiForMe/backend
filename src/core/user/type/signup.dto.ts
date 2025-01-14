import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProfileImage, ProfileImageEnum } from 'src/common/types/image.type';
import { Role, RoleEnum } from 'src/common/types/role.type';
import { ServiceArea, ServiceAreaEnum } from 'src/common/types/serviceArea.type';
import { TripType, TripTypeEnum } from 'src/common/types/tripType.type';

export class SignupUserDTO {
  @ApiProperty({ example: 'DEFAULT_1', enum: RoleEnum })
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: Role;

  @IsNotEmpty()
  nickName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
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
