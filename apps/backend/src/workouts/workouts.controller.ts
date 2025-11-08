import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
import { UpdateWorkoutDto } from './dto/update-workout.dto';

interface RequestWithUser extends Request {
  user?: { id?: string };
}

const CUID_REGEX = /^c[a-z0-9]{24}$/i;

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

  @Get(':id')
  @UseGuards(JwtAuthGuard, WorkoutOwnerGuard)
  async getSession(
    @Req() req: RequestWithUser,
    @Param('id') sessionId: string
  ): Promise<WorkoutSession> {
    if (!CUID_REGEX.test(sessionId)) {
      this.logger.warn('workouts.get_session.invalid_id', { sessionId });
      throw new BadRequestException('INVALID_WORKOUT_ID');
    }

    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('workouts.get_session.missing_user', { sessionId });
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('workouts.get_session.request', {
      sessionId,
      userId
    });

    const session = await this.workoutsService.getSessionById(userId, sessionId);

    this.logger.info('workouts.get_session.response', {
      sessionId,
      userId,
      loggedExerciseCount: session.loggedExercises?.length ?? 0
    });

    return session;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, WorkoutOwnerGuard)
  async editSession(
    @Req() req: RequestWithUser,
    @Param('id') sessionId: string,
    @Body() dto: UpdateWorkoutDto
  ): Promise<WorkoutSession> {
    if (!CUID_REGEX.test(sessionId)) {
      this.logger.warn('workouts.edit_session.invalid_id', { sessionId });
      throw new BadRequestException('INVALID_WORKOUT_ID');
    }

    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('workouts.edit_session.missing_user', { sessionId });
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('workouts.edit_session.request', {
      sessionId,
      userId
    });

    const session = await this.workoutsService.editSession(
      userId,
      sessionId,
      dto
    );

    this.logger.info('workouts.edit_session.response', {
      sessionId,
      userId,
      loggedExerciseCount: session.loggedExercises?.length ?? 0
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

  @Put(':id/complete')
  @UseGuards(JwtAuthGuard)
  async completeSession(
    @Req() req: RequestWithUser,
    @Param('id') sessionId: string
  ): Promise<WorkoutSession> {
    if (!CUID_REGEX.test(sessionId)) {
      this.logger.warn('workouts.complete_session.invalid_id', { sessionId });
      throw new BadRequestException('INVALID_WORKOUT_ID');
    }

    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('workouts.complete_session.missing_user', { sessionId });
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('workouts.complete_session.request', {
      sessionId,
      userId
    });

    const session = await this.workoutsService.completeSession(
      sessionId,
      userId
    );

    this.logger.info('workouts.complete_session.success', {
      sessionId,
      userId,
      endTime: session.endTime
    });

    return session;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSession(
    @Req() req: RequestWithUser,
    @Param('id') sessionId: string
  ): Promise<void> {
    if (!CUID_REGEX.test(sessionId)) {
      this.logger.warn('workouts.delete_session.invalid_id', { sessionId });
      throw new BadRequestException('INVALID_WORKOUT_ID');
    }

    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('workouts.delete_session.missing_user', { sessionId });
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('workouts.delete_session.request', {
      sessionId,
      userId
    });

    await this.workoutsService.deleteSession(userId, sessionId);

    this.logger.info('workouts.delete_session.success', {
      sessionId,
      userId
    });
  }
}
