import { HttpStatus } from '@nestjs/common';
import CustomError from './customError';

export default class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.UNAUTHORIZED, message);
  } // 401
}
