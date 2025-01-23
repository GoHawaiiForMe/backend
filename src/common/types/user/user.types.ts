import { ProfileImage } from 'src/common/constants/image.type';
import { Role } from 'src/common/constants/role.type';

export interface UserProperties {
  id?: string;
  role: Role;
  nickName: string;
  email: string;
  password: string;
  phoneNumber: string;
  coconut: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FilteredUserProperties {
  id?: string;
  role: Role;
  nickName: string;
  coconut: number;
}

export interface PasswordProperties {
  password: string;
  newPassword: string;
}

export interface UserReference {
  nickName: string;
  image: ProfileImage;
  gallery: string;
}
