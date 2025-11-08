import {
  ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import type { Exercise } from '@myfitness2/shared-types';

import { LoggerService } from '../common/logging/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService
  ) {}

  async searchLibrary(search?: string): Promise<Exercise[]> {
    this.logger.info('exercises.search.attempt', {
      search: search ?? null
    });

    try {
      const exercises = await this.prisma.exercise.findMany({
        where: search
          ? {
              name: {
                contains: search,
                mode: 'insensitive'
              }
            }
          : undefined,
        orderBy: {
          name: 'asc'
        }
      });

      const normalized = exercises.map<Exercise>((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        type: exercise.type,
        createdById: exercise.createdById ?? null,
        createdAt: exercise.createdAt.toISOString(),
        updatedAt: exercise.updatedAt.toISOString()
      }));

      this.logger.info('exercises.search.success', {
        search: search ?? null,
        resultCount: normalized.length
      });

      return normalized;
    } catch (error) {
      this.logger.error('exercises.search.failure', (error as Error).stack, {
        search: search ?? null
      });
      throw new InternalServerErrorException('EXERCISE_SEARCH_FAILED');
    }
  }

  async createCustom(
    userId: string,
    createExerciseDto: CreateExerciseDto
  ): Promise<Exercise> {
    this.logger.info('exercises.create_custom.attempt', {
      userId,
      name: createExerciseDto.name,
      type: createExerciseDto.type
    });

    try {
      const created = await this.prisma.exercise.create({
        data: {
          name: createExerciseDto.name,
          type: createExerciseDto.type,
          createdBy: {
            connect: {
              id: userId
            }
          }
        }
      });

      const normalized: Exercise = {
        id: created.id,
        name: created.name,
        type: created.type,
        createdById: created.createdById ?? null,
        createdAt: created.createdAt.toISOString(),
        updatedAt: created.updatedAt.toISOString()
      };

      this.logger.info('exercises.create_custom.success', {
        userId,
        exerciseId: created.id
      });

      return normalized;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          this.logger.warn('exercises.create_custom.conflict', {
            userId,
            name: createExerciseDto.name
          });
          throw new ConflictException('EXERCISE_NAME_CONFLICT');
        }
      }

      this.logger.error(
        'exercises.create_custom.failure',
        (error as Error).stack,
        {
          userId,
          name: createExerciseDto.name
        }
      );

      throw new InternalServerErrorException('FAILED_TO_CREATE_EXERCISE');
    }
  }
}
