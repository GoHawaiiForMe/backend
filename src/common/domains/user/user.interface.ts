import { Role } from 'src/common/constants/role.type';
import { MakerInfoAndProfileProperties } from 'src/common/types/user/profile.types';
import { FilteredUserProperties, PasswordProperties, UserProperties } from 'src/common/types/user/user.types';
import { UserStatsToClientProperties } from 'src/common/types/userStats/userStats.types';

export interface IUser {
  validatePassword(password: string): Promise<boolean>;
  update(data: Partial<UserProperties> & PasswordProperties): Promise<FilteredUserProperties>;
  updatePassword(data: PasswordProperties): Promise<void>;
  get(): UserProperties;
  toClient(): FilteredUserProperties;
  toClientAll(): Omit<UserProperties, 'password'>;
  getId(): string;
  getRole(): Role;
  isFollowed(dreamerId: string): boolean;
  getWithMakerProfile(withDetails?: boolean): Partial<MakerInfoAndProfileProperties>;
  getStats(): UserStatsToClientProperties;
}
