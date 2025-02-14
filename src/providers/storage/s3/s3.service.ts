import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ChatToS3Properties } from 'src/common/domains/chat/chat.properties';
@Injectable()
export class S3Service {
  constructor(private readonly s3Client: S3Client) {}

  async uploadFile(data: ChatToS3Properties) {
    const { file, chatRoomId } = data;
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '');
    const s3key = `${timestamp}/${chatRoomId}/${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Body: file.buffer,
      Key: s3key,
      ContentDisposition: 'inline'
    });

    await this.s3Client.send(command);
    return s3key;
  }

  async generatePresignedUrl(filename: string, expiresIn: number = 3600) {
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: filename
    });

    const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn });
    return presignedUrl;
  }
}
