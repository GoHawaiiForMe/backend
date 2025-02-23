import { Role } from 'src/common/constants/role.type';
import { MakerInfoAndProfileProperties } from 'src/modules/profile/types/profile.types';
import { FilteredUserProperties, PasswordProperties, UserProperties } from 'src/modules/user/types/user.types';
import { UserStatsToClientProperties } from 'src/modules/userStats/types/userStats.types';

export interface IUser {
  validatePassword(password: string): Promise<boolean>;
  update(data: Partial<UserProperties & PasswordProperties>): Promise<FilteredUserProperties>;
  updatePassword(data: PasswordProperties): Promise<void>;
  get(): UserProperties;
  toClient(): FilteredUserProperties;
  toClientAll(): Omit<UserProperties, 'password'>;
  toDB(): UserProperties;
  getId(): string;
  getRole(): Role | null;
  getNickName(): string;
  isFollowed(dreamerId: string): boolean;
  getWithMakerProfile(withDetails?: boolean): Partial<MakerInfoAndProfileProperties>;
  getStats(): UserStatsToClientProperties;
}
