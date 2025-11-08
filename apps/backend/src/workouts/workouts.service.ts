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
  Exercise,
  StrengthSet as StrengthSetPayload,
  WorkoutSession
} from '@myfitness2/shared-types';
import { Prisma } from '@prisma/client';

import { LoggerService } from '../common/logging/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { CreateStrengthSetDto } from './dto/create-strength-set.dto';
import { CreateCardioEntryDto } from './dto/create-cardio-entry.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

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

  async getSessionById(
    userId: string,
    workoutId: string
  ): Promise<WorkoutSession> {
    this.logger.info('workouts.get_session.attempt', { userId, workoutId });

    const session = await this.prisma.workoutSession.findUnique({
      where: { id: workoutId },
      include: {
        loggedExercises: {
          include: {
            exercise: true,
            strengthSets: true,
            cardioEntry: true
          }
        }
      }
    });

    if (!session) {
      this.logger.warn('workouts.get_session.not_found', { userId, workoutId });
      throw new NotFoundException('WORKOUT_NOT_FOUND');
    }

    if (session.userId !== userId) {
      this.logger.warn('workouts.get_session.forbidden', {
        userId,
        workoutId
      });
      throw new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN');
    }

    const payload = this.mapSession(session);

    this.logger.info('workouts.get_session.success', {
      userId,
      workoutId,
      loggedExerciseCount: payload.loggedExercises?.length ?? 0
    });

    return payload;
  }

  async completeSession(
    sessionId: string,
    userId: string
  ): Promise<WorkoutSession> {
    this.logger.info('workouts.complete_session.attempt', {
      sessionId,
      userId
    });

    const session = await this.prisma.workoutSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      this.logger.warn('workouts.complete_session.not_found', {
        sessionId,
        userId
      });
      throw new NotFoundException('WORKOUT_NOT_FOUND');
    }

    if (session.userId !== userId) {
      this.logger.warn('workouts.complete_session.forbidden', {
        sessionId,
        userId
      });
      throw new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN');
    }

    if (session.endTime) {
      this.logger.warn('workouts.complete_session.already_completed', {
        sessionId,
        userId
      });
      throw new BadRequestException('WORKOUT_ALREADY_COMPLETED');
    }

    const completionTime = new Date();

    const updated = await this.prisma.workoutSession.update({
      where: { id: sessionId },
      data: { endTime: completionTime }
    });

    const payload: WorkoutSession = {
      id: updated.id,
      userId: updated.userId,
      startTime: updated.startTime.toISOString(),
      endTime: updated.endTime ? updated.endTime.toISOString() : null,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
      loggedExercises: []
    };

    this.logger.info('workouts.complete_session.completed', {
      sessionId,
      userId,
      endTime: payload.endTime
    });

    return payload;
  }

  async deleteSession(userId: string, sessionId: string): Promise<void> {
    this.logger.info('workouts.delete_session.attempt', {
      sessionId,
      userId
    });

    try {
      await this.ensureSessionOwnership(userId, sessionId);

      await this.prisma.workoutSession.delete({
        where: { id: sessionId }
      });

      this.logger.info('workouts.delete_session.success', {
        sessionId,
        userId
      });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ForbiddenException) {
        throw error;
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        this.logger.warn('workouts.delete_session.not_found', {
          sessionId,
          userId
        });
        throw new NotFoundException('WORKOUT_NOT_FOUND');
      }

      this.logger.error('workouts.delete_session.failure', (error as Error).stack, {
        sessionId,
        userId
      });
      throw new InternalServerErrorException('WORKOUT_DELETE_FAILED');
    }
  }

  private mapExercise(exercise: {
    id: string;
    name: string;
    type: string;
    createdById: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Exercise {
    return {
      id: exercise.id,
      name: exercise.name,
      type: exercise.type as Exercise['type'],
      createdById: exercise.createdById,
      createdAt: exercise.createdAt.toISOString(),
      updatedAt: exercise.updatedAt.toISOString()
    };
  }

  private mapSession(record: {
    id: string;
    userId: string;
    startTime: Date;
    endTime: Date | null;
    createdAt: Date;
    updatedAt: Date;
    loggedExercises: Array<{
      id: string;
      sessionId: string;
      exerciseId: string;
      notes: string | null;
      createdAt: Date;
      updatedAt: Date;
      exercise: {
        id: string;
        name: string;
        type: string;
        createdById: string | null;
        createdAt: Date;
        updatedAt: Date;
      } | null;
      strengthSets: Array<{
        id: string;
        loggedExerciseId: string;
        setNumber: number;
        reps: number;
        weight: number;
        createdAt: Date;
      }>;
      cardioEntry: {
        id: string;
        loggedExerciseId: string;
        durationSeconds: number | null;
        distanceMeters: number | null;
        createdAt: Date;
      } | null;
    }>;
  }): WorkoutSession {
    return {
      id: record.id,
      userId: record.userId,
      startTime: record.startTime.toISOString(),
      endTime: record.endTime ? record.endTime.toISOString() : null,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
      loggedExercises: record.loggedExercises.map((logged) => ({
        id: logged.id,
        sessionId: logged.sessionId,
        exerciseId: logged.exerciseId,
        notes: logged.notes,
        createdAt: logged.createdAt.toISOString(),
        updatedAt: logged.updatedAt.toISOString(),
        exercise: logged.exercise ? this.mapExercise(logged.exercise) : undefined,
        strengthSets: logged.strengthSets.map((set) => ({
          id: set.id,
          loggedExerciseId: set.loggedExerciseId,
          setNumber: set.setNumber,
          reps: set.reps,
          weight: set.weight,
          createdAt: set.createdAt.toISOString()
        })),
        cardioEntry: logged.cardioEntry
          ? {
              id: logged.cardioEntry.id,
              loggedExerciseId: logged.cardioEntry.loggedExerciseId,
              durationSeconds: logged.cardioEntry.durationSeconds,
              distanceMeters: logged.cardioEntry.distanceMeters,
              createdAt: logged.cardioEntry.createdAt.toISOString()
            }
          : null
      }))
    };
  }

  async editSession(
    userId: string,
    workoutId: string,
    dto: UpdateWorkoutDto
  ): Promise<WorkoutSession> {
    this.logger.info('workouts.edit_session.attempt', {
      userId,
      workoutId
    });

    const existing = await this.prisma.workoutSession.findUnique({
      where: { id: workoutId },
      include: {
        loggedExercises: {
          include: {
            exercise: true,
            strengthSets: true,
            cardioEntry: true
          }
        }
      }
    });

    if (!existing) {
      this.logger.warn('workouts.edit_session.not_found', {
        userId,
        workoutId
      });
      throw new NotFoundException('WORKOUT_NOT_FOUND');
    }

    if (existing.userId !== userId) {
      this.logger.warn('workouts.edit_session.forbidden', {
        userId,
        workoutId
      });
      throw new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN');
    }

    let requestedStartTime: Date | undefined;
    let requestedEndTime: Date | undefined;

    if (dto.startTime) {
      requestedStartTime = new Date(dto.startTime);
      if (Number.isNaN(requestedStartTime.getTime())) {
        this.logger.warn('workouts.edit_session.invalid_start_time', {
          userId,
          workoutId,
          startTime: dto.startTime
        });
        throw new BadRequestException('INVALID_START_TIME');
      }
    }

    if (dto.endTime) {
      requestedEndTime = new Date(dto.endTime);
      if (Number.isNaN(requestedEndTime.getTime())) {
        this.logger.warn('workouts.edit_session.invalid_end_time', {
          userId,
          workoutId,
          endTime: dto.endTime
        });
        throw new BadRequestException('INVALID_END_TIME');
      }
    }

    const effectiveStartTime = requestedStartTime ?? existing.startTime;
    const effectiveEndTime = requestedEndTime ?? existing.endTime ?? null;

    if (effectiveEndTime && effectiveStartTime > effectiveEndTime) {
      this.logger.warn('workouts.edit_session.invalid_time_range', {
        userId,
        workoutId,
        startTime: dto.startTime,
        endTime: dto.endTime
      });
      throw new BadRequestException('INVALID_TIME_RANGE');
    }

    const existingLoggedMap = new Map(
      existing.loggedExercises.map((exercise) => [exercise.id, exercise])
    );

    try {
      await this.prisma.$transaction(async (tx) => {
        const updateData: Record<string, Date> = {};
        if (requestedStartTime) {
          updateData.startTime = requestedStartTime;
        }
        if (requestedEndTime) {
          updateData.endTime = requestedEndTime;
        }

        if (Object.keys(updateData).length > 0) {
          await tx.workoutSession.update({
            where: { id: workoutId },
            data: updateData
          });
        }

        if (dto.loggedExercises) {
          const processedIds = new Set<string>();

          for (const loggedExerciseDto of dto.loggedExercises) {
            const exerciseRecord = await tx.exercise.findUnique({
              where: { id: loggedExerciseDto.exerciseId }
            });

            if (!exerciseRecord) {
              this.logger.warn('workouts.edit_session.exercise_missing', {
                userId,
                workoutId,
                exerciseId: loggedExerciseDto.exerciseId
              });
              throw new BadRequestException('EXERCISE_NOT_FOUND');
            }

            if (exerciseRecord.type !== loggedExerciseDto.type) {
              this.logger.warn('workouts.edit_session.exercise_type_mismatch', {
                userId,
                workoutId,
                exerciseId: loggedExerciseDto.exerciseId,
                expected: exerciseRecord.type,
                received: loggedExerciseDto.type
              });
              throw new BadRequestException('EXERCISE_TYPE_MISMATCH');
            }

            let loggedExerciseId = loggedExerciseDto.id;

            if (loggedExerciseDto.id) {
              const existingLogged = existingLoggedMap.get(loggedExerciseDto.id);

              if (!existingLogged) {
                this.logger.warn('workouts.edit_session.logged_exercise_missing', {
                  userId,
                  workoutId,
                  loggedExerciseId: loggedExerciseDto.id
                });
                throw new NotFoundException('LOGGED_EXERCISE_NOT_FOUND');
              }

              await tx.loggedExercise.update({
                where: { id: loggedExerciseDto.id },
                data: {
                  exerciseId: loggedExerciseDto.exerciseId,
                  notes: loggedExerciseDto.notes ?? null
                }
              });
            } else {
              const created = await tx.loggedExercise.create({
                data: {
                  sessionId: workoutId,
                  exerciseId: loggedExerciseDto.exerciseId,
                  notes: loggedExerciseDto.notes ?? null
                }
              });
              loggedExerciseId = created.id;
            }

            if (!loggedExerciseId) {
              continue;
            }

            processedIds.add(loggedExerciseId);

            if (loggedExerciseDto.type === 'STRENGTH') {
              if (loggedExerciseDto.cardioEntry) {
                this.logger.warn('workouts.edit_session.cardio_for_strength', {
                  userId,
                  workoutId,
                  loggedExerciseId
                });
                throw new BadRequestException('CARDIO_NOT_ALLOWED_FOR_STRENGTH');
              }

              if (loggedExerciseDto.strengthSets) {
                const existingSets = existingLoggedMap.get(
                  loggedExerciseDto.id ?? ''
                )?.strengthSets;

                const existingSetIds = new Set(
                  (existingSets ?? []).map((set) => set.id)
                );
                const receivedIds = new Set<string>();

                for (const setDto of loggedExerciseDto.strengthSets) {
                  if (setDto.reps < 0 || setDto.weight < 0 || setDto.setNumber < 1) {
                    this.logger.warn('workouts.edit_session.invalid_strength_set', {
                      userId,
                      workoutId,
                      loggedExerciseId,
                      set: setDto
                    });
                    throw new BadRequestException('INVALID_STRENGTH_SET');
                  }

                  if (setDto.id) {
                    if (!existingSetIds.has(setDto.id)) {
                      this.logger.warn(
                        'workouts.edit_session.strength_set_missing',
                        {
                          userId,
                          workoutId,
                          loggedExerciseId,
                          setId: setDto.id
                        }
                      );
                      throw new NotFoundException('STRENGTH_SET_NOT_FOUND');
                    }

                    await tx.strengthSet.update({
                      where: { id: setDto.id },
                      data: {
                        reps: setDto.reps,
                        weight: setDto.weight,
                        setNumber: setDto.setNumber
                      }
                    });
                    receivedIds.add(setDto.id);
                  } else {
                    const createdSet = await tx.strengthSet.create({
                      data: {
                        loggedExerciseId,
                        reps: setDto.reps,
                        weight: setDto.weight,
                        setNumber: setDto.setNumber
                      }
                    });
                    receivedIds.add(createdSet.id);
                  }
                }

                const setsToDelete = (existingSets ?? [])
                  .filter((set) => !receivedIds.has(set.id))
                  .map((set) => set.id);

                if (setsToDelete.length > 0) {
                  await tx.strengthSet.deleteMany({
                    where: { id: { in: setsToDelete } }
                  });
                }
              }

              if (
                loggedExerciseDto.strengthSets === undefined &&
                loggedExerciseDto.id &&
                !existingLoggedMap
                  .get(loggedExerciseDto.id)
                  ?.strengthSets?.length
              ) {
                // No-op when no sets provided for update and none exist.
              }

              if (
                loggedExerciseDto.id &&
                existingLoggedMap.get(loggedExerciseDto.id)?.cardioEntry
              ) {
                await tx.cardioEntry.delete({
                  where: { loggedExerciseId }
                });
              }
            } else {
              const payload = loggedExerciseDto.cardioEntry;

              if (payload) {
                const hasDuration =
                  payload.durationSeconds !== undefined &&
                  payload.durationSeconds !== null;
                const hasDistance =
                  payload.distanceMeters !== undefined &&
                  payload.distanceMeters !== null;

                if (!hasDuration && !hasDistance) {
                  this.logger.warn('workouts.edit_session.invalid_cardio', {
                    userId,
                    workoutId,
                    loggedExerciseId
                  });
                  throw new BadRequestException('INVALID_CARDIO_ENTRY');
                }

                if (payload.id) {
                  await tx.cardioEntry.update({
                    where: { id: payload.id },
                    data: {
                      durationSeconds: payload.durationSeconds ?? null,
                      distanceMeters: payload.distanceMeters ?? null
                    }
                  });
                } else {
                  await tx.cardioEntry.create({
                    data: {
                      loggedExerciseId,
                      durationSeconds: payload.durationSeconds ?? null,
                      distanceMeters: payload.distanceMeters ?? null
                    }
                  });
                }
              } else if (
                loggedExerciseDto.id &&
                existingLoggedMap.get(loggedExerciseDto.id)?.cardioEntry
              ) {
                await tx.cardioEntry.delete({
                  where: { loggedExerciseId }
                });
              }

              if (loggedExerciseDto.strengthSets?.length) {
                this.logger.warn('workouts.edit_session.strength_for_cardio', {
                  userId,
                  workoutId,
                  loggedExerciseId
                });
                throw new BadRequestException('STRENGTH_NOT_ALLOWED_FOR_CARDIO');
              }
            }
          }

          const existingIds = new Set(existing.loggedExercises.map((le) => le.id));
          const toDelete: string[] = [];

          for (const id of existingIds) {
            if (!processedIds.has(id)) {
              toDelete.push(id);
            }
          }

          if (toDelete.length > 0) {
            await tx.loggedExercise.deleteMany({
              where: { id: { in: toDelete } }
            });
          }
        }
      });
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof ForbiddenException) {
        throw error;
      }

      this.logger.error(
        'workouts.edit_session.failed',
        (error as Error).stack,
        {
          userId,
          workoutId
        }
      );
      throw new InternalServerErrorException('WORKOUT_EDIT_FAILED');
    }

    const updated = await this.prisma.workoutSession.findUnique({
      where: { id: workoutId },
      include: {
        loggedExercises: {
          include: {
            exercise: true,
            strengthSets: true,
            cardioEntry: true
          }
        }
      }
    });

    if (!updated) {
      this.logger.error('workouts.edit_session.retrieval_failed', undefined, {
        userId,
        workoutId
      });
      throw new InternalServerErrorException('WORKOUT_EDIT_FAILED');
    }

    const payload = this.mapSession(updated);

    this.logger.info('workouts.edit_session.success', {
      userId,
      workoutId,
      loggedExerciseCount: payload.loggedExercises?.length ?? 0
    });

    return payload;
  }
}
