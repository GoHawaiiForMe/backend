import { UserStatsProperties, UserStatsToClientProperties } from 'src/common/types/userStats/userStats.types';
import { IUserStats } from './userStats.interface';

export default class UserStats implements IUserStats {
  private readonly id?: string;
  private readonly userId: string;
  private averageRating: number;
  private totalReviews: number;
  private totalFollows: number;
  private totalConfirms: number;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(user: UserStatsProperties) {
    this.id = user?.id;
    this.userId = user.userId;
    this.averageRating = user.averageRating;
    this.totalReviews = user.totalReviews;
    this.totalFollows = user.totalFollows;
    this.totalConfirms = user.totalConfirms;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
  }

  static create({ userId, averageRating, totalReviews, totalFollows, totalConfirms }: Partial<UserStatsProperties>) {
    return new UserStats({
      userId,
      averageRating: averageRating ?? 0,
      totalReviews: totalReviews ?? 0,
      totalFollows: totalFollows ?? 0,
      totalConfirms: totalConfirms ?? 0
    });
  }

  updateReviewData(rating: number, isAdd: boolean) {
    if (isAdd === true) {
      this.averageRating = (this.averageRating * this.totalReviews + rating) / (this.totalReviews + 1);
      this.totalReviews += 1;
    } else {
      this.averageRating = (this.averageRating * this.totalReviews - rating) / (this.totalReviews - 1);
      this.totalReviews -= 1;
    }
  }

  updateTotalFollows(isAdd: boolean) {
    isAdd ? (this.totalFollows += 1) : (this.totalFollows -= 1);
  }

  updateTotalConfirms(isAdd: boolean) {
    isAdd ? (this.totalConfirms += 1) : (this.totalConfirms -= 1);
  }

  get() {
    return {
      userId: this.userId,
      averageRating: Math.round(this.averageRating),
      totalReviews: this.totalReviews,
      totalFollows: this.totalFollows,
      totalConfirms: this.totalConfirms,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  getTotalReviews() {
    return { averageRating: this.averageRating, totalReviews: this.totalReviews };
  }

  getTotalFollows() {
    return { totalFollows: this.totalFollows };
  }

  getTotalConfirms() {
    return { totalConfirms: this.totalConfirms };
  }

  toObject(): UserStatsToClientProperties {
    return {
      averageRating: Math.round(this.averageRating),
      totalReviews: this.totalReviews,
      totalFollows: this.totalFollows,
      totalConfirms: this.totalConfirms
    };
  }
}
