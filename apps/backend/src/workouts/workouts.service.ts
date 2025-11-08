import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';

import {
  CardioEntry as CardioEntryPayload,
  StrengthSet as StrengthSetPayload,
  WorkoutSession
} from '@myfitness2/shared-types';

import { LoggerService } from '../common/logging/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { CreateStrengthSetDto } from './dto/create-strength-set.dto';
import { CreateCardioEntryDto } from './dto/create-cardio-entry.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService
  ) {}

  async startSession(
    userId: string,
    dto: CreateWorkoutSessionDto
  ): Promise<WorkoutSession> {
    const requestedStartTime = dto.startTime ?? 'now';

    this.logger.info('workouts.start_session.attempt', {
      userId,
      requestedStartTime
    });

    const startTime = dto.startTime ? new Date(dto.startTime) : new Date();

    try {
      const createdSession = await this.prisma.workoutSession.create({
        data: {
          userId,
          startTime
        }
      });

      const session: WorkoutSession = {
        id: createdSession.id,
        userId: createdSession.userId,
        startTime: createdSession.startTime.toISOString(),
        endTime: createdSession.endTime
          ? createdSession.endTime.toISOString()
          : null,
        createdAt: createdSession.createdAt.toISOString(),
        updatedAt: createdSession.updatedAt.toISOString(),
        loggedExercises: []
      };

      this.logger.info('workouts.start_session.success', {
        userId,
        sessionId: session.id
      });

      return session;
    } catch (error) {
      this.logger.error(
        'workouts.start_session.failed',
        (error as Error).stack,
        {
          userId,
          requestedStartTime
        }
      );
      throw new InternalServerErrorException('WORKOUT_START_FAILED');
    }
  }

  async ensureSessionOwnership(
    userId: string,
    workoutId: string
  ): Promise<void> {
    const session = await this.prisma.workoutSession.findUnique({
      where: { id: workoutId }
    });

    if (!session) {
      this.logger.warn('workouts.session_not_found', {
        userId,
        workoutId
      });
      throw new NotFoundException('WORKOUT_NOT_FOUND');
    }

    if (session.userId !== userId) {
      this.logger.warn('workouts.session_forbidden', {
        userId,
        workoutId
      });
      throw new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN');
    }
  }

  async logStrengthSet(
    userId: string,
    workoutId: string,
    loggedExerciseId: string,
    dto: CreateStrengthSetDto
  ): Promise<StrengthSetPayload> {
    if (dto.reps < 0 || dto.weight < 0) {
      this.logger.warn('workouts.log_strength_set.invalid_payload', {
        userId,
        workoutId,
        loggedExerciseId,
        dto
      });
      throw new BadRequestException('INVALID_STRENGTH_SET');
    }

    await this.ensureSessionOwnership(userId, workoutId);

    const prisma = this.prisma as unknown as {
      loggedExercise: {
        findUnique: (args: unknown) => Promise<
          | {
              id: string;
              sessionId: string;
              exerciseId: string;
              createdAt: Date;
              updatedAt: Date;
              notes: string | null;
              session: { userId: string };
            }
          | null
        >;
      };
      strengthSet: {
        findFirst: (args: unknown) => Promise<
          | {
              setNumber: number;
            }
          | null
        >;
        create: (args: unknown) => Promise<{
          id: string;
          loggedExerciseId: string;
          setNumber: number;
          reps: number;
          weight: number;
          createdAt: Date;
        }>;
      };
      cardioEntry: {
        findUnique: (args: unknown) => Promise<
          | {
              id: string;
              loggedExerciseId: string;
              durationSeconds: number | null;
              distanceMeters: number | null;
              createdAt: Date;
            }
          | null
        >;
        create: (args: unknown) => Promise<{
          id: string;
          loggedExerciseId: string;
          durationSeconds: number | null;
          distanceMeters: number | null;
          createdAt: Date;
        }>;
      };
    };

    const loggedExercise = await prisma.loggedExercise.findUnique({
      where: { id: loggedExerciseId },
      include: { session: true }
    } as never);

    if (!loggedExercise) {
      this.logger.warn('workouts.log_strength_set.logged_exercise_missing', {
        userId,
        workoutId,
        loggedExerciseId
      });
      throw new NotFoundException('LOGGED_EXERCISE_NOT_FOUND');
    }

    if (loggedExercise.sessionId !== workoutId) {
      this.logger.warn('workouts.log_strength_set.session_mismatch', {
        userId,
        workoutId,
        loggedExerciseId
      });
      throw new ForbiddenException('WORKOUT_EXERCISE_MISMATCH');
    }

    if (loggedExercise.session.userId !== userId) {
      this.logger.warn('workouts.log_strength_set.forbidden', {
        userId,
        workoutId,
        loggedExerciseId
      });
      throw new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN');
    }

    const latestSet = await prisma.strengthSet.findFirst({
      where: { loggedExerciseId },
      orderBy: { setNumber: 'desc' }
    } as never);

    const nextSetNumber = (latestSet?.setNumber ?? 0) + 1;

    const createdSet = await prisma.strengthSet.create({
      data: {
        loggedExerciseId,
        setNumber: nextSetNumber,
        reps: dto.reps,
        weight: dto.weight
      }
    } as never);

    const strengthSet: StrengthSetPayload = {
      id: createdSet.id,
      loggedExerciseId: createdSet.loggedExerciseId,
      setNumber: createdSet.setNumber,
      reps: createdSet.reps,
      weight: createdSet.weight,
      createdAt: createdSet.createdAt.toISOString()
    };

    this.logger.info('workouts.log_strength_set.success', {
      userId,
      workoutId,
      loggedExerciseId,
      setId: strengthSet.id,
      setNumber: strengthSet.setNumber
    });

    return strengthSet;
  }

  async logCardioEntry(
    userId: string,
    workoutId: string,
    loggedExerciseId: string,
    dto: CreateCardioEntryDto
  ): Promise<CardioEntryPayload> {
    const hasDuration =
      dto.durationSeconds !== undefined && dto.durationSeconds !== null;
    const hasDistance =
      dto.distanceMeters !== undefined && dto.distanceMeters !== null;

    if (!hasDuration && !hasDistance) {
      this.logger.warn('workouts.log_cardio_entry.invalid_payload', {
        userId,
        workoutId,
        loggedExerciseId,
        dto
      });
      throw new BadRequestException('INVALID_CARDIO_ENTRY');
    }

    await this.ensureSessionOwnership(userId, workoutId);

    const prisma = this.prisma as unknown as {
      loggedExercise: {
        findUnique: (args: unknown) => Promise<
          | {
              id: string;
              sessionId: string;
              exerciseId: string;
              createdAt: Date;
              updatedAt: Date;
              notes: string | null;
              session: { userId: string };
            }
          | null
        >;
      };
      cardioEntry: {
        findUnique: (args: unknown) => Promise<
          | {
              id: string;
              loggedExerciseId: string;
              durationSeconds: number | null;
              distanceMeters: number | null;
              createdAt: Date;
            }
          | null
        >;
        create: (args: unknown) => Promise<{
          id: string;
          loggedExerciseId: string;
          durationSeconds: number | null;
          distanceMeters: number | null;
          createdAt: Date;
        }>;
      };
    };

    const loggedExercise = await prisma.loggedExercise.findUnique({
      where: { id: loggedExerciseId },
      include: { session: true }
    } as never);

    if (!loggedExercise) {
      this.logger.warn('workouts.log_cardio_entry.logged_exercise_missing', {
        userId,
        workoutId,
        loggedExerciseId
      });
      throw new NotFoundException('LOGGED_EXERCISE_NOT_FOUND');
    }

    if (loggedExercise.sessionId !== workoutId) {
      this.logger.warn('workouts.log_cardio_entry.session_mismatch', {
        userId,
        workoutId,
        loggedExerciseId
      });
      throw new ForbiddenException('WORKOUT_EXERCISE_MISMATCH');
    }

    if (loggedExercise.session.userId !== userId) {
      this.logger.warn('workouts.log_cardio_entry.forbidden', {
        userId,
        workoutId,
        loggedExerciseId
      });
      throw new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN');
    }

    const existingEntry = await prisma.cardioEntry.findUnique({
      where: { loggedExerciseId }
    } as never);

    if (existingEntry) {
      this.logger.warn('workouts.log_cardio_entry.conflict', {
        userId,
        workoutId,
        loggedExerciseId,
        cardioEntryId: existingEntry.id
      });
      throw new ConflictException('CARDIO_ENTRY_ALREADY_EXISTS');
    }

    const createdEntry = await prisma.cardioEntry.create({
      data: {
        loggedExerciseId,
        durationSeconds: hasDuration ? dto.durationSeconds! : null,
        distanceMeters: hasDistance ? dto.distanceMeters! : null
      }
    } as never);

    const cardioEntry: CardioEntryPayload = {
      id: createdEntry.id,
      loggedExerciseId: createdEntry.loggedExerciseId,
      durationSeconds: createdEntry.durationSeconds,
      distanceMeters: createdEntry.distanceMeters,
      createdAt: createdEntry.createdAt.toISOString()
    };

    this.logger.info('workouts.log_cardio_entry.success', {
      userId,
      workoutId,
      loggedExerciseId,
      cardioEntryId: cardioEntry.id
    });

    return cardioEntry;
  }
}
