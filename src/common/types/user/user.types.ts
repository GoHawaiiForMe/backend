import { ProfileImage } from 'src/common/constants/image.type';
import { Role } from 'src/common/constants/role.type';
import { TripType } from 'src/common/constants/tripType.type';
import { MakerProfileProperties } from './profile.types';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { UserStatsProperties } from '../userStats/userStats.types';
import { OAuthProvider } from 'src/common/constants/oauth.type';

export interface UserProperties {
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

export interface UserPropertiesFromDB {
  id?: string;
  role?: Role;
  nickName?: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  coconut?: number;
  provider?: OAuthProvider;
  providerId?: string;
  followers?: { dreamerId: string }[];
  makerProfile?: Partial<MakerProfileProperties>;
  stats?: UserStatsProperties;
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
  id?: string;
  nickName?: string;
  image?: ProfileImage;
  gallery?: string;
  serviceTypes?: TripType[];
  isFollowed?: boolean;
}

export type MakerOrderByField =
  | { stats: { averageRating: SortOrder.DESC } }
  | { stats: { totalConfirms: SortOrder.DESC } }
  | { stats: { totalReviews: SortOrder.DESC } };

export enum MakerOrderBy {
  RATINGS = 'averageRating',
  CONFIRMS = 'totalConfirms',
  REVIEWS = 'totalReviews'
}
