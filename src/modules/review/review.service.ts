import { Injectable } from '@nestjs/common';
import ReviewRepository from './review.repository';
import PlanService from '../plan/plan.service';
import { StatusEnum } from 'src/common/constants/status.type';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { CreateReviewDTO } from 'src/common/types/review/review.dto';
import Review from 'src/common/domains/review/review.domain';

@Injectable()
export default class ReviewService {
  constructor(
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
    return;
  }
}
