import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';
import { LoggingMiddleware } from './common/logging/logging.middleware';
import { LoggerModule } from './common/logging/logger.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ProfileModule } from './profile/profile.module';
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
    LoggerModule,
    AuthModule,
    WorkoutsModule,
    ExercisesModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingMiddleware,
    AllExceptionsFilter
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
