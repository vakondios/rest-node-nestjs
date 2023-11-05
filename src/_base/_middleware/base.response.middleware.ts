import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LogMethod3 } from '../_decorator/log.decorator';

@Injectable()
export class BaseResponseMiddleware implements NestMiddleware {
  constructor() {
    Logger.log('New Instance of class', BaseResponseMiddleware.name);
  }

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      LogMethod3(
        'Response',
        'Middleware',
        BaseResponseMiddleware.name,
        'use',
        request.transactionId,
        { statuscode: response.statusCode },
        { statusMessage: response.statusMessage },
        { method: request.method },
        { url: request.originalUrl }
      );
      //      return;
    });
    next();
  }
}
