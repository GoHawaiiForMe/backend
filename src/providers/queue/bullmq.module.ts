import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import UserStatsModule from 'src/modules/userStats/userStats.module';
import RedisService from '../cache/redis.service';
import { UserStatsProcessor } from './userStats.processor';
import { PointLogProcessor } from './pointLog.processor';
import PointLogModule from 'src/modules/pointLog/pointLog.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    }),
    UserStatsModule,
    PointLogModule
  ],
  providers: [PointLogProcessor, UserStatsProcessor, RedisService]
})
export class BullmqModule {}
