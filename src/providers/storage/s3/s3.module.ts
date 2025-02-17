import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Client } from '@aws-sdk/client-s3';
import getS3Config from './s3.config';

@Module({
  providers: [
    {
      provide: S3Client,
      useFactory: () => new S3Client(getS3Config())
    },
    S3Service
  ],
  exports: [S3Service]
})
export default class S3Module {}
