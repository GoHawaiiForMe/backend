import { PlanReference } from '../../plan/types/plan.type';
import { UserReference } from '../../user/types/user.types';

export interface ReviewProperties {
  id?: string;
  writerId: string;
  ownerId: string;
  rating: number;
  content: string;
  planId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReviewAllProperties {
  id?: string;
  writerId?: string;
  writer?: UserReference;
  ownerId?: string;
  owner?: UserReference;
  rating: number;
  content: string;
  planId?: string;
  plan?: PlanReference;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReviewSelect {
  id: boolean;
  createdAt: boolean;
  rating: boolean;
  content: boolean;
  plan?: {
    select: {
      tripType: boolean;
      tripDate: boolean;
      quotes: {
        select: {
          price: boolean;
          isAssigned: boolean;
        };
        where: {
          isConfirmed: boolean;
        };
      };
    };
  };
  owner?: {
    select: {
      nickName: boolean;
      makerProfile: {
        select: {
          image: boolean;
        };
      };
    };
  };
  writer?: {
    select: {
      nickName: boolean;
    };
  };
}

export interface ReviewGroupByCount {
  rating: number;
  count: number;
}
