import { Injectable } from '@nestjs/common';
import IReview from 'src/common/domains/review/review.interface';
import ReviewMapper from 'src/common/domains/review/review.mapper';
import { GetReviewsQueryDTO } from 'src/common/types/review/review.dto';
import DBClient from 'src/providers/database/prisma/DB.client';

@Injectable()
export default class ReviewRepository {
  constructor(private readonly db: DBClient) {}

  async getByUser(ownerId: string, options: GetReviewsQueryDTO): Promise<IReview[]> {
    const { page, pageSize } = options;

    const reviews = await this.db.review.findMany({
      where: { ownerId },
      take: pageSize,
      skip: pageSize * (page - 1),
      select: {
        id: true,
        createdAt: true,
        rating: true,
        content: true,
        writer: { select: { nickName: true } }
      }
    });

    return reviews.map((review) => new ReviewMapper(review).toDomain());
  }

  async count(userId: string, isDreamer: boolean): Promise<number> {
    const where = isDreamer ? { writerId: userId } : { ownerId: userId };
    const totalCount = await this.db.review.count({ where });

    return totalCount;
  }

  async countByRating(ownerId: string): Promise<{ rating: number; count: number }[]> {
    const groupByCount = await this.db.review.groupBy({
      by: ['rating'],
      where: { ownerId },
      _count: { id: true }
    });

    const formattedGroupByCount = groupByCount.map((group) => ({
      rating: group.rating,
      count: group._count.id
    }));

    return formattedGroupByCount;
  }

  async create(data: IReview): Promise<IReview> {
    const review = await this.db.review.create({ data: data.toDB() });

    return new ReviewMapper(review).toDomain();
  }
}
