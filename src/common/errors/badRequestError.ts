import { HttpStatus } from '@nestjs/common';
import CustomError from './customError';

export default class BadRequestError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
  } // 400
}
