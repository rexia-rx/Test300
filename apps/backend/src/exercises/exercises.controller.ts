import {
  Controller,
  Get,
  Query,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import type { Request } from 'express';

import type { Exercise } from '@myfitness2/shared-types';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggerService } from '../common/logging/logger.service';
import { GetExercisesQueryDto } from './dto/get-exercises-query.dto';
import { ExercisesService } from './exercises.service';

interface RequestWithUser extends Request {
  user?: { id?: string };
}

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class ExercisesController {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly logger: LoggerService
  ) {}

  @Get()
  async findAll(
    @Req() req: RequestWithUser,
    @Query() query: GetExercisesQueryDto
  ): Promise<Exercise[]> {
    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('exercises.search.missing_user');
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('exercises.search.request', {
      userId,
      search: query.search ?? null
    });

    const exercises = await this.exercisesService.searchLibrary(query.search);

    this.logger.info('exercises.search.response', {
      userId,
      search: query.search ?? null,
      resultCount: exercises.length
    });

    return exercises;
  }
}
