import { LoggerService } from './logger.service';
import { NextFunction, Request, Response } from 'express';

export function LogMiddleware(logger: LoggerService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;

      const logData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        responseTime: duration,
        request: { headers: req.headers, body: req.body },
        response: { headers: res.getHeaders(), errorMessage: res.locals.errorMessage || undefined }
      };

      if (res.statusCode >= 400) {
        logger.error(logData);
      } else {
        logger.info(logData);
      }
    });

    next();
  };
}
