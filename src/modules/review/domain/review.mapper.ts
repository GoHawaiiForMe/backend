import { ReviewAllProperties } from 'src/modules/review/types/review.types';
import Review from './review.domain';

export default class ReviewMapper {
  constructor(private readonly review: ReviewAllProperties) {}

  toDomain() {
    if (!this.review) return null;

    return new Review({
      id: this.review.id,
      writerId: this.review.writerId,
      writer: this.review.writer,
      ownerId: this.review.ownerId,
      owner: this.review.owner,
      rating: this.review.rating,
      content: this.review.content,
      planId: this.review.planId,
      plan: this.review.plan,
      createdAt: this.review.createdAt,
      updatedAt: this.review.updatedAt
    });
  }
}
