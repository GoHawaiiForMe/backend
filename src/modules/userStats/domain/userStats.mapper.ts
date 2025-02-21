import { UserStatsProperties } from 'src/modules/userStats/types/userStats.types';
import UserStats from './userStats.domain';

export default class UserStatsMapper {
  constructor(private readonly user: UserStatsProperties) {}

  toDomain() {
    if (!this.user) return null;

    return new UserStats({
      id: this.user.id,
      userId: this.user.userId,
      averageRating: this.user.averageRating,
      totalReviews: this.user.totalReviews,
      totalFollows: this.user.totalFollows,
      totalConfirms: this.user.totalConfirms,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt
    });
  }
}
