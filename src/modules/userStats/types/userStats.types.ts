export interface UserStatsProperties {
  id?: string;
  userId: string;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserStatsToClientProperties {
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
}
