import { ProfileImage } from 'src/common/constants/image.type';
import { Role } from 'src/common/constants/role.type';
import { ServiceArea} from 'src/common/constants/serviceArea.type';
import { TripType } from 'src/common/constants/tripType.type';

export class UserResponseDTO {
  id?: string;
  role: Role;
  nickName: string;
  email: string;
  phoneNumber: string;
  coconut: number;
}

export class FilteredUserResponseDTO {
  id?: string;
  role: Role;
  nickName: string;
  coconut: number;
}

export class DreamerProfileResponseDTO {
  userId?: string;
  image: ProfileImage;
  serviceArea: ServiceArea[];
  tripTypes: TripType[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class MakerProfileResponseDTO {
  userId?: string;
  image: ProfileImage;
  serviceArea: ServiceArea[];
  serviceTypes: TripType[];
  gallery: string;
  description: string;
  detailDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
}
