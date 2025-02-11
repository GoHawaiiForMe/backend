import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PointEventEnum } from 'src/common/constants/pointEvent.type';
import PointLogService from 'src/modules/pointLog/pointLog.service';
import UserService from 'src/modules/user/user.service';
import ErrorMessage from 'src/common/constants/errorMessage.enum';

@Processor('points')
export class PointLogProcessor extends WorkerHost {
  constructor(
    private readonly user: UserService,
    private readonly pointLog: PointLogService
  ) {
    super();
  }

  async process(job: Job<{ userId: string; event: PointEventEnum; value: number }>) {
    await this.updateDB(job.data);
  }

  async updateDB(data, retries = 5) {
    const { userId, event, value } = data;
    let attempt = 0;

    while (attempt < retries) {
      try {
        // DB 데이터 생성 및 업데이트
        Promise.all([this.user.updateUser(userId, { coconut: value }), this.pointLog.create({ userId, event, value })]);
        return;
      } catch (error) {
        attempt++;

        if (attempt === retries) {
          console.error(ErrorMessage.QUEUE_MAX_RETRY_EXCEEDED);
          // retry 시도 실패한 작업은 자정에 다시 시도하도록 scheduler 등록함
        }
      }
    }
  }
}
