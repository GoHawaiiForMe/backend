import { HttpStatus } from '@nestjs/common';
import CustomError from './customError';

export default class ConflictError extends CustomError {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, message);
  } // 409
}
