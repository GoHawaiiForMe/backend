import mongoose from 'mongoose';
import BadRequestError from '../errors/badRequestError';
import ConflictError from '../errors/conflictError';
import InternalServerError from '../errors/internalServerError';
import NotFoundError from '../errors/notFoundError';
import ErrorMessage from '../constants/errorMessage.enum';

export default function handleMongooseError(error: mongoose.Error): void {
  if (error instanceof mongoose.Error.ValidationError) {
    throw new BadRequestError(ErrorMessage.CHAT_ROOM_BAD_VALUE);
  }

  if (error instanceof mongoose.Error.CastError) {
    throw new NotFoundError(ErrorMessage.CHAT_ROOM_NOTFOUND);
  }

  if (error instanceof mongoose.mongo.MongoError && error.code === 11000) {
    throw new ConflictError(ErrorMessage.CHAT_ROOM_CONFLICT);
  }

  throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR_MONGOOSE);
}
