import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { MB } from 'src/common/constants/chat.type';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    const file: Express.Multer.File = value; // 파일 정보 추출

    if (!file) throw new BadRequestException(ErrorMessage.CHAT_NOT_FILE_REQUEST);

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/quicktime'];
    const videoTypes = ['video/mp4', 'video/quicktime'];

    if (!allowedMimeTypes.includes(file.mimetype) && file.mimetype !== undefined) {
      throw new BadRequestException(ErrorMessage.CHAT_FILE_TYPE_NOT_SUPPORTED);
    }

    if (file.size > 5 * MB && !videoTypes.includes(file.mimetype)) {
      throw new BadRequestException(ErrorMessage.CHAT_FILE_SIZE_NOT_VIDEO);
    }

    if (file.size > 100 * MB) {
      throw new BadRequestException(ErrorMessage.CHAT_FILE_SIZE_VIDEO);
    }

    return value;
  }
}
