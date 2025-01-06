import { HttpStatus } from '@nestjs/common';
import CustomError from './customError';

export default class NotFoundError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, message);
  } // 404
}
