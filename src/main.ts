import { NestFactory } from '@nestjs/core';
import { AppModule } from './_base/_modules/app.module';

async function bootstrap() {
    const app = await NestFactory.create(
      AppModule,
      {logger: process.env.NODE_ENV === 'development' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['error', 'warn'],}
    );


    app.enableShutdownHooks();

    await app.listen(process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000);
  }
bootstrap();
