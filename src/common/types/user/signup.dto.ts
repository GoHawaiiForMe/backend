import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProfileImage } from 'src/common/constants/image.type';
import { Role  } from 'src/common/constants/role.type';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { TripType  } from 'src/common/constants/tripType.type';

export class SignupUserDTO {
  @ApiProperty({ example: 'DEFAULT_1', enum: Role })
  @IsEnum(Role)
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
  @ApiProperty({ example: 'DEFAULT_1', enum: ProfileImage })
  @IsEnum(ProfileImage)
  @IsNotEmpty()
  image: ProfileImage;

  @ApiProperty({ example: ['FOOD_TOUR'], enum: TripType })
  @IsEnum(TripType, { each: true })
  @ArrayNotEmpty()
  tripTypes: TripType[];

  @ApiProperty({ example: ['SEOUL', 'INCHEON'], enum: ServiceArea})
  @IsEnum(ServiceArea, { each: true })
  @ArrayNotEmpty()
  serviceArea: ServiceArea[];
}

export default class SignupDTO {
  user: SignupUserDTO;
  profile: SignupProfileDTO;
}
