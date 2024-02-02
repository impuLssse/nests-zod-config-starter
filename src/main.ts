import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from '@config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfig);

  await app.listen(config.HTTP_PORT);
  Logger.log(`Listening ${config.HTTP_PORT} port`, 'Server');
}
bootstrap();
