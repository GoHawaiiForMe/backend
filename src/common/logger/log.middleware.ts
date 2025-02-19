import { NextFunction, Request, Response } from 'express';
import { logger } from './logger';

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      responseTime: `${duration}ms`,
      request: { headers: req.headers, body: req.body },
      response: { headers: res.getHeaders() }
    };

    if (res.statusCode >= 400) {
      logger.error(logData);
    } else {
      logger.info(logData);
    }
  });

  next();
}
