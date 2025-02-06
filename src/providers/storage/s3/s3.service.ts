import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { ChatToS3Properties } from 'src/common/domains/chat/chat.properties';
@Injectable()
export class S3Service {
  private readonly bucketName: string;
  constructor(
    private readonly s3Client: S3Client,
    private readonly configService: ConfigService
  ) {
    this.bucketName = this.configService.get<string>('BUCKET_NAME');
  }

  async uploadFile(data: ChatToS3Properties) {
    const { file, chatRoomId } = data;
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '');
    const s3key = `${chatRoomId}/${file.originalname}/${timestamp}`;
    console.log(s3key);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Body: file.buffer,
      Key: s3key,
      ContentDisposition: 'inline'
    });

    await this.s3Client.send(command);
    return s3key;
  }

  async generatePresignedUrl(filename: string, expiresIn: number = 3600) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filename
    });

    const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn });
    return presignedUrl;
  }
}
