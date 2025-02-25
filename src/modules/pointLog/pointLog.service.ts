import { Injectable } from '@nestjs/common';
import PointLogRepository from './pointLog.repository';
import { PointLogProperties } from 'src/modules/pointLog/types/pointLog.type';
import PointLog from './domain/pointLog.domain';
import { GetPointLogQueryDTO } from 'src/modules/pointLog/types/pointLog.dto';

@Injectable()
export default class PointLogService {
  constructor(private readonly repository: PointLogRepository) {}

  async get(userId: string, options: GetPointLogQueryDTO): Promise<PointLogProperties[]> {
    const logs = await this.repository.findByUser(userId, options);

    return logs.map((log) => log.get());
  }

  async create(data: PointLogProperties) {
    const log = PointLog.create(data);
    const newLog = await this.repository.create(log);

    return newLog.get();
  }
}
