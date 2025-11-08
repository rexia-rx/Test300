import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { LoggerService } from '../common/logging/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutsService } from './workouts.service';
import { CreateStrengthSetDto } from './dto/create-strength-set.dto';
import { CreateCardioEntryDto } from './dto/create-cardio-entry.dto';

const frozenDate = new Date('2024-01-01T10:00:00.000Z');

describe('WorkoutsService', () => {
  let service: WorkoutsService;
  let prisma: {
    workoutSession: { create: jest.Mock; findUnique: jest.Mock };
    loggedExercise: { findUnique: jest.Mock };
    strengthSet: { findFirst: jest.Mock; create: jest.Mock };
    cardioEntry: { findUnique: jest.Mock; create: jest.Mock };
  };
  let logger: jest.Mocked<LoggerService>;

  beforeEach(async () => {
    prisma = {
      workoutSession: {
        create: jest.fn(),
        findUnique: jest.fn()
      },
      loggedExercise: {
        findUnique: jest.fn()
      },
      strengthSet: {
        findFirst: jest.fn(),
        create: jest.fn()
      },
      cardioEntry: {
        findUnique: jest.fn(),
        create: jest.fn()
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
});
