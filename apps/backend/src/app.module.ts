import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';
import { LoggingMiddleware } from './common/logging/logging.middleware';
import { LoggerService } from './common/logging/logger.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
        BCRYPT_SALT_ROUNDS: Joi.number()
          .integer()
          .min(4)
          .max(15)
          .default(12),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('15m')
      }),
      validationOptions: {
        abortEarly: false
      }
    }),
    PrismaModule,
    AuthModule,
    WorkoutsModule,
    ExercisesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    LoggingMiddleware,
    AllExceptionsFilter
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
