import { Controller, Get, Patch } from '@nestjs/common';
import UserStatsService from './userStats.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { UserStatsToClientProperties } from 'src/common/types/userStats/userStats.types';

@Controller('stats')
export default class UserStatsController {
  constructor(private readonly service: UserStatsService) {}

  @Get()
  async get(@UserId() userId: string): Promise<UserStatsToClientProperties> {
    return await this.service.get(userId);
  }

  @Patch('review')
  async updateReview(@UserId() userId: string) {
    return await this.service.updateReviewData(userId, 4, true);
  }

  @Patch('follow')
  async updateFollow(@UserId() userId: string) {
    return await this.service.updateTotalFollows(userId, true);
  }

  @Patch('confirm')
  async updateConfirm(@UserId() userId: string) {
    return await this.service.updateTotalConfirms(userId, true);
  }
}
