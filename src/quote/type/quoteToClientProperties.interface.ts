import { Plan } from '@prisma/client';
import User from 'src/user/domain/user.domain';
import { FilteredUserProperties } from 'src/user/type/user.types';

export default interface QuoteToClientProperties {
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
