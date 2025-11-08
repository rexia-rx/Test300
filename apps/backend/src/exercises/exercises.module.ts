import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { LoggerService } from '../common/logging/logger.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [ExercisesController],
  providers: [ExercisesService, LoggerService]
})
export class ExercisesModule {}
