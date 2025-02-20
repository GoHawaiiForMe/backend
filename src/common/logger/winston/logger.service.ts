import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger } from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new WinstonCloudwatch({
          logGroupName: process.env.LOG_GROUP_NAME,
          logStreamName: process.env.LOG_STREAM_NAME,
          awsRegion: process.env.AWS_REGION
        })
      ]
    });
  }

  info(meta: Record<string, unknown>) {
    this.logger.info(JSON.stringify(meta));
  }

  error(meta: Record<string, unknown>) {
    this.logger.error(JSON.stringify(meta));
  }
}
