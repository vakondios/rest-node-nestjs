import { shouldCompress } from '@app/core/compression/compression';
import { corsOptions } from '@app/core/cor/cor.config';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import cors from 'cors';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { createLogger } from 'winston';

import { AppModule } from '@app/app.module';

async function bootstrap() {
  

const app = await NestFactory.create(AppModule);

  // Global Prefix
  // app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  // middlewares, express specific
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());
  app.use(
    compression({
      filter: shouldCompress,
      //threshold: 1024,
      threshold: 0,
    })
  );
  // CORS configuration
  app.use(cors(corsOptions));
  // Auto-validation
  // We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
  //app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);
  const PORT = config.get('srv.port');
  const NETWORK = config.get('srv.network');
  const ENVIROMENT = config.get('app.env');

  await app.listen(PORT, NETWORK);

  Logger.log(`Environment: ${ENVIROMENT}, Running Network:Port: ${NETWORK}:${PORT}`, 'bootstrap()');
}
bootstrap();
