import { Inject, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ChatToS3Properties } from 'src/common/domains/chat/chat.properties';
import { ORIGIN_BUCKET_NAME, RESIZE_BUCKET_NAME } from 'src/common/constants/s3.constants';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class S3Service {
  constructor(
    @Inject(ORIGIN_BUCKET_NAME) private readonly originBucket: S3Client,
    @Inject(RESIZE_BUCKET_NAME) private readonly resizeBucket: S3Client
  ) {}

  async uploadFile(data: ChatToS3Properties) {
    const { file, chatRoomId } = data;
    const uniqueKey = uuidV4();
    const s3key = `${chatRoomId}/${uniqueKey}_${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Body: file.buffer,
      Key: s3key,
      ContentDisposition: 'inline'
    });

    await this.originBucket.send(command);
    return s3key;
  }

  async generateOriginPresignedUrl(filename: string, expiresIn: number = 3600) {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: filename
    });

    const presignedUrl = await getSignedUrl(this.originBucket, command, { expiresIn });
    return presignedUrl;
  }

  async generateResizePresignedUrl(filename: string, expiresIn: number = 3600) {
    const modifiedFilename = filename.replace(/\.[^/.]+$/, '.jpeg');
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: modifiedFilename
      });

      const presignedUrl = await getSignedUrl(this.resizeBucket, command, { expiresIn });
      return presignedUrl;
    } catch (e) {
      const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: filename
      });

      const presignedUrl = await getSignedUrl(this.originBucket, command, { expiresIn });
      return presignedUrl;
    }
  }
}
