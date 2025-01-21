import { Global, Module } from '@nestjs/common';
import RedisService from './redis.service';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: () => {
        const client = new Redis({ host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) });
        client.on('error', (err) => {
          console.error('Redis 연결 오류:', err);
        });
        return client;
      }
    },
    RedisService
  ],
  exports: ['REDIS']
})
export class RedisModule {}
