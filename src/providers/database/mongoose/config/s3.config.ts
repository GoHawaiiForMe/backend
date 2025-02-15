export default function getS3Config() {
  return {
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESSKEY,
      secretAccessKey: process.env.S3_SECRET_ACCESSKEY
    }
  };
}
