import { UserStatsProperties, UserStatsToClientProperties } from 'src/common/types/userStats/userStats.types';

export interface IUserStats {
  update(data: UserStatsProperties): void;
  get(): UserStatsProperties;
  toClient(): UserStatsToClientProperties;
}
