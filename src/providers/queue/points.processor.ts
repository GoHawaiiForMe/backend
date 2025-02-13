import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PointEventEnum } from 'src/common/constants/pointEvent.type';
import PointLogService from 'src/modules/pointLog/pointLog.service';
import UserService from 'src/modules/user/user.service';
import ErrorMessage from 'src/common/constants/errorMessage.enum';

@Processor('points')
export class PointsProcessor extends WorkerHost {
  constructor(
    private readonly user: UserService,
    private readonly pointLog: PointLogService
  ) {
    super();
  }

  async process(job: Job<{ userId: string; event: PointEventEnum; value: number; retry?: string[] }>) {
    const { userId, event, value, retry = [] } = job.data;
    let attempt = 0;
    const retries = 5;

    // DB 데이터 생성 및 업데이트
    let jobs = [
      { key: 'updateUser', fn: () => this.user.updateUser(userId, { coconut: value }) },
      { key: 'createPointLog', fn: () => this.pointLog.create({ userId, event, value }) }
    ];

    if (retry.length > 0) {
      jobs = jobs.filter((job) => retry.includes(job.key));
    }

    while (attempt < retries && jobs.length > 0) {
      const results = await Promise.allSettled(jobs.map((job) => job.fn()));

      jobs = jobs.filter((_, index) => results[index].status === 'rejected');

      attempt++;
    }

    console.error(ErrorMessage.QUEUE_MAX_RETRY_EXCEEDED);

    // 자정에 다시 시도하는 scheduler에서 실패한 작업만 실행하도록 큐에 추가
    if (jobs.length > 0) {
      const failedJobKeys = jobs.map((job) => job.key);
      await job.updateData({ ...job.data, retry: failedJobKeys });
    }
  }
}
