import { UserStatsProperties, UserStatsToClientProperties } from 'src/modules/userStats/types/userStats.types';

export interface IUserStats {
  update(data: Partial<UserStatsProperties>): void;
  get(): UserStatsProperties;
  toObject(): UserStatsToClientProperties;
  isValidStats(): boolean;
}
