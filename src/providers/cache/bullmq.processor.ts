import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import RedisService from './redis.service';

@Processor('calculation')
export class CalculationProcessor extends WorkerHost {
  constructor(private readonly redis: RedisService) {
    super();
  }

  // 실제 큐 실행 내용
  async process() {
    // 1. 데이터 조회
    // 2. 데이터 계산
    // 3. 데이터 업데이트
  }
}
