import { UserProperties } from 'src/user/type/user.types';
import QuoteProperties from './quoteProperties';
import { Plan } from '@prisma/client';

export default interface QuoteMapperProperties {
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
