import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Socket } from 'socket.io';
import CustomError from '../errors/customError';
import ErrorMessage from '../constants/errorMessage.enum';

@Catch()
class SocketExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof CustomError) {
      status = exception.statusCode;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse()['message'] || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = ErrorMessage.INTERNAL_SERVER_ERROR;
    }

    // 소켓 클라이언트에 에러 메시지 전송
    client.emit('Error', {
      statusCode: status,
      message
    });
  }
}

export default SocketExceptionFilter;
