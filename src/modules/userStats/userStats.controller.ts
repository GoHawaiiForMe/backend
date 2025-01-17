import { Controller } from '@nestjs/common';
import UserStatsService from './userStats.service';

@Controller()
export default class UserStatsController {
  constructor(private readonly service: UserStatsService) {}
}
