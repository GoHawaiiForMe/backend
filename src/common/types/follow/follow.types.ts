import { ProfileImage } from 'src/common/constants/image.type';

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
  maker?: { nickName: string; image: ProfileImage };
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
    makerProfile: { image: ProfileImage };
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
