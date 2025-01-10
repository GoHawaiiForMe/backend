import { Plan } from '@prisma/client';
import User from 'src/user/domain/user.domain';
import { IUser } from 'src/user/domain/user.interface';

export default interface QuoteProperties {
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
