import { ORIGIN_BUCKET_NAME } from 'src/common/constants/s3.constants';

export default function getS3Config(bucketLabel: string) {
  const bucketName =
    bucketLabel === ORIGIN_BUCKET_NAME ? process.env.ORIGIN_BUCKET_NAME : process.env.RESIZE_BUCKET_NAME;
  return {
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESSKEY,
      secretAccessKey: process.env.S3_SECRET_ACCESSKEY,
      bucketName
    }
  };
}
