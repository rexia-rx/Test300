import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { Request } from 'express';

import {
  CardioEntry,
  StrengthSet,
  WorkoutSession
} from '@myfitness2/shared-types';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggerService } from '../common/logging/logger.service';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { CreateStrengthSetDto } from './dto/create-strength-set.dto';
import { CreateCardioEntryDto } from './dto/create-cardio-entry.dto';
import { WorkoutOwnerGuard } from './guards/workout-owner.guard';
import { WorkoutsService } from './workouts.service';

interface RequestWithUser extends Request {
  user?: { id?: string };
}

@Controller('workouts')
export class WorkoutsController {
  constructor(
    private readonly workoutsService: WorkoutsService,
    private readonly logger: LoggerService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async startSession(
    @Req() req: RequestWithUser,
    @Body() dto: CreateWorkoutSessionDto
  ): Promise<WorkoutSession> {
    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('workouts.start_session.missing_user');
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('workouts.start_session.request', {
      userId,
      startTime: dto.startTime
    });

    const session = await this.workoutsService.startSession(userId, dto);

    this.logger.info('workouts.start_session.response', {
      userId,
      sessionId: session.id
    });

    return session;
  }

  @Post(':workoutId/logged-exercises/:loggedExerciseId/sets')
  @UseGuards(JwtAuthGuard, WorkoutOwnerGuard)
  @HttpCode(HttpStatus.CREATED)
  async logStrengthSet(
    @Req() req: RequestWithUser,
    @Param('workoutId') workoutId: string,
    @Param('loggedExerciseId') loggedExerciseId: string,
    @Body() dto: CreateStrengthSetDto
  ): Promise<StrengthSet> {
    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('workouts.log_strength_set.missing_user');
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('workouts.log_strength_set.request', {
      userId,
      workoutId,
      loggedExerciseId,
      reps: dto.reps,
      weight: dto.weight
    });

    const strengthSet = await this.workoutsService.logStrengthSet(
      userId,
      workoutId,
      loggedExerciseId,
      dto
    );

    this.logger.info('workouts.log_strength_set.response', {
      userId,
      workoutId,
      loggedExerciseId,
      setId: strengthSet.id,
      setNumber: strengthSet.setNumber
    });

    return strengthSet;
  }

  @Post(':workoutId/logged-exercises/:loggedExerciseId/cardio')
  @UseGuards(JwtAuthGuard, WorkoutOwnerGuard)
  @HttpCode(HttpStatus.CREATED)
  async logCardioEntry(
    @Req() req: RequestWithUser,
    @Param('workoutId') workoutId: string,
    @Param('loggedExerciseId') loggedExerciseId: string,
    @Body() dto: CreateCardioEntryDto
  ): Promise<CardioEntry> {
    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('workouts.log_cardio_entry.missing_user');
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('workouts.log_cardio_entry.request', {
      userId,
      workoutId,
      loggedExerciseId,
      durationSeconds: dto.durationSeconds,
      distanceMeters: dto.distanceMeters
    });

    const cardioEntry = await this.workoutsService.logCardioEntry(
      userId,
      workoutId,
      loggedExerciseId,
      dto
    );

    this.logger.info('workouts.log_cardio_entry.response', {
      userId,
      workoutId,
      loggedExerciseId,
      cardioEntryId: cardioEntry.id
    });

    return cardioEntry;
  }
}
