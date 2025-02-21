import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ChatToS3Properties } from 'src/modules/chat/domain/chat.properties';
import { ORIGIN } from 'src/common/constants/s3.constants';
import { v4 as uuidV4 } from 'uuid';
import InternalServerError from 'src/common/errors/internalServerError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';

@Injectable()
export class S3Service {
  constructor(private readonly s3Client: S3Client) {}

  async uploadFile(data: ChatToS3Properties) {
    const { file, chatRoomId } = data;
    const uniqueKey = uuidV4();
    const s3key = `${chatRoomId}/${uniqueKey}_${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.ORIGIN_BUCKET_NAME,
      Body: file.buffer,
      Key: s3key,
      ContentDisposition: 'inline'
    });

    await this.s3Client.send(command);
    return s3key;
  }

  async generatePresignedUrl(filename: string, bucket: string, expiresIn: number = 3600) {
    const finalFilename = bucket === ORIGIN ? filename : filename.replace(/\.[^/.]+$/, '.jpeg');
    const bucketName = bucket === ORIGIN ? process.env.ORIGIN_BUCKET_NAME : process.env.RESIZE_BUCKET_NAME;

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: finalFilename
    });

    try {
      const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn });
      return presignedUrl;
    } catch (e) {
      if (bucket === ORIGIN) throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR_S3_FILE);

      const originCommand = new GetObjectCommand({
        Bucket: process.env.ORIGIN_BUCKET_NAME,
        Key: filename
      });

      const presignedUrl = await getSignedUrl(this.s3Client, originCommand, { expiresIn });
      return presignedUrl;
    }
  }
}
