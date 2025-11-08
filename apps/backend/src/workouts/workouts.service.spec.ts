import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import { LoggerService } from '../common/logging/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutsService } from './workouts.service';
import { CreateStrengthSetDto } from './dto/create-strength-set.dto';
import { CreateCardioEntryDto } from './dto/create-cardio-entry.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

const frozenDate = new Date('2024-01-01T10:00:00.000Z');

describe('WorkoutsService', () => {
  let service: WorkoutsService;
  let prisma: {
    $transaction: jest.Mock;
    workoutSession: {
      create: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
    loggedExercise: {
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      deleteMany: jest.Mock;
    };
    strengthSet: {
      findFirst: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      deleteMany: jest.Mock;
    };
    cardioEntry: {
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
    exercise: {
      findUnique: jest.Mock;
    };
  };
  let logger: jest.Mocked<LoggerService>;

  beforeEach(async () => {
    prisma = {
      $transaction: jest.fn(async (handler: (tx: unknown) => unknown) => {
        return handler({
          workoutSession: prisma.workoutSession,
          loggedExercise: prisma.loggedExercise,
          strengthSet: prisma.strengthSet,
          cardioEntry: prisma.cardioEntry,
          exercise: prisma.exercise
        });
      }),
      workoutSession: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      },
      loggedExercise: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        deleteMany: jest.fn()
      },
      strengthSet: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        deleteMany: jest.fn()
      },
      cardioEntry: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      },
      exercise: {
        findUnique: jest.fn()
      }
    };

    logger = {
      log: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn()
    } as unknown as jest.Mocked<LoggerService>;

    jest.useFakeTimers().setSystemTime(frozenDate);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutsService,
        { provide: PrismaService, useValue: prisma },
        { provide: LoggerService, useValue: logger }
      ]
    }).compile();

    service = module.get<WorkoutsService>(WorkoutsService);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('creates a workout session with current time when no startTime provided', async () => {
    const created = {
      id: 'session-1',
      userId: 'user-1',
      startTime: frozenDate,
      endTime: null,
      createdAt: frozenDate,
      updatedAt: frozenDate
    };

    prisma.workoutSession.create.mockResolvedValueOnce(created);

    const result = await service.startSession('user-1', {});

    expect(prisma.workoutSession.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
        startTime: frozenDate
      }
    });
    expect(result).toEqual({
      id: 'session-1',
      userId: 'user-1',
      startTime: frozenDate.toISOString(),
      endTime: null,
      createdAt: frozenDate.toISOString(),
      updatedAt: frozenDate.toISOString(),
      loggedExercises: []
    });
    expect(logger.info).toHaveBeenCalledWith('workouts.start_session.success', {
      userId: 'user-1',
      sessionId: 'session-1'
    });
  });

  it('uses provided startTime when dto contains startTime', async () => {
    const providedStart = new Date('2024-02-01T09:30:00.000Z');
    const created = {
      id: 'session-2',
      userId: 'user-2',
      startTime: providedStart,
      endTime: null,
      createdAt: providedStart,
      updatedAt: providedStart
    };

    prisma.workoutSession.create.mockResolvedValueOnce(created);

    const result = await service.startSession('user-2', {
      startTime: providedStart.toISOString()
    });

    expect(prisma.workoutSession.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-2',
        startTime: providedStart
      }
    });
    expect(result.startTime).toBe(providedStart.toISOString());
  });

  it('throws internal error when prisma create fails', async () => {
    const error = new Error('db failure');
    prisma.workoutSession.create.mockRejectedValueOnce(error);

    await expect(service.startSession('user-3', {})).rejects.toBeInstanceOf(
      InternalServerErrorException
    );

    expect(logger.error).toHaveBeenCalledWith(
      'workouts.start_session.failed',
      error.stack,
      {
        userId: 'user-3',
        requestedStartTime: 'now'
      }
    );
  });

  describe('logStrengthSet', () => {
    const dto: CreateStrengthSetDto = { reps: 10, weight: 50 };

    beforeEach(() => {
      prisma.workoutSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1'
      });
      prisma.loggedExercise.findUnique.mockResolvedValue({
        id: 'le-1',
        sessionId: 'session-1',
        exerciseId: 'exercise-1',
        createdAt: frozenDate,
        updatedAt: frozenDate,
        notes: null,
        session: { userId: 'user-1' }
      });
      prisma.strengthSet.findFirst.mockResolvedValue(null);
      prisma.strengthSet.create.mockResolvedValue({
        id: 'set-1',
        loggedExerciseId: 'le-1',
        setNumber: 1,
        reps: 10,
        weight: 50,
        createdAt: frozenDate
      });
    });

    it('creates a strength set and logs success', async () => {
      const result = await service.logStrengthSet(
        'user-1',
        'session-1',
        'le-1',
        dto
      );

      expect(prisma.workoutSession.findUnique).toHaveBeenCalledWith({
        where: { id: 'session-1' }
      });
      expect(prisma.loggedExercise.findUnique).toHaveBeenCalled();
      expect(prisma.strengthSet.create).toHaveBeenCalledWith({
        data: {
          loggedExerciseId: 'le-1',
          setNumber: 1,
          reps: 10,
          weight: 50
        }
      });
      expect(result).toEqual({
        id: 'set-1',
        loggedExerciseId: 'le-1',
        setNumber: 1,
        reps: 10,
        weight: 50,
        createdAt: frozenDate.toISOString()
      });
      expect(logger.info).toHaveBeenCalledWith(
        'workouts.log_strength_set.success',
        expect.objectContaining({
          userId: 'user-1',
          workoutId: 'session-1',
          setId: 'set-1'
        })
      );
    });

    it('increments set number based on last set', async () => {
      prisma.strengthSet.findFirst.mockResolvedValueOnce({ setNumber: 2 });
      prisma.strengthSet.create.mockResolvedValueOnce({
        id: 'set-3',
        loggedExerciseId: 'le-1',
        setNumber: 3,
        reps: 8,
        weight: 55,
        createdAt: frozenDate
      });

      const result = await service.logStrengthSet(
        'user-1',
        'session-1',
        'le-1',
        { reps: 8, weight: 55 }
      );

      expect(prisma.strengthSet.create).toHaveBeenCalledWith({
        data: {
          loggedExerciseId: 'le-1',
          setNumber: 3,
          reps: 8,
          weight: 55
        }
      });
      expect(result.setNumber).toBe(3);
    });

    it('throws when reps or weight invalid', async () => {
      await expect(
        service.logStrengthSet('user-1', 'session-1', 'le-1', {
          reps: -1,
          weight: 50
        })
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.log_strength_set.invalid_payload',
        expect.objectContaining({ workoutId: 'session-1' })
      );
      expect(prisma.loggedExercise.findUnique).not.toHaveBeenCalled();
    });

    it('throws when session not found', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.logStrengthSet('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.session_not_found',
        expect.objectContaining({ workoutId: 'session-1' })
      );
    });

    it('throws when session belongs to another user', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce({
        id: 'session-1',
        userId: 'other-user'
      });

      await expect(
        service.logStrengthSet('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.session_forbidden',
        expect.objectContaining({ workoutId: 'session-1' })
      );
    });

    it('throws when logged exercise not found', async () => {
      prisma.loggedExercise.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.logStrengthSet('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.log_strength_set.logged_exercise_missing',
        expect.objectContaining({ loggedExerciseId: 'le-1' })
      );
    });

    it('throws when logged exercise belongs to different session', async () => {
      prisma.loggedExercise.findUnique.mockResolvedValueOnce({
        id: 'le-1',
        sessionId: 'session-2',
        exerciseId: 'exercise-1',
        createdAt: frozenDate,
        updatedAt: frozenDate,
        notes: null,
        session: { userId: 'user-1' }
      });

      await expect(
        service.logStrengthSet('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.log_strength_set.session_mismatch',
        expect.objectContaining({ workoutId: 'session-1' })
      );
    });

    it('throws when logged exercise owned by another user', async () => {
      prisma.loggedExercise.findUnique.mockResolvedValueOnce({
        id: 'le-1',
        sessionId: 'session-1',
        exerciseId: 'exercise-1',
        createdAt: frozenDate,
        updatedAt: frozenDate,
        notes: null,
        session: { userId: 'other-user' }
      });

      await expect(
        service.logStrengthSet('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.log_strength_set.forbidden',
        expect.objectContaining({ userId: 'user-1' })
      );
    });
  });

  describe('logCardioEntry', () => {
    const dto: CreateCardioEntryDto = { durationSeconds: 600 };

    beforeEach(() => {
      prisma.workoutSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1'
      });
      prisma.loggedExercise.findUnique.mockResolvedValue({
        id: 'le-1',
        sessionId: 'session-1',
        exerciseId: 'exercise-1',
        createdAt: frozenDate,
        updatedAt: frozenDate,
        notes: null,
        session: { userId: 'user-1' }
      });
      prisma.cardioEntry.findUnique.mockResolvedValue(null);
      prisma.cardioEntry.create.mockResolvedValue({
        id: 'cardio-1',
        loggedExerciseId: 'le-1',
        durationSeconds: 600,
        distanceMeters: null,
        createdAt: frozenDate
      });
    });

    it('creates a cardio entry and logs success', async () => {
      const result = await service.logCardioEntry(
        'user-1',
        'session-1',
        'le-1',
        dto
      );

      expect(prisma.workoutSession.findUnique).toHaveBeenCalledWith({
        where: { id: 'session-1' }
      });
      expect(prisma.loggedExercise.findUnique).toHaveBeenCalledWith({
        where: { id: 'le-1' },
        include: { session: true }
      });
      expect(prisma.cardioEntry.create).toHaveBeenCalledWith({
        data: {
          loggedExerciseId: 'le-1',
          durationSeconds: 600,
          distanceMeters: null
        }
      });
      expect(result).toEqual({
        id: 'cardio-1',
        loggedExerciseId: 'le-1',
        durationSeconds: 600,
        distanceMeters: null,
        createdAt: frozenDate.toISOString()
      });
      expect(logger.info).toHaveBeenCalledWith(
        'workouts.log_cardio_entry.success',
        expect.objectContaining({
          userId: 'user-1',
          workoutId: 'session-1',
          cardioEntryId: 'cardio-1'
        })
      );
    });

    it('throws when both metrics missing', async () => {
      await expect(
        service.logCardioEntry('user-1', 'session-1', 'le-1', {})
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.log_cardio_entry.invalid_payload',
        expect.objectContaining({ workoutId: 'session-1' })
      );
      expect(prisma.loggedExercise.findUnique).not.toHaveBeenCalled();
    });

    it('throws when session not found', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.logCardioEntry('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.session_not_found',
        expect.objectContaining({ workoutId: 'session-1' })
      );
    });

    it('throws when session belongs to another user', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce({
        id: 'session-1',
        userId: 'other-user'
      });

      await expect(
        service.logCardioEntry('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.session_forbidden',
        expect.objectContaining({ workoutId: 'session-1' })
      );
    });

    it('throws when logged exercise not found', async () => {
      prisma.loggedExercise.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.logCardioEntry('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.log_cardio_entry.logged_exercise_missing',
        expect.objectContaining({ loggedExerciseId: 'le-1' })
      );
    });

    it('throws when logged exercise belongs to different session', async () => {
      prisma.loggedExercise.findUnique.mockResolvedValueOnce({
        id: 'le-1',
        sessionId: 'session-2',
        exerciseId: 'exercise-1',
        createdAt: frozenDate,
        updatedAt: frozenDate,
        notes: null,
        session: { userId: 'user-1' }
      });

      await expect(
        service.logCardioEntry('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.log_cardio_entry.session_mismatch',
        expect.objectContaining({ workoutId: 'session-1' })
      );
    });

    it('throws when logged exercise owned by another user', async () => {
      prisma.loggedExercise.findUnique.mockResolvedValueOnce({
        id: 'le-1',
        sessionId: 'session-1',
        exerciseId: 'exercise-1',
        createdAt: frozenDate,
        updatedAt: frozenDate,
        notes: null,
        session: { userId: 'other-user' }
      });

      await expect(
        service.logCardioEntry('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.log_cardio_entry.forbidden',
        expect.objectContaining({ userId: 'user-1' })
      );
    });

    it('throws when cardio entry already exists', async () => {
      prisma.cardioEntry.findUnique.mockResolvedValueOnce({
        id: 'cardio-existing',
        loggedExerciseId: 'le-1',
        durationSeconds: 600,
        distanceMeters: null,
        createdAt: frozenDate
      });

      await expect(
        service.logCardioEntry('user-1', 'session-1', 'le-1', dto)
      ).rejects.toBeInstanceOf(ConflictException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.log_cardio_entry.conflict',
        expect.objectContaining({ cardioEntryId: 'cardio-existing' })
      );
    });
  });

  describe('editSession', () => {
    const baseDate = new Date('2024-04-01T10:00:00.000Z');
    const workoutRecord = {
      id: 'session-1',
      userId: 'user-1',
      startTime: baseDate,
      endTime: null as Date | null,
      createdAt: baseDate,
      updatedAt: baseDate,
      loggedExercises: [
        {
          id: 'logged-1',
          sessionId: 'session-1',
          exerciseId: 'exercise-1',
          notes: 'Initial notes',
          createdAt: baseDate,
          updatedAt: baseDate,
          exercise: {
            id: 'exercise-1',
            name: 'Bench Press',
            type: 'STRENGTH',
            createdById: null,
            createdAt: baseDate,
            updatedAt: baseDate
          },
          strengthSets: [
            {
              id: 'set-1',
              loggedExerciseId: 'logged-1',
              setNumber: 1,
              reps: 8,
              weight: 60,
              createdAt: baseDate
            }
          ],
          cardioEntry: null
        }
      ]
    };

    it('updates session and nested structures successfully', async () => {
      const updatedDate = new Date('2024-04-01T11:00:00.000Z');
      const newSetCreatedAt = new Date('2024-04-01T11:05:00.000Z');

      prisma.workoutSession.findUnique
        .mockResolvedValueOnce(workoutRecord)
        .mockResolvedValueOnce({
          ...workoutRecord,
          startTime: updatedDate,
          updatedAt: updatedDate,
          loggedExercises: [
            {
              ...workoutRecord.loggedExercises[0],
              updatedAt: updatedDate,
              notes: 'Updated notes',
              strengthSets: [
                {
                  ...workoutRecord.loggedExercises[0].strengthSets[0],
                  reps: 10,
                  weight: 65,
                  setNumber: 1
                },
                {
                  id: 'set-2',
                  loggedExerciseId: 'logged-1',
                  setNumber: 2,
                  reps: 12,
                  weight: 70,
                  createdAt: newSetCreatedAt
                }
              ]
            }
          ]
        });
      prisma.workoutSession.update.mockResolvedValueOnce({});
      prisma.exercise.findUnique.mockResolvedValue({
        id: 'exercise-1',
        name: 'Bench Press',
        type: 'STRENGTH',
        createdById: null,
        createdAt: baseDate,
        updatedAt: baseDate
      });
      prisma.loggedExercise.update.mockResolvedValueOnce({});
      prisma.strengthSet.update.mockResolvedValueOnce({});
      prisma.strengthSet.create.mockResolvedValueOnce({
        id: 'set-2',
        loggedExerciseId: 'logged-1',
        setNumber: 2,
        reps: 12,
        weight: 70,
        createdAt: newSetCreatedAt
      });
      prisma.strengthSet.deleteMany.mockResolvedValueOnce({ count: 0 });
      prisma.loggedExercise.deleteMany.mockResolvedValueOnce({ count: 0 });

      const payload: UpdateWorkoutDto = {
        startTime: updatedDate.toISOString(),
        loggedExercises: [
          {
            id: 'logged-1',
            exerciseId: 'exercise-1',
            notes: 'Updated notes',
            type: 'STRENGTH',
            strengthSets: [
              { id: 'set-1', setNumber: 1, reps: 10, weight: 65 },
              { setNumber: 2, reps: 12, weight: 70 }
            ]
          }
        ]
      };

      const result = await service.editSession('user-1', 'session-1', payload);

      expect(prisma.workoutSession.update).toHaveBeenCalledWith({
        where: { id: 'session-1' },
        data: { startTime: updatedDate }
      });
      expect(prisma.loggedExercise.update).toHaveBeenCalledWith({
        where: { id: 'logged-1' },
        data: {
          exerciseId: 'exercise-1',
          notes: 'Updated notes'
        }
      });
      expect(prisma.strengthSet.update).toHaveBeenCalledWith({
        where: { id: 'set-1' },
        data: { reps: 10, weight: 65, setNumber: 1 }
      });
      expect(prisma.strengthSet.create).toHaveBeenCalledWith({
        data: {
          loggedExerciseId: 'logged-1',
          reps: 12,
          weight: 70,
          setNumber: 2
        }
      });
      expect(result).toEqual({
        id: 'session-1',
        userId: 'user-1',
        startTime: updatedDate.toISOString(),
        endTime: null,
        createdAt: baseDate.toISOString(),
        updatedAt: updatedDate.toISOString(),
        loggedExercises: [
          {
            id: 'logged-1',
            sessionId: 'session-1',
            exerciseId: 'exercise-1',
            notes: 'Updated notes',
            createdAt: baseDate.toISOString(),
            updatedAt: updatedDate.toISOString(),
            exercise: {
              id: 'exercise-1',
              name: 'Bench Press',
              type: 'STRENGTH',
              createdById: null,
              createdAt: baseDate.toISOString(),
              updatedAt: baseDate.toISOString()
            },
            strengthSets: [
              {
                id: 'set-1',
                loggedExerciseId: 'logged-1',
                setNumber: 1,
                reps: 10,
                weight: 65,
                createdAt: baseDate.toISOString()
              },
              {
                id: 'set-2',
                loggedExerciseId: 'logged-1',
                setNumber: 2,
                reps: 12,
                weight: 70,
                createdAt: newSetCreatedAt.toISOString()
              }
            ],
            cardioEntry: null
          }
        ]
      });
    });

    it('throws when workout is not found', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.editSession('user-1', 'missing-session', {})
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws when user does not own workout', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce({
        ...workoutRecord,
        userId: 'other-user'
      });

      await expect(
        service.editSession('user-1', 'session-1', {})
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('throws when end time precedes start time', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(workoutRecord);

      await expect(
        service.editSession('user-1', 'session-1', {
          endTime: '2024-04-01T09:00:00.000Z'
        })
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws when exercise type mismatches payload', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(workoutRecord);
      prisma.exercise.findUnique.mockResolvedValueOnce({
        id: 'exercise-1',
        name: 'Rowing',
        type: 'CARDIO',
        createdById: null,
        createdAt: baseDate,
        updatedAt: baseDate
      });

      await expect(
        service.editSession('user-1', 'session-1', {
          loggedExercises: [
            {
              id: 'logged-1',
              exerciseId: 'exercise-1',
              type: 'STRENGTH',
              strengthSets: []
            }
          ]
        } as UpdateWorkoutDto)
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws when logged exercise id is not part of session', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(workoutRecord);
      prisma.exercise.findUnique.mockResolvedValueOnce({
        id: 'exercise-2',
        name: 'Deadlift',
        type: 'STRENGTH',
        createdById: null,
        createdAt: baseDate,
        updatedAt: baseDate
      });

      await expect(
        service.editSession('user-1', 'session-1', {
          loggedExercises: [
            {
              id: 'unknown-logged',
              exerciseId: 'exercise-2',
              type: 'STRENGTH',
              strengthSets: []
            }
          ]
        } as UpdateWorkoutDto)
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('getSessionById', () => {
    const prismaSession = {
      id: 'session-1',
      userId: 'user-1',
      startTime: frozenDate,
      endTime: null as Date | null,
      createdAt: frozenDate,
      updatedAt: frozenDate,
      loggedExercises: [
        {
          id: 'logged-1',
          sessionId: 'session-1',
          exerciseId: 'exercise-1',
          notes: 'Focus on form',
          createdAt: frozenDate,
          updatedAt: frozenDate,
          exercise: {
            id: 'exercise-1',
            name: 'Bench Press',
            type: 'STRENGTH',
            createdById: null,
            createdAt: frozenDate,
            updatedAt: frozenDate
          },
          strengthSets: [
            {
              id: 'set-1',
              loggedExerciseId: 'logged-1',
              setNumber: 1,
              reps: 8,
              weight: 80,
              createdAt: frozenDate
            }
          ],
          cardioEntry: null
        }
      ]
    };

    it('returns the workout session when owned by the user', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(prismaSession);

      const result = await service.getSessionById('user-1', 'session-1');

      expect(prisma.workoutSession.findUnique).toHaveBeenCalledWith({
        where: { id: 'session-1' },
        include: {
          loggedExercises: {
            include: { exercise: true, strengthSets: true, cardioEntry: true }
          }
        }
      });
      expect(result).toEqual({
        id: 'session-1',
        userId: 'user-1',
        startTime: frozenDate.toISOString(),
        endTime: null,
        createdAt: frozenDate.toISOString(),
        updatedAt: frozenDate.toISOString(),
        loggedExercises: [
          {
            id: 'logged-1',
            sessionId: 'session-1',
            exerciseId: 'exercise-1',
            notes: 'Focus on form',
            createdAt: frozenDate.toISOString(),
            updatedAt: frozenDate.toISOString(),
            exercise: {
              id: 'exercise-1',
              name: 'Bench Press',
              type: 'STRENGTH',
              createdById: null,
              createdAt: frozenDate.toISOString(),
              updatedAt: frozenDate.toISOString()
            },
            strengthSets: [
              {
                id: 'set-1',
                loggedExerciseId: 'logged-1',
                setNumber: 1,
                reps: 8,
                weight: 80,
                createdAt: frozenDate.toISOString()
              }
            ],
            cardioEntry: null
          }
        ]
      });
      expect(logger.info).toHaveBeenCalledWith('workouts.get_session.success', {
        userId: 'user-1',
        workoutId: 'session-1',
        loggedExerciseCount: 1
      });
    });

    it('throws when session is not found', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.getSessionById('user-2', 'missing-session')
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.get_session.not_found',
        expect.objectContaining({ userId: 'user-2', workoutId: 'missing-session' })
      );
    });

    it('throws when session belongs to another user', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce({
        ...prismaSession,
        userId: 'other-user'
      });

      await expect(
        service.getSessionById('user-1', 'session-1')
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(logger.warn).toHaveBeenCalledWith(
        'workouts.get_session.forbidden',
        expect.objectContaining({ userId: 'user-1', workoutId: 'session-1' })
      );
    });
  });

  describe('completeSession', () => {
    beforeEach(() => {
      prisma.workoutSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        startTime: frozenDate,
        endTime: null,
        createdAt: frozenDate,
        updatedAt: frozenDate
      });
      prisma.workoutSession.update.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        startTime: frozenDate,
        endTime: frozenDate,
        createdAt: frozenDate,
        updatedAt: frozenDate
      });
    });

    it('completes the session and returns updated payload', async () => {
      const result = await service.completeSession('session-1', 'user-1');

      expect(prisma.workoutSession.findUnique).toHaveBeenCalledWith({
        where: { id: 'session-1' }
      });
      expect(prisma.workoutSession.update).toHaveBeenCalledWith({
        where: { id: 'session-1' },
        data: { endTime: frozenDate }
      });
      expect(result).toEqual({
        id: 'session-1',
        userId: 'user-1',
        startTime: frozenDate.toISOString(),
        endTime: frozenDate.toISOString(),
        createdAt: frozenDate.toISOString(),
        updatedAt: frozenDate.toISOString(),
        loggedExercises: []
      });
      expect(logger.info).toHaveBeenCalledWith(
        'workouts.complete_session.completed',
        expect.objectContaining({ sessionId: 'session-1', userId: 'user-1' })
      );
    });

    it('throws when session cannot be found', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.completeSession('missing-session', 'user-1')
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(prisma.workoutSession.update).not.toHaveBeenCalled();
    });

    it('throws when user does not own the session', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce({
        id: 'session-1',
        userId: 'other-user',
        startTime: frozenDate,
        endTime: null,
        createdAt: frozenDate,
        updatedAt: frozenDate
      });

      await expect(
        service.completeSession('session-1', 'user-1')
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(prisma.workoutSession.update).not.toHaveBeenCalled();
    });

    it('throws when session already completed', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce({
        id: 'session-1',
        userId: 'user-1',
        startTime: frozenDate,
        endTime: new Date('2024-01-01T09:00:00.000Z'),
        createdAt: frozenDate,
        updatedAt: frozenDate
      });

      await expect(
        service.completeSession('session-1', 'user-1')
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.workoutSession.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteSession', () => {
    beforeEach(() => {
      prisma.workoutSession.findUnique.mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        startTime: frozenDate,
        endTime: null,
        createdAt: frozenDate,
        updatedAt: frozenDate
      });
      prisma.workoutSession.delete.mockResolvedValue(undefined);
    });

    it('removes the session when user owns it', async () => {
      await service.deleteSession('user-1', 'session-1');

      expect(prisma.workoutSession.findUnique).toHaveBeenCalledWith({
        where: { id: 'session-1' }
      });
      expect(prisma.workoutSession.delete).toHaveBeenCalledWith({
        where: { id: 'session-1' }
      });
      expect(logger.info).toHaveBeenCalledWith(
        'workouts.delete_session.success',
        expect.objectContaining({ sessionId: 'session-1', userId: 'user-1' })
      );
    });

    it('throws NotFoundException when session does not exist', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.deleteSession('user-1', 'missing-session')
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(prisma.workoutSession.delete).not.toHaveBeenCalled();
    });

    it('throws ForbiddenException when session is not owned', async () => {
      prisma.workoutSession.findUnique.mockResolvedValueOnce({
        id: 'session-1',
        userId: 'other-user',
        startTime: frozenDate,
        endTime: null,
        createdAt: frozenDate,
        updatedAt: frozenDate
      });

      await expect(
        service.deleteSession('user-1', 'session-1')
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(prisma.workoutSession.delete).not.toHaveBeenCalled();
    });

    it('translates prisma missing record error into NotFoundException', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'record not found',
        'P2025',
        '5.10.2'
      );
      prisma.workoutSession.delete.mockRejectedValueOnce(prismaError);

      await expect(service.deleteSession('user-1', 'session-1')).rejects.toBeInstanceOf(
        NotFoundException
      );
    });

    it('throws InternalServerErrorException for unexpected errors', async () => {
      const unexpected = new Error('unexpected failure');
      prisma.workoutSession.delete.mockRejectedValueOnce(unexpected);

      await expect(
        service.deleteSession('user-1', 'session-1')
      ).rejects.toBeInstanceOf(InternalServerErrorException);
      expect(logger.error).toHaveBeenCalledWith(
        'workouts.delete_session.failure',
        unexpected.stack,
        expect.objectContaining({ sessionId: 'session-1', userId: 'user-1' })
      );
    });
  });
});
