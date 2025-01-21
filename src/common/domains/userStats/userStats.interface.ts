import { UserStatsProperties, UserStatsToClientProperties } from 'src/common/types/userStats/userStats.types';

export interface IUserStats {
  updateReviewData(rating: number, isAdd: boolean): void;
  updateTotalFollows(isAdd: boolean): void;
  updateTotalConfirms(isAdd: boolean): void;
  get(): UserStatsProperties;
  getTotalReviews(): Partial<UserStatsProperties>;
  getTotalFollows(): Partial<UserStatsProperties>;
  getTotalConfirms(): Partial<UserStatsProperties>;
  toObject(): UserStatsToClientProperties;
}
