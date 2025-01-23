import { Injectable } from '@nestjs/common';
import IReview from 'src/common/domains/review/review.interface';
import ReviewMapper from 'src/common/domains/review/review.mapper';
import DBClient from 'src/providers/database/prisma/DB.client';

@Injectable()
export default class ReviewRepository {
  constructor(private readonly db: DBClient) {}

  async create(data: IReview): Promise<IReview> {
    const review = await this.db.review.create({ data: data.toDB() });

    return new ReviewMapper(review).toDomain();
  }
}
