import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PointLog } from 'src/providers/database/mongoose/pointLog.schema';

@Injectable()
export default class PointLogRepository {
  constructor(@InjectModel(PointLog.name) private point: Model<PointLog>) {}
}
