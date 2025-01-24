import { Injectable } from '@nestjs/common';
import ReviewRepository from './review.repository';
import PlanService from '../plan/plan.service';
import { StatusEnum } from 'src/common/constants/status.type';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { CreateReviewDTO, GetReviewsQueryDTO, GetReviewsResponseDTO } from 'src/common/types/review/review.dto';
import Review from 'src/common/domains/review/review.domain';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EventType } from 'src/common/constants/event.type';

@Injectable()
export default class ReviewService {
  constructor(
    @InjectQueue('stats') private readonly queue: Queue,
    private readonly repository: ReviewRepository,
    private readonly plan: PlanService
  ) {}

  async getByDreamer(userId: string, options: GetReviewsQueryDTO): Promise<GetReviewsResponseDTO> {
    const [reviews, totalCount] = await Promise.all([
      this.repository.getByUser(userId, options, true),
      this.repository.count(userId, true)
    ]);

    const reviewsToClient = reviews.map((review) => review.toDreamer());
    return { totalCount, list: reviewsToClient };
  }

  async getByMaker(userId: string, options: GetReviewsQueryDTO): Promise<GetReviewsResponseDTO> {
    const [reviews, totalCount, groupByCount] = await Promise.all([
      this.repository.getByUser(userId, options, false),
      this.repository.count(userId, false),
      this.repository.countByRating(userId)
    ]);

    const reviewsToClient = reviews.map((review) => review.toMaker());
    return { totalCount, groupByCount, list: reviewsToClient };
  }

  async create(writerId: string, data: CreateReviewDTO) {
    const plan = await this.plan.getPlanById(data.planId);
    if (plan.status !== StatusEnum.COMPLETED) {
      throw new BadRequestError(ErrorMessage.REVIEW_BAD_REQUEST);
    }

    const review = Review.create({
      writerId,
      ownerId: data.makerId,
      rating: data.rating,
      content: data.content,
      planId: data.planId
    });
    const newReview = await this.repository.create(review);

    // 메이커의 UserStats(리뷰 수, 평점) 업데이트 작업을 큐에 추가
    await this.queue.add('stats', {
      userId: data.makerId,
      event: EventType.REVIEW,
      isAdd: true,
      rating: data.rating
    });

    return newReview.toClient();
  }
}
