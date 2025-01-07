import { Role } from 'src/common/types/role.type';

export interface UserProperties {
  id?: string;
  role: Role;
  nickName: string;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FilteredUserProperties {
  id?: string;
  role: Role;
  nickName: string;
}
