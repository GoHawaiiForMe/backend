import { HttpStatus } from '@nestjs/common';
import CustomError from './customError';

export default class InternalServerError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}
