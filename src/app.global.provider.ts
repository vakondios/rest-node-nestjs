import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from '@app/core/base/filter/http.exception.filter';
import { ErrorInterceptor } from '@app/core/base/interceptor/error.intercepror';
import { LoggingInterceptor } from '@app/core/base/interceptor/logging.interceptor';
import { NewHttpRequestInterceptor } from '@app/core/base/interceptor/new.http.request.interceptor';
import { RequestHandlerInterceptor } from '@app/core/base/interceptor/request.handler.interceptor';
import { TimeoutInterceptor } from '@app/core/base/interceptor/timeout.interceptor';
import { AppConfig } from '@app/core/config/application.configuration';


export const getGlobalProviders = [
  AppConfig, 
  // Bind All Global Interceptors
  {
    provide: APP_INTERCEPTOR,
    useClass: NewHttpRequestInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: RequestHandlerInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ErrorInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TimeoutInterceptor,
  },
  // Bind All Glocal Filters
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
];
