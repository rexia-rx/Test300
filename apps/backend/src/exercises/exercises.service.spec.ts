import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

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
  let prisma: { exercise: { findMany: jest.Mock } };
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
        findMany: jest.fn().mockResolvedValue(prismaResult)
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
});
