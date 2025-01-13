import { FilteredUserProperties, UpdatePasswordProperties, UserProperties } from '../type/user.types';

export interface IUser {
  validatePassword(password: string): Promise<boolean>;
  update(data: Partial<UserProperties> & UpdatePasswordProperties): Promise<FilteredUserProperties>;
  updatePassword(data: UpdatePasswordProperties): Promise<void>;
  get(): UserProperties;
  toClient(): FilteredUserProperties;
  toClientAll(): Omit<UserProperties, 'password'>;
}
