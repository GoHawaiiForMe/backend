import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import ReviewService from './review.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { CreateReviewDTO, GetReviewsQueryDTO, GetReviewsResponseDTO } from 'src/common/types/review/review.dto';
import { ReviewProperties } from 'src/common/types/review/review.types';
import { Role } from 'src/common/decorators/roleGuard.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('reviews')
export default class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Get('me')
  @Role('DREAMER')
  async getReviewByDreamer(
    @UserId() dreamerId: string,
    @Query() options: GetReviewsQueryDTO
  ): Promise<GetReviewsResponseDTO> {
    return await this.service.getByDreamer(dreamerId, options);
  }

  @Public()
  @Get(':makerId')
  async getReviewByMaker(
    @Param('makerId') makerId: string,
    @Query() options: GetReviewsQueryDTO
  ): Promise<GetReviewsResponseDTO> {
    return await this.service.getByMaker(makerId, options);
  }

  @Post()
  @Role('DREAMER')
  async createReview(@UserId() writerId: string, @Body() data: CreateReviewDTO): Promise<ReviewProperties> {
    return await this.service.create(writerId, data);
  }
}
