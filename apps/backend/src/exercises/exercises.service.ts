import { Injectable, InternalServerErrorException } from '@nestjs/common';

import type { Exercise } from '@myfitness2/shared-types';

import { LoggerService } from '../common/logging/logger.service';
import { PrismaService } from '../prisma/prisma.service';

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
}
