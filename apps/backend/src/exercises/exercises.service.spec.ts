import {
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import type { Exercise } from '@myfitness2/shared-types';

import { LoggerService } from '../common/logging/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { ExercisesService } from './exercises.service';

const buildExercise = (overrides: Partial<Exercise> = {}): Exercise => ({
  id: overrides.id ?? 'exercise-1',
  name: overrides.name ?? 'Bench Press',
  type: overrides.type ?? 'STRENGTH',
  createdById: overrides.createdById ?? null,
  createdAt: overrides.createdAt ?? new Date('2024-01-01T10:00:00.000Z').toISOString(),
  updatedAt: overrides.updatedAt ?? new Date('2024-01-01T10:00:00.000Z').toISOString()
});

describe('ExercisesService', () => {
  let service: ExercisesService;
  let prisma: { exercise: { findMany: jest.Mock; create: jest.Mock } };
  let logger: jest.Mocked<LoggerService>;

  const prismaResult = [
    {
      id: 'exercise-1',
      name: 'Bench Press',
      type: 'STRENGTH',
      createdById: null,
      createdAt: new Date('2024-01-01T10:00:00.000Z'),
      updatedAt: new Date('2024-01-01T10:00:00.000Z')
    },
    {
      id: 'exercise-2',
      name: 'Squat',
      type: 'STRENGTH',
      createdById: null,
      createdAt: new Date('2024-01-02T10:00:00.000Z'),
      updatedAt: new Date('2024-01-02T10:00:00.000Z')
    }
  ];

  beforeEach(async () => {
    prisma = {
      exercise: {
        findMany: jest.fn().mockResolvedValue(prismaResult),
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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        { provide: PrismaService, useValue: prisma },
        { provide: LoggerService, useValue: logger }
      ]
    }).compile();

    service = module.get(ExercisesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns all exercises when search is not provided', async () => {
    const result = await service.searchLibrary();

    expect(prisma.exercise.findMany).toHaveBeenCalledWith({
      where: undefined,
      orderBy: { name: 'asc' }
    });
    expect(result).toEqual(prismaResult.map((exercise) => buildExercise({
      id: exercise.id,
      name: exercise.name,
      type: exercise.type,
      createdById: exercise.createdById,
      createdAt: exercise.createdAt.toISOString(),
      updatedAt: exercise.updatedAt.toISOString()
    })));
    expect(logger.info).toHaveBeenCalledWith('exercises.search.success', {
      search: null,
      resultCount: 2
    });
  });

  it('applies case-insensitive search when query provided', async () => {
    await service.searchLibrary('press');

    expect(prisma.exercise.findMany).toHaveBeenCalledWith({
      where: {
        name: {
          contains: 'press',
          mode: 'insensitive'
        }
      },
      orderBy: { name: 'asc' }
    });
  });

  it('throws internal server error when prisma throws', async () => {
    const error = new Error('database failed');
    prisma.exercise.findMany.mockRejectedValueOnce(error);

    await expect(service.searchLibrary('bench')).rejects.toBeInstanceOf(
      InternalServerErrorException
    );

    expect(logger.error).toHaveBeenCalledWith(
      'exercises.search.failure',
      error.stack,
      { search: 'bench' }
    );
  });

  describe('createCustom', () => {
    const creationResult = {
      id: 'exercise-3',
      name: 'Custom Movement',
      type: 'STRENGTH' as const,
      createdById: 'user-1',
      createdAt: new Date('2024-01-03T10:00:00.000Z'),
      updatedAt: new Date('2024-01-03T10:00:00.000Z')
    };

    beforeEach(() => {
      prisma.exercise.create.mockResolvedValue(creationResult);
    });

    it('creates a custom exercise linked to the user', async () => {
      const result = await service.createCustom('user-1', {
        name: 'Custom Movement',
        type: 'STRENGTH'
      });

      expect(prisma.exercise.create).toHaveBeenCalledWith({
        data: {
          name: 'Custom Movement',
          type: 'STRENGTH',
          createdBy: {
            connect: {
              id: 'user-1'
            }
          }
        }
      });
      expect(logger.info).toHaveBeenCalledWith(
        'exercises.create_custom.success',
        {
          userId: 'user-1',
          exerciseId: 'exercise-3'
        }
      );
      expect(result).toEqual({
        id: 'exercise-3',
        name: 'Custom Movement',
        type: 'STRENGTH',
        createdById: 'user-1',
        createdAt: creationResult.createdAt.toISOString(),
        updatedAt: creationResult.updatedAt.toISOString()
      });
    });

    it('throws conflict when prisma reports duplicate name', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'unique constraint',
        'P2002',
        '5.10.2'
      );
      prisma.exercise.create.mockRejectedValueOnce(prismaError);

      await expect(
        service.createCustom('user-1', {
          name: 'Custom Movement',
          type: 'STRENGTH'
        })
      ).rejects.toBeInstanceOf(ConflictException);

      expect(logger.warn).toHaveBeenCalledWith(
        'exercises.create_custom.conflict',
        {
          userId: 'user-1',
          name: 'Custom Movement'
        }
      );
    });

    it('throws internal server error for unexpected prisma failures', async () => {
      const error = new Error('unexpected failure');
      prisma.exercise.create.mockRejectedValueOnce(error);

      await expect(
        service.createCustom('user-1', {
          name: 'Custom Movement',
          type: 'STRENGTH'
        })
      ).rejects.toBeInstanceOf(InternalServerErrorException);

      expect(logger.error).toHaveBeenCalledWith(
        'exercises.create_custom.failure',
        error.stack,
        {
          userId: 'user-1',
          name: 'Custom Movement'
        }
      );
    });
  });
});
