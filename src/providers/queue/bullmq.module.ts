import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import UserStatsModule from 'src/modules/userStats/userStats.module';
import RedisService from '../cache/redis.service';
import { UserStatsProcessor } from './userStats.processor';
import { PointsProcessor } from './points.processor';
import PointLogModule from 'src/modules/pointLog/pointLog.module';
import UserModule from 'src/modules/user/user.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    }),
    BullModule.registerQueue({ name: 'points' }),
    UserModule,
    UserStatsModule,
    PointLogModule
  ],
  providers: [PointsProcessor, UserStatsProcessor, RedisService]
})
export class BullmqModule {}
