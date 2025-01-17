import { Injectable } from '@nestjs/common';
import UserStatsRepository from './userStats.repository';

@Injectable()
export default class UserStatsService {
  constructor(private readonly repository: UserStatsRepository) {}

  // 1. 데이터 조회 메서드

  // 2. 데이터 계산 메서드

  // 3. 데이터 업데이트 메서드
}
