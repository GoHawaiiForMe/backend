import { Role } from 'src/common/types/role.type';

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
