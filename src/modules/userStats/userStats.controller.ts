import { Controller, Get } from '@nestjs/common';
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
}
