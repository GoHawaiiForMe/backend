import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CloudWatchLogsClient } from '@aws-sdk/client-cloudwatch-logs';
import getCloudwatchConfig from '../cloudWatch/cloudWatch.config';
import { LoggerService } from './logger.service';
import { LogMiddleware } from './log.middleware';

@Global()
@Module({
  providers: [
    {
      provide: CloudWatchLogsClient,
      useFactory: () => new CloudWatchLogsClient(getCloudwatchConfig())
    },
    LoggerService
  ],
  exports: [LoggerService]
})
export class LoggerModule implements NestModule {
  constructor(private readonly service: LoggerService) {}

  configure(consumer: MiddlewareConsumer) {
    if (process.env.ENV === 'production') {
      consumer.apply(LogMiddleware(this.service)).forRoutes('*');
    }
  }
}
