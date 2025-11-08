import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import type { Request } from 'express';

import type { Exercise } from '@myfitness2/shared-types';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggerService } from '../common/logging/logger.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
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

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createExerciseDto: CreateExerciseDto
  ): Promise<Exercise> {
    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('exercises.create_custom.missing_user');
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('exercises.create_custom.request', {
      userId,
      name: createExerciseDto.name,
      type: createExerciseDto.type
    });

    const createdExercise = await this.exercisesService.createCustom(
      userId,
      createExerciseDto
    );

    this.logger.info('exercises.create_custom.response', {
      userId,
      exerciseId: createdExercise.id
    });

    return createdExercise;
  }
}
