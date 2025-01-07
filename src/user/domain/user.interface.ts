import { FilteredUserProperties, UserProperties } from '../type/user.types';

export interface IUser {
  validatePassword(password: string): Promise<boolean>;
  update(data: Partial<UserProperties>): void;
  get(): UserProperties;
  toClient(): FilteredUserProperties;
}
