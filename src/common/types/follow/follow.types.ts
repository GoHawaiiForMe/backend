import { ProfileImage } from 'src/common/constants/image.type';
import { TripType } from 'src/common/constants/tripType.type';
import { UserReference } from '../user/user.types';

export interface FollowProperties {
  id?: string;
  makerId: string;
  dreamerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FollowPropertiesWithMaker {
  id?: string;
  makerId: string;
  maker?: UserReference;
  dreamerId: string;
  isFollowed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FollowPropertiesFromDB {
  id?: string;
  makerId: string;
  maker?: {
    nickName: string;
    makerProfile: { image: ProfileImage; gallery: string; serviceTypes: TripType[] };
    followers: { id: string }[];
  };
  dreamerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FollowPropertiesToClient extends FollowPropertiesWithMaker {
  userStats: {
    averageRating: number;
    totalReviews: number;
    totalFollows: number;
    totalConfirms: number;
  };
}
