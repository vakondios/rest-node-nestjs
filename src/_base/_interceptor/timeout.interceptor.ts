import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
  Logger,
} from '@nestjs/common';
import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { LogMethod2 } from '../_decorator/log.decorator';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor() {
    Logger.log('New Instance of class', TimeoutInterceptor.name);
  }

  async intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          LogMethod2('Time out activated', 'Interceptor', TimeoutInterceptor.name, 'intercept');

          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      })
    );
  }
}
