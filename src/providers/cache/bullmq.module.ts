import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        url: process.env.REDIS_URL
      }
    })
  ]
})
export class BullmqModule {}
