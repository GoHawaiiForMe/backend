import { UserStatsProperties, UserStatsToClientProperties } from 'src/common/types/userStats/userStats.types';

export interface IUserStats {
  update(data: Partial<UserStatsProperties>): void;
  get(): UserStatsProperties;
  toObject(): UserStatsToClientProperties;
  isValidStats(): boolean;
}
