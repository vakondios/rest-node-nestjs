import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserEntity } from 'src/user/user.entity';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from '../../user/user.service';
import { LogMethod3 } from '../_decorator/log.decorator';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
      transactionId?: string;
    }
  }
}

@Injectable()
export class BaseRequestMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {
    Logger.log('New Instance of class', BaseRequestMiddleware.name);
  }

  async use(request: Request, response: Response, next: NextFunction) {
    //Generate unique transaction Id for each incoming request or use the existing header 'x-correlation-id;
    const transactionId: string = request.get('x-correlation-id') || uuidv4();
    const RE = /-/gi;
    request.transactionId = transactionId.replace(RE, 'Z');

    LogMethod3(
      'Request',
      'Middleware',
      BaseRequestMiddleware.name,
      'use',
      request.transactionId,
      { statuscode: response.statusCode },
      { statusMessage: response.statusMessage },
      { method: request.method },
      { url: request.originalUrl }
    );

    //For the current user decorator and admin guard, assignes the user object to request, except when we want to clear the session.
    if (request.baseUrl !== '/auth/signout') {
      const { userId } = request.session || {};
      if (userId) {
        const user = await this.userService.findOneById(userId);
        request.currentUser = user;
      }
    }
    next();
  }
}
