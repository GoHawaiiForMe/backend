import { FilteredUserProperties, UserProperties } from '../type/user.types';

export interface IUser {
  validatePassword(password: string): Promise<boolean>;
  update(data: Partial<UserProperties>): Partial<UserProperties>;
  get(): UserProperties;
  toClient(): FilteredUserProperties;
}
