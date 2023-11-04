import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LogMethod2 } from '../_decorator/log.decorator';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
 
  constructor()
  {Logger.log('New Instance of class', LoggingInterceptor.name);}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { params, query, body } = req;

    LogMethod2('Request Data','Interceptor',LoggingInterceptor.name,'intercept',{body: body},{params: params},{query: query});
    
    return next.handle().pipe(
      map((data) => {
        LogMethod2('Response Data','Interceptor',LoggingInterceptor.name,'intercept',{body: data});
        return data;
      }),
    );
  }
 }