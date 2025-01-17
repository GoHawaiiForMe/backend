import { Injectable } from '@nestjs/common';
import UserStatsRepository from './userStats.repository';

@Injectable()
export default class UserStatsService {
  constructor(private readonly repository: UserStatsRepository) {}
}
