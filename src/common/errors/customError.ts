import { HttpStatus } from '@nestjs/common';

export default class CustomError extends Error {
  constructor(
    public readonly statusCode: HttpStatus,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public getStatusCode(): HttpStatus {
    return this.statusCode;
  }
}
