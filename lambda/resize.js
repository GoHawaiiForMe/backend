const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const s3Client = new S3Client();

module.exports.handler = async (event) => {
  const sourceBucket = event.Records[0].s3.bucket.name;
  let sourceKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  const destinationKey = sourceKey.replace(/\.[^/.]+$/, '.jpeg');

  const inputPath = `/tmp/${path.basename(sourceKey)}`;
  const outputPath = `/tmp/resized-${path.basename(destinationKey)}`;

  const destinationBucket = process.env.RESIZE_BUCKET_NAME;

  try {
    await downloadFromS3(sourceBucket, sourceKey, inputPath);

    const fileType = getFileType(sourceKey);
    if (fileType !== 'image') return;

    await resizeImage(inputPath, outputPath);
    await uploadToS3(destinationBucket, destinationKey, outputPath);

    return {
      statusCode: 200,
      body: JSON.stringify('File resized successfully')
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify('Error resizing file') };
  } finally {
    try {
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupError) {}
  }
};

async function downloadFromS3(bucket, key, filePath) {
  try {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const { Body } = await s3Client.send(command);
    fs.writeFileSync(filePath, await Body.transformToByteArray());
  } catch (error) {
    throw error;
  }
}

function getFileType(fileName) {
  const decodedFileName = decodeURIComponent(fileName);
  const fileBaseName = path.basename(decodedFileName);

  const ext = path.extname(fileBaseName).toLowerCase();

  if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) return 'image';
  return 'unknown';
}

async function resizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(400, 300, { fit: 'inside', withoutEnlargement: true })
      .toFormat('jpeg', { quality: 80 })
      .toFile(outputPath);
  } catch (error) {
    throw error;
  }
}

async function uploadToS3(bucket, key, filePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const contentType = 'image/jpeg';
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileContent,
      ContentType: contentType
    });
    await s3Client.send(command);
  } catch (error) {
    throw error;
  }
}
