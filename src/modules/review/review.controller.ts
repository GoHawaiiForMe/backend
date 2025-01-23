import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import ReviewService from './review.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { CreateReviewDTO } from 'src/common/types/review/review.dto';

@Controller('reviews')
export default class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createReview(@UserId() writerId: string, @Body() data: CreateReviewDTO): Promise<void> {
    return await this.service.create(writerId, data);
  }
}
