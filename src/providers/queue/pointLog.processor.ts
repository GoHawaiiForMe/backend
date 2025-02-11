import { Processor, WorkerHost } from '@nestjs/bullmq';
import RedisService from '../cache/redis.service';
import { Job } from 'bullmq';
import { PointEventEnum } from 'src/common/constants/pointEvent.type';
import PointLogService from 'src/modules/pointLog/pointLog.service';

@Processor('point')
export class PointLogProcessor extends WorkerHost {
  constructor(
    private readonly redis: RedisService,
    private readonly pointLog: PointLogService
  ) {
    super();
  }

  async process(job: Job<{ userId: string; event: PointEventEnum; value: number }>) {
    const { userId, event, value } = job.data;
    console.log('job data:', job.data);

    await this.pointLog.create({ userId, event, value });
  }
}
