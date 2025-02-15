const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

console.log('Function started');

const s3Client = new S3Client();

module.exports.handler = async (event) => {
  const sourceBucket = event.Records[0].s3.bucket.name;
  let sourceKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  // 확장자를 .jpeg로 강제 변경
  const destinationKey = sourceKey.replace(/\.[^/.]+$/, '.jpeg');

  const inputPath = `/tmp/${path.basename(sourceKey)}`;
  const outputPath = `/tmp/resized-${path.basename(destinationKey)}`;

  const destinationBucket = process.env.RESIZE_BUCKET_NAME; // 여기에서 업로드할 S3 버킷 이름을 지정하세요.

  try {
    console.log(`Start: ${new Date()}`);
    console.log(`Source Bucket: ${sourceBucket}`);
    console.log(`Source Key: ${sourceKey}`);
    console.log(`Destination Bucket: ${destinationBucket}`); // destinationBucket 로그 추가
    console.log(`Destination Key: ${destinationKey}`);

    // 다운로드
    await downloadFromS3(sourceBucket, sourceKey, inputPath);

    // 파일 타입 확인
    const fileType = getFileType(sourceKey);
    console.log(`File type: ${fileType}`);

    if (fileType !== 'image') {
      return;
    }

    console.log('Resizing image...');
    await resizeImage(inputPath, outputPath);

    // 업로드
    await uploadToS3(destinationBucket, destinationKey, outputPath);
    console.log('File resized and uploaded successfully.');

    return {
      statusCode: 200,
      body: JSON.stringify('File resized successfully')
    };
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
    return { statusCode: 500, body: JSON.stringify('Error resizing file') };
  } finally {
    try {
      // 임시 파일 삭제
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      console.log('Temporary files cleaned up.');
    } catch (cleanupError) {
      console.error(`Cleanup failed: ${cleanupError.message}`);
    }
  }
};

async function downloadFromS3(bucket, key, filePath) {
  try {
    console.log(`Downloading file from S3: ${bucket}/${key}`);
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const { Body } = await s3Client.send(command);
    fs.writeFileSync(filePath, await Body.transformToByteArray());
    console.log(`File downloaded successfully: ${filePath}`);
  } catch (error) {
    console.error(`Failed to download file from S3: ${error.message}`);
    throw error;
  }
}

function getFileType(fileName) {
  const decodedFileName = decodeURIComponent(fileName);
  const fileBaseName = path.basename(decodedFileName);
  console.log(`Decoded file name: ${fileBaseName}`);

  const ext = path.extname(fileBaseName).toLowerCase();
  console.log(`File extension: ${ext}`);

  if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) return 'image';
  return 'unknown';
}

async function resizeImage(inputPath, outputPath) {
  try {
    console.log(`Resizing image: ${inputPath} -> ${outputPath}`);
    await sharp(inputPath)
      .resize(400, 300, { fit: 'inside', withoutEnlargement: true })
      .toFormat('jpeg', { quality: 80 }) // 항상 JPEG로 변환
      .toFile(outputPath);
    console.log(`Image resized and saved as JPEG: ${outputPath}`);
  } catch (error) {
    console.error(`Failed to resize image: ${error.message}`);
    throw error;
  }
}

async function uploadToS3(bucket, key, filePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const contentType = 'image/jpeg'; // 항상 JPEG로 설정
    console.log(`Uploading file to S3: ${bucket}/${key}`);
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileContent,
      ContentType: contentType
    });
    await s3Client.send(command);
    console.log(`File uploaded successfully to: ${bucket}/${key}`);
  } catch (error) {
    console.error(`Failed to upload file to S3: ${error.message}`);
    throw error;
  }
}
