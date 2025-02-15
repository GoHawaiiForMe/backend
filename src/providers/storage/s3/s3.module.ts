import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Client } from '@aws-sdk/client-s3';
import getS3Config from 'src/providers/database/mongoose/config/s3.config';
import { ORIGIN_BUCKET_NAME, RESIZE_BUCKET_NAME } from 'src/common/constants/s3.constants';

@Module({
  providers: [
    {
      provide: ORIGIN_BUCKET_NAME,
      useFactory: () => new S3Client(getS3Config(ORIGIN_BUCKET_NAME))
    },
    {
      provide: RESIZE_BUCKET_NAME,
      useFactory: () => new S3Client(getS3Config(RESIZE_BUCKET_NAME))
    },
    S3Service
  ],
  exports: [S3Service]
})
export default class S3Module {}
