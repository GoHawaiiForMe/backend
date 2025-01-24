import { ReviewAllProperties } from 'src/common/types/review/review.types';
import Review from './review.domain';

export default class ReviewMapper {
  constructor(private readonly review: ReviewAllProperties) {}

  toDomain() {
    if (!this.review) return null;

    return new Review({
      id: this.review.id,
      writerId: this.review?.writerId,
      writer: this.review?.writer,
      ownerId: this.review?.ownerId,
      rating: this.review.rating,
      content: this.review.content,
      planId: this.review?.planId,
      createdAt: this.review.createdAt,
      updatedAt: this.review?.updatedAt
    });
  }
}
