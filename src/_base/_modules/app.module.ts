import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { ReportsModule } from '../../reports/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricModule } from '../../metric/metric.module';
import { configService } from '../_config/configuration';
import { BaseResponseMiddleware } from '../_middleware/base.response.middleware';
import { ClsModule } from 'nestjs-cls';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { NewHttpRequestInterceptor } from '../_interceptor/new.http.request.interceptor';
import { ErrorInterceptor } from '../_interceptor/error.intercepror';
import { LoggingInterceptor } from '../_interceptor/logging.interceptor';
import { TimeoutInterceptor } from '../_interceptor/timeout.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../../auth/auth.module';
import { HttpExceptionFilter } from '../_filter/http.exception.filter';
import { BaseRequestMiddleware } from '../_middleware/base.request.middleware';

const cookieSession = require('cookie-session')

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}` 
      }),
      ClsModule.forRoot({
          middleware: {mount: true,},
      }),
      TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService) => {
              return configService.getTypeOrmConfig();
          }
      }),
      MetricModule,
      UserModule, 
      ReportsModule,
      AuthModule,  
      ReportsModule
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
    }

    
  ]
  
})
export class AppModule {
  constructor(private configeService:ConfigService){}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( 
        cookieSession({
          keys: [configService.getCookieKey()],
        }),
        BaseRequestMiddleware,
        BaseResponseMiddleware,
      )
      .forRoutes('*');
  } 
}