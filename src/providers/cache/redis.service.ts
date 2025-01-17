import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import UserStatsService from 'src/modules/userStats/userStats.service';

@Injectable()
export default class RedisService {
  constructor(
    @InjectQueue('calculation') private calculationQueue: Queue,
    private readonly userStatsService: UserStatsService
  ) {}

  // Redis 저장 메서드

  // Redis 조회 메서드
}
