import { IUser } from 'src/common/domains/user/user.interface';
import { FilteredUserProperties, UserProperties } from '../user/user.types';
import { PlanReference } from '../plan/plan.type';

export interface QuoteProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  price: number;
  content: string;
  plan: PlanReference;
  planId: string;
  maker?: IUser;
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
  maker?: FilteredUserProperties | null;
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
  maker?: UserProperties | null;
  makerId?: string | null;
  isConfirmed?: boolean;
  isAssigned?: boolean;
}
