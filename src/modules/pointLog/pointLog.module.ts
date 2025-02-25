import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PointLogSchema, { PointLog } from 'src/providers/database/mongoose/pointLog.schema';
import PointLogRepository from './pointLog.repository';
import PointLogService from './pointLog.service';
import PointLogController from './pointLog.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: PointLog.name, schema: PointLogSchema }])],
  controllers: [PointLogController],
  providers: [PointLogService, PointLogRepository],
  exports: [PointLogService]
})
export default class PointLogModule {}
