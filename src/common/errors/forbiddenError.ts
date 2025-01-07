import { HttpStatus } from '@nestjs/common';
import CustomError from './customError';

export default class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.FORBIDDEN, message);
  }
}
