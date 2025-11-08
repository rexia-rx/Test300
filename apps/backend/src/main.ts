import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';
import { LoggerService } from './common/logging/logger.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  const logger = app.get(LoggerService);
  app.useLogger(logger);

  const exceptionFilter = app.get(AllExceptionsFilter);
  app.useGlobalFilters(exceptionFilter);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT', 3000);

  await app.listen(port);
  logger.info('Application is running', {
    context: 'Bootstrap',
    url: `http://localhost:${port}`
  });
}
bootstrap();
