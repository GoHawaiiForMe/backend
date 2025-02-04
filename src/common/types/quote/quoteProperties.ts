import { UserReference } from '../user/user.types';
import { PlanReference } from '../plan/plan.type';

export interface QuoteProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  price: number;
  content: string;
  plan?: PlanReference;
  shoppingAddress?: string;
  planId: string;
  dreamer?: UserReference;
  maker?: UserReference;
  makerId?: string;
  isConfirmed?: boolean;
  isAssigned: boolean;
}

export interface QuoteToClientProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  price: number;
  content: string;
  plan?: PlanReference;
  dreamer?: UserReference;
  maker?: UserReference;
  isConfirmed: boolean;
  isAssigned: boolean;
}

export interface QuoteMapperProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  price: number;
  content: string;
  plan?: PlanReference;
  planId: string;
  maker?: {
    id: string;
    nickName: string;
  };
  makerId?: string;
  isConfirmed?: boolean;
  isAssigned?: boolean;
}
