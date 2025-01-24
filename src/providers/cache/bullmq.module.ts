import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import UserStatsModule from 'src/modules/userStats/userStats.module';
import { UserStatsProcessor } from './bullmq.processor';
import RedisService from './redis.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      }
    }),
    UserStatsModule
  ],
  providers: [UserStatsProcessor, RedisService]
})
export class BullmqModule {}
