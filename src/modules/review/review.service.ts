import { Injectable } from '@nestjs/common';
import ReviewRepository from './review.repository';
import PlanService from '../plan/plan.service';
import { StatusEnum } from 'src/common/constants/status.type';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { CreateReviewDTO } from 'src/common/types/review/review.dto';
import Review from 'src/common/domains/review/review.domain';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export default class ReviewService {
  constructor(
    @InjectQueue('stats') private readonly queue: Queue,
    private readonly repository: ReviewRepository,
    private readonly plan: PlanService
  ) {}

  async create(writerId: string, data: CreateReviewDTO) {
    const plan = await this.plan.getPlanById(data.planId);
    if (plan.status !== StatusEnum.COMPLETED) {
      throw new BadRequestError(ErrorMessage.REVIEW_BAD_REQUEST);
    }

    const review = new Review({
      writerId,
      ownerId: data.makerId,
      rating: data.rating,
      content: data.content,
      planId: data.planId
    });
    await this.repository.create(review);

    // 메이커의 UserStats(리뷰 수, 평점) 업데이트 작업을 큐에 추가
    await this.queue.add('stats', {
      userId: data.makerId,
      event: EventType.REVIEW,
      isAdd: true,
      rating: data.rating
    });

    return;
  }
}
