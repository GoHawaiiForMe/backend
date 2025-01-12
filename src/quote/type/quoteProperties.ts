import { Plan } from '@prisma/client';
import { IUser } from 'src/user/domain/user.interface';
import { FilteredUserProperties, UserProperties } from 'src/user/type/user.types';

export interface QuoteProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeletedAt?: Date | null;
  price: number;
  content: string;
  plan: Plan;
  planId: string;
  maker?: IUser;
  makerId?: string;
  isConfirmed: boolean;
  isAssigned: boolean;
}

export interface QuoteToClientProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  price: number;
  content: string;
  plan: Plan;
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
  maker?: UserProperties | null;
  makerId?: string | null;
  isConfirmed: boolean;
  isAssigned: boolean;
}
