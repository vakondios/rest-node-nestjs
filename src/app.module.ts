import { BaseRequestMiddleware } from '@app/core/base/middleware/base.request.middleware';
import { BaseResponseMiddleware } from '@app/core/base/middleware/base.response.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { getGlobalProviders } from '@app/app.global.provider';
import { ConfigService } from '@nestjs/config';
import { getGlobalImport } from './app.global.import';

@Module({
  imports: getGlobalImport,
  providers: getGlobalProviders,
  exports: [],
})
export class AppModule {
  constructor(private configeService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BaseRequestMiddleware, BaseResponseMiddleware).forRoutes('*');
  }
}
