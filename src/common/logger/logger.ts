import { createLogger, format, transports } from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

const logGroupName = 'goforme-logs';
const logStreamName = 'goforme-log-stream';

export const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new WinstonCloudwatch({
      logGroupName,
      logStreamName,
      awsRegion: process.env.AWS_REGION
    })
  ]
});
