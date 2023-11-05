import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { ClsServiceManager } from 'nestjs-cls';
import { map } from 'rxjs/operators';

import { LogMethod2 } from '../_decorator/log.decorator';

@Injectable()
export class NewHttpRequestInterceptor implements NestInterceptor {
  constructor() {
    Logger.log('New Instance of class', NewHttpRequestInterceptor.name);
  }

  async intercept(context: ExecutionContext, next: CallHandler) {
    const cls = ClsServiceManager.getClsService();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const now = Date.now();

    //Check if the request has transaction ID, otherwise creates a new one.
    cls.set('transId', req.transactionId);

    LogMethod2('Request', 'Interceptor', NewHttpRequestInterceptor.name, 'intercept', {
      method: req.method,
      URL: req.url,
    });

    return next.handle().pipe(
      map((data) => {
        res.header('x-transaction-id', cls.get('transId'));
        res.header('x-enviroment', process.env.NODE_ENV);
        res.header('X-Powered-By', 'VCRM');

        LogMethod2('Response', 'Interceptor', NewHttpRequestInterceptor.name, 'intercept', {
          method: req.method,
          URL: req.url,
          executionTime: Date.now() - now + 'ms',
        });

        return data;
      })
    );
  }
}
