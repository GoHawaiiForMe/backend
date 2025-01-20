import { Plan } from '@prisma/client';
import { IUser } from 'src/common/domains/user/user.interface';
import { FilteredUserProperties, UserMapperProperties, UserProperties } from '../user/user.types';
import IPlan from 'src/common/domains/plan/plan.interface';
import { PlanToClientProperties } from '../plan/plan.properties';

export interface QuoteProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeletedAt?: Date | null;
  price: number;
  content: string;
  plan: IPlan;
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
  plan: PlanToClientProperties;
  maker?: FilteredUserProperties | null;
  isConfirmed: boolean;
  isAssigned: boolean;
}

export interface QuoteMapperProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeletedAt?: Date | null;
  price: number;
  content: string;
  plan?: Plan;
  planId: string;
  maker?: UserMapperProperties | null;
  makerId?: string | null;
  isConfirmed?: boolean;
  isAssigned?: boolean;
}
