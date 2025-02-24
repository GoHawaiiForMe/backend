import { Role } from 'src/common/constants/role.type';
import { MakerProfileProperties } from '../../profile/types/profile.types';
import { UserStatsProperties } from '../../userStats/types/userStats.types';
import { OAuthProvider } from 'src/common/constants/oauth.type';

export interface AuthProperties {
  id?: string;
  role?: Role;
  nickName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  coconut?: number;
  provider?: OAuthProvider;
  providerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SignupProperties {
  role: Role;
  email?: string;
  nickName: string;
  password?: string;
  phoneNumber: string;
  provider?: OAuthProvider;
  providerId?: string;
}

export interface OAuthProperties {
  provider: OAuthProvider;
  providerId: string;
}

export interface AuthPropertiesFromDB {
  id?: string;
  role?: Role;
  nickName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  coconut?: number;
  provider?: OAuthProvider;
  providerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FilteredAuthProperties {
  id?: string;
  role: Role;
  nickName: string;
  coconut: number;
}

export interface PasswordProperties {
  password: string;
  newPassword: string;
}
