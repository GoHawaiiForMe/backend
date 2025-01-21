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

  update(data: Partial<UserStatsProperties>): void {
    this.averageRating = data.averageRating;
    this.totalReviews = data.totalReviews;
    this.totalFollows = data.totalFollows;
    this.totalConfirms = data.totalConfirms;
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

  toObject(): UserStatsToClientProperties {
    return {
      averageRating: Math.round(this.averageRating),
      totalReviews: this.totalReviews,
      totalFollows: this.totalFollows,
      totalConfirms: this.totalConfirms
    };
  }
}
