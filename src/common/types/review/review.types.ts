import { PlanReference } from '../plan/plan.type';
import { UserReference } from '../user/user.types';

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
