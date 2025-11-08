import {
  ConflictException,
  INestApplication,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import type { Exercise } from '@myfitness2/shared-types';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggerService } from '../common/logging/logger.service';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

const exercisesResponse: Exercise[] = [
  {
    id: 'exercise-1',
    name: 'Bench Press',
    type: 'STRENGTH',
    createdById: null,
    createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString()
  }
];

describe('ExercisesController', () => {
  let app: INestApplication;
  let exercisesService: { searchLibrary: jest.Mock; createCustom: jest.Mock };
  let guard: { canActivate: jest.Mock };
  let logger: LoggerService;

  beforeEach(async () => {
    exercisesService = {
      searchLibrary: jest.fn().mockResolvedValue(exercisesResponse),
      createCustom: jest
        .fn()
        .mockResolvedValue({
          id: 'exercise-2',
          name: 'Custom Exercise',
          type: 'STRENGTH',
          createdById: 'user-1',
          createdAt: new Date('2024-01-02T10:00:00.000Z').toISOString(),
          updatedAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
        } satisfies Exercise)
    };

    guard = {
      canActivate: jest.fn((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = { id: 'user-1' };
        return true;
      })
    };

    logger = {
      log: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn()
    } as unknown as LoggerService;

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ExercisesController],
      providers: [
        { provide: ExercisesService, useValue: exercisesService },
        { provide: LoggerService, useValue: logger }
      ]
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(guard)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns exercises for authenticated user', async () => {
    const response = await request(app.getHttpServer())
      .get('/exercises')
      .expect(200);

    expect(exercisesService.searchLibrary).toHaveBeenCalledWith(undefined);
    expect(response.body).toEqual(exercisesResponse);
  });

  it('passes search query to the service', async () => {
    await request(app.getHttpServer())
      .get('/exercises?search=squat')
      .expect(200);

    expect(exercisesService.searchLibrary).toHaveBeenCalledWith('squat');
  });

  it('returns 400 for invalid query shape', async () => {
    await request(app.getHttpServer())
      .get('/exercises?search=bench&search=squat')
      .expect(400);

    expect(exercisesService.searchLibrary).not.toHaveBeenCalled();
  });

  it('returns 401 when guard denies access', async () => {
    guard.canActivate.mockImplementationOnce(() => {
      throw new UnauthorizedException();
    });

    await request(app.getHttpServer()).get('/exercises').expect(401);
  });

  it('returns 401 when user context missing', async () => {
    guard.canActivate.mockImplementationOnce((context) => {
      const req = context.switchToHttp().getRequest();
      req.user = undefined;
      return true;
    });

    await request(app.getHttpServer()).get('/exercises').expect(401);
    expect(exercisesService.searchLibrary).not.toHaveBeenCalled();
  });

  it('propagates service errors as 500 responses', async () => {
    exercisesService.searchLibrary.mockRejectedValueOnce(
      new InternalServerErrorException('EXERCISE_SEARCH_FAILED')
    );

    const response = await request(app.getHttpServer())
      .get('/exercises')
      .expect(500);

    expect(response.body.message).toBe('EXERCISE_SEARCH_FAILED');
  });

  it('creates a custom exercise for authenticated users', async () => {
    const response = await request(app.getHttpServer())
      .post('/exercises')
      .send({ name: 'Custom Exercise', type: 'STRENGTH' })
      .expect(201);

    expect(exercisesService.createCustom).toHaveBeenCalledWith(
      'user-1',
      {
        name: 'Custom Exercise',
        type: 'STRENGTH'
      }
    );
    expect(response.body).toEqual({
      id: 'exercise-2',
      name: 'Custom Exercise',
      type: 'STRENGTH',
      createdById: 'user-1',
      createdAt: new Date('2024-01-02T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
    });
  });

  it('returns 400 when the payload is invalid', async () => {
    await request(app.getHttpServer())
      .post('/exercises')
      .send({ name: '', type: 'STRENGTH' })
      .expect(400);

    expect(exercisesService.createCustom).not.toHaveBeenCalled();
  });

  it('returns 401 when guard denies access for creation', async () => {
    guard.canActivate.mockImplementationOnce(() => {
      throw new UnauthorizedException();
    });

    await request(app.getHttpServer())
      .post('/exercises')
      .send({ name: 'Custom Exercise', type: 'STRENGTH' })
      .expect(401);
  });

  it('returns 401 when no user is found in request during creation', async () => {
    guard.canActivate.mockImplementationOnce((context) => {
      const req = context.switchToHttp().getRequest();
      req.user = undefined;
      return true;
    });

    await request(app.getHttpServer())
      .post('/exercises')
      .send({ name: 'Custom Exercise', type: 'STRENGTH' })
      .expect(401);

    expect(exercisesService.createCustom).not.toHaveBeenCalled();
  });

  it('returns 409 when the service reports a conflict', async () => {
    exercisesService.createCustom.mockRejectedValueOnce(
      new ConflictException('EXERCISE_NAME_CONFLICT')
    );

    const response = await request(app.getHttpServer())
      .post('/exercises')
      .send({ name: 'Custom Exercise', type: 'STRENGTH' })
      .expect(409);

    expect(response.body.message).toBe('EXERCISE_NAME_CONFLICT');
  });
});
