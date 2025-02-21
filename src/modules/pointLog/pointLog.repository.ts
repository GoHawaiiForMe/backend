import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IPointLog from './domain//pointLog.interface';
import PointLogMapper from './domain//pointLog.mapper';
import { GetPointLogQueryDTO } from 'src/modules/pointLog/types/pointLog.dto';
import { PointLog } from 'src/providers/database/mongoose/pointLog.schema';

@Injectable()
export default class PointLogRepository {
  constructor(@InjectModel(PointLog.name) private pointLog: Model<PointLog>) {}

  async findByUser(userId: string, options: GetPointLogQueryDTO) {
    const { page, pageSize } = options;
    const skip = (page - 1) * pageSize;
    const logs = await this.pointLog.find({ userId }).skip(skip).limit(pageSize).sort({ createdAt: -1 });

    return logs.map((log) => new PointLogMapper(log).toDomain());
  }

  async create(data: IPointLog): Promise<IPointLog> {
    const log = await this.pointLog.create(data.get());

    return new PointLogMapper(log).toDomain();
  }
}
