import { ProfileImageEnum } from 'src/common/constants/image.type';
import { RoleEnum } from 'src/common/constants/role.type';
import { ServiceAreaEnum } from 'src/common/constants/serviceArea.type';
import { TripTypeEnum } from 'src/common/constants/tripType.type';

export class UserResponseDTO {
  id?: string;
  role: RoleEnum;
  nickName: string;
  email: string;
  phoneNumber: string;
  coconut: number;
}

export class FilteredUserResponseDTO {
  id?: string;
  role: RoleEnum;
  nickName: string;
  coconut: number;
}

export class DreamerProfileResponseDTO {
  userId?: string;
  image: ProfileImageEnum;
  serviceArea: ServiceAreaEnum[];
  tripTypes: TripTypeEnum[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class MakerProfileResponseDTO {
  userId?: string;
  image: ProfileImageEnum;
  serviceArea: ServiceAreaEnum[];
  serviceTypes: TripTypeEnum[];
  gallery: string;
  description: string;
  detailDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
}
