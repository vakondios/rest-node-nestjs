import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';

import { AuthModule } from '../../auth/auth.module';
import { MetricModule } from '../../metric/metric.module';
import { ReportsModule } from '../../reports/report.module';
import { UserModule } from '../../user/user.module';
import { configService } from '../_config/configuration';
import { HttpExceptionFilter } from '../_filter/http.exception.filter';
import { ErrorInterceptor } from '../_interceptor/error.intercepror';
import { LoggingInterceptor } from '../_interceptor/logging.interceptor';
import { NewHttpRequestInterceptor } from '../_interceptor/new.http.request.interceptor';
import { TimeoutInterceptor } from '../_interceptor/timeout.interceptor';
import { BaseRequestMiddleware } from '../_middleware/base.request.middleware';
import { BaseResponseMiddleware } from '../_middleware/base.response.middleware';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ClsModule.forRoot({
      middleware: { mount: true },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => {
        return configService.getTypeOrmConfig();
      },
    }),
    MetricModule,
    UserModule,
    ReportsModule,
    AuthModule,
    ReportsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: NewHttpRequestInterceptor,
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
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor(private configeService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [configService.getCookieKey()],
        }),
        BaseRequestMiddleware,
        BaseResponseMiddleware
      )
      .forRoutes('*');
  }
}
