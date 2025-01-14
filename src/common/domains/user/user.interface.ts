import { FilteredUserProperties, PasswordProperties, UserProperties } from 'src/common/types/user/user.types';

export interface IUser {
  validatePassword(password: string): Promise<boolean>;
  update(data: Partial<UserProperties> & PasswordProperties): Promise<FilteredUserProperties>;
  updatePassword(data: PasswordProperties): Promise<void>;
  get(): UserProperties;
  toClient(): FilteredUserProperties;
  toClientAll(): Omit<UserProperties, 'password'>;
}
