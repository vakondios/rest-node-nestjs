import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Deletes the empty spaces from strings
 */
@Injectable()
export class RequestHandlerInterceptor implements NestInterceptor {
  constructor() {
    Logger.log('New Instance of class', RequestHandlerInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const inputs = [request.query, request.body, request.params];

    for (const input of inputs) {
      for (const key in input) {
        const value = input[key];
        if (typeof value === 'string' || value instanceof String) {
          input[key] = value.trim();
        }
      }
    }
    return next.handle();
  }
}
