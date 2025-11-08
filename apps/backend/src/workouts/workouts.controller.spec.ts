import {
  ForbiddenException,
  INestApplication,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggerService } from '../common/logging/logger.service';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { CreateStrengthSetDto } from './dto/create-strength-set.dto';
import { WorkoutOwnerGuard } from './guards/workout-owner.guard';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

describe('WorkoutsController', () => {
  let app: INestApplication;
  let workoutsService: {
    startSession: jest.Mock;
    getSessionById: jest.Mock;
    editSession: jest.Mock;
    logStrengthSet: jest.Mock;
    logCardioEntry: jest.Mock;
    completeSession: jest.Mock;
    deleteSession: jest.Mock;
  };
  let logger: LoggerService;
  let jwtGuard: { canActivate: jest.Mock };
  let ownerGuard: { canActivate: jest.Mock };

  beforeEach(async () => {
    workoutsService = {
      startSession: jest.fn(),
      getSessionById: jest.fn(),
      editSession: jest.fn(),
      logStrengthSet: jest.fn(),
      logCardioEntry: jest.fn(),
      completeSession: jest.fn(),
      deleteSession: jest.fn()
    };

    logger = {
      log: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn()
    } as unknown as LoggerService;

    jwtGuard = {
      canActivate: jest.fn((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = { id: 'user-123' };
        return true;
      })
    };

    ownerGuard = {
      canActivate: jest.fn((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = { id: 'user-123' };
        return true;
      })
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsController],
      providers: [
        { provide: WorkoutsService, useValue: workoutsService },
        { provide: LoggerService, useValue: logger }
      ]
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(jwtGuard)
      .overrideGuard(WorkoutOwnerGuard)
      .useValue(ownerGuard)
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

  const sessionResponse = {
    id: 'session-id',
    userId: 'user-123',
    startTime: new Date('2024-03-01T10:00:00.000Z').toISOString(),
    endTime: null,
    createdAt: new Date('2024-03-01T10:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-03-01T10:00:00.000Z').toISOString(),
    loggedExercises: []
  };

  it('creates a workout session when authorized', async () => {
    workoutsService.startSession.mockResolvedValueOnce(sessionResponse);

    const payload: CreateWorkoutSessionDto = {
      startTime: sessionResponse.startTime
    };

    const response = await request(app.getHttpServer())
      .post('/workouts')
      .send(payload)
      .expect(201);

    expect(workoutsService.startSession).toHaveBeenCalledWith(
      'user-123',
      payload
    );
    expect(response.body).toEqual(sessionResponse);
  });

  it('retrieves a workout session when authorized', async () => {
    workoutsService.getSessionById.mockResolvedValueOnce(sessionResponse);

    const response = await request(app.getHttpServer())
      .get('/workouts/session-id')
      .expect(200);

    expect(workoutsService.getSessionById).toHaveBeenCalledWith(
      'user-123',
      'session-id'
    );
    expect(response.body).toEqual(sessionResponse);
  });

  it('returns 400 when retrieving session with invalid id', async () => {
    await request(app.getHttpServer())
      .get('/workouts/not-a-cuid')
      .expect(400);

    expect(workoutsService.getSessionById).not.toHaveBeenCalled();
  });

  it('returns 401 when retrieving session without user', async () => {
    jwtGuard.canActivate.mockImplementationOnce((context) => {
      const req = context.switchToHttp().getRequest();
      req.user = undefined;
      return true;
    });
    ownerGuard.canActivate.mockImplementationOnce((context) => {
      const req = context.switchToHttp().getRequest();
      req.user = undefined;
      return true;
    });

    await request(app.getHttpServer())
      .get('/workouts/c123456789012345678901234')
      .expect(401);

    expect(workoutsService.getSessionById).not.toHaveBeenCalled();
  });

  it('propagates service errors when retrieving session fails', async () => {
    workoutsService.getSessionById.mockRejectedValueOnce(
      new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN')
    );

    await request(app.getHttpServer())
      .get('/workouts/session-id')
      .expect(403);

    expect(workoutsService.getSessionById).toHaveBeenCalledWith(
      'user-123',
      'session-id'
    );
  });

  it('returns 400 when payload is invalid', async () => {
    await request(app.getHttpServer())
      .post('/workouts')
      .send({ startTime: 'not-a-date' })
      .expect(400);

    expect(workoutsService.startSession).not.toHaveBeenCalled();
  });

  it('returns 401 when guard denies access', async () => {
    jwtGuard.canActivate.mockImplementationOnce(() => {
      throw new UnauthorizedException();
    });

    await request(app.getHttpServer())
      .post('/workouts')
      .send({})
      .expect(401);
  });

  it('returns 500 when service throws an error', async () => {
    workoutsService.startSession.mockRejectedValueOnce(
      new InternalServerErrorException('WORKOUT_START_FAILED')
    );

    const response = await request(app.getHttpServer())
      .post('/workouts')
      .send({})
      .expect(500);

    expect(response.body.message).toBe('WORKOUT_START_FAILED');
  });

  it('returns 401 when request does not include user in context', async () => {
    jwtGuard.canActivate.mockImplementationOnce((context) => {
      const req = context.switchToHttp().getRequest();
      req.user = undefined;
      return true;
    });

    await request(app.getHttpServer())
      .post('/workouts')
      .send({})
      .expect(401);

    expect(workoutsService.startSession).not.toHaveBeenCalled();
  });
  });

  describe('editSession', () => {
    const sessionResponse = {
      id: 'session-1',
      userId: 'user-123',
      startTime: new Date('2024-04-01T11:00:00.000Z').toISOString(),
      endTime: null,
      createdAt: new Date('2024-04-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-04-01T11:00:00.000Z').toISOString(),
      loggedExercises: []
    };

    it('updates a workout session when payload is valid', async () => {
      workoutsService.editSession.mockResolvedValueOnce(sessionResponse);

      const payload: UpdateWorkoutDto = {
        startTime: sessionResponse.startTime
      };

      const response = await request(app.getHttpServer())
        .put('/workouts/session-1')
        .send(payload)
        .expect(200);

      expect(workoutsService.editSession).toHaveBeenCalledWith(
        'user-123',
        'session-1',
        payload
      );
      expect(response.body).toEqual(sessionResponse);
    });

    it('returns 400 when workout id is invalid', async () => {
      await request(app.getHttpServer())
        .put('/workouts/not-a-cuid')
        .send({})
        .expect(400);

      expect(workoutsService.editSession).not.toHaveBeenCalled();
    });

    it('returns 401 when no user is attached to request', async () => {
      ownerGuard.canActivate.mockImplementationOnce((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = undefined;
        return true;
      });

      await request(app.getHttpServer())
        .put('/workouts/session-1')
        .send({})
        .expect(401);

      expect(workoutsService.editSession).not.toHaveBeenCalled();
    });
  });

  describe('logStrengthSet', () => {
    const payload: CreateStrengthSetDto = {
      reps: 8,
      weight: 60,
      setNumber: undefined
    };

    const responseBody = {
      id: 'set-1',
      loggedExerciseId: 'le-1',
      setNumber: 1,
      reps: 8,
      weight: 60,
      createdAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
    };

    it('creates a strength set when authorized and valid', async () => {
      workoutsService.logStrengthSet.mockResolvedValueOnce(responseBody);

      const response = await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/sets')
        .send(payload)
        .expect(201);

      expect(workoutsService.logStrengthSet).toHaveBeenCalledWith(
        'user-123',
        'session-1',
        'le-1',
        payload
      );
      expect(response.body).toEqual(responseBody);
    });

    it('returns 400 when payload fails validation', async () => {
      await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/sets')
        .send({ reps: -1, weight: 50 })
        .expect(400);

      expect(workoutsService.logStrengthSet).not.toHaveBeenCalled();
    });

    it('propagates forbidden error from owner guard', async () => {
      ownerGuard.canActivate.mockImplementationOnce(() => {
        throw new ForbiddenException();
      });

      await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/sets')
        .send(payload)
        .expect(403);
    });

    it('returns 401 when request user is missing', async () => {
      ownerGuard.canActivate.mockImplementationOnce((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = undefined;
        return true;
      });

      await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/sets')
        .send(payload)
        .expect(401);

      expect(workoutsService.logStrengthSet).not.toHaveBeenCalled();
    });

    it('returns status from service errors', async () => {
      workoutsService.logStrengthSet.mockRejectedValueOnce(
        new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN')
      );

      const response = await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/sets')
        .send(payload)
        .expect(403);

      expect(response.body.message).toBe('WORKOUT_ACCESS_FORBIDDEN');
    });
  });

  describe('logCardioEntry', () => {
    const payload = {
      durationSeconds: 1200,
      distanceMeters: 5000
    };

    const responseBody = {
      id: 'cardio-1',
      loggedExerciseId: 'le-1',
      durationSeconds: 1200,
      distanceMeters: 5000,
      createdAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
    };

    it('creates a cardio entry when authorized and valid', async () => {
      workoutsService.logCardioEntry.mockResolvedValueOnce(responseBody);

      const response = await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/cardio')
        .send(payload)
        .expect(201);

      expect(workoutsService.logCardioEntry).toHaveBeenCalledWith(
        'user-123',
        'session-1',
        'le-1',
        payload
      );
      expect(response.body).toEqual(responseBody);
    });

    it('returns 400 when payload fails validation', async () => {
      await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/cardio')
        .send({})
        .expect(400);

      expect(workoutsService.logCardioEntry).not.toHaveBeenCalled();
    });

    it('propagates forbidden error from owner guard', async () => {
      ownerGuard.canActivate.mockImplementationOnce(() => {
        throw new ForbiddenException();
      });

      await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/cardio')
        .send(payload)
        .expect(403);
    });

    it('returns 401 when request user is missing', async () => {
      ownerGuard.canActivate.mockImplementationOnce((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = undefined;
        return true;
      });

      await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/cardio')
        .send(payload)
        .expect(401);

      expect(workoutsService.logCardioEntry).not.toHaveBeenCalled();
    });

    it('returns status from service errors', async () => {
      workoutsService.logCardioEntry.mockRejectedValueOnce(
        new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN')
      );

      const response = await request(app.getHttpServer())
        .post('/workouts/session-1/logged-exercises/le-1/cardio')
        .send(payload)
        .expect(403);

      expect(response.body.message).toBe('WORKOUT_ACCESS_FORBIDDEN');
    });
  });

  describe('completeSession', () => {
    const sessionId = 'c123456789012345678901234';
    const completedSession = {
      id: sessionId,
      userId: 'user-123',
      startTime: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      endTime: new Date('2024-01-01T11:00:00.000Z').toISOString(),
      createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-01T11:00:00.000Z').toISOString(),
      loggedExercises: []
    };

    it('completes a workout session when authorized', async () => {
      workoutsService.completeSession.mockResolvedValueOnce(completedSession);

      const response = await request(app.getHttpServer())
        .put(`/workouts/${sessionId}/complete`)
        .expect(200);

      expect(workoutsService.completeSession).toHaveBeenCalledWith(
        sessionId,
        'user-123'
      );
      expect(response.body).toEqual(completedSession);
    });

    it('returns 400 when session id is invalid', async () => {
      await request(app.getHttpServer())
        .put('/workouts/invalid/complete')
        .expect(400);

      expect(workoutsService.completeSession).not.toHaveBeenCalled();
    });

    it('returns 401 when user is missing from request', async () => {
      jwtGuard.canActivate.mockImplementationOnce((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = undefined;
        return true;
      });

      await request(app.getHttpServer())
        .put(`/workouts/${sessionId}/complete`)
        .expect(401);

      expect(workoutsService.completeSession).not.toHaveBeenCalled();
    });

    it('propagates errors from service', async () => {
      workoutsService.completeSession.mockRejectedValueOnce(
        new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN')
      );

      const response = await request(app.getHttpServer())
        .put(`/workouts/${sessionId}/complete`)
        .expect(403);

      expect(response.body.message).toBe('WORKOUT_ACCESS_FORBIDDEN');
    });
  });

  describe('deleteSession', () => {
    const sessionId = 'c123456789012345678901234';

    it('deletes a workout when authorized', async () => {
      workoutsService.deleteSession.mockResolvedValueOnce(undefined);

      await request(app.getHttpServer())
        .delete(`/workouts/${sessionId}`)
        .expect(204);

      expect(workoutsService.deleteSession).toHaveBeenCalledWith(
        'user-123',
        sessionId
      );
    });

    it('returns 400 when session id is invalid', async () => {
      await request(app.getHttpServer())
        .delete('/workouts/not-a-cuid')
        .expect(400);

      expect(workoutsService.deleteSession).not.toHaveBeenCalled();
    });

    it('returns 401 when user is missing from request', async () => {
      jwtGuard.canActivate.mockImplementationOnce((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = undefined;
        return true;
      });

      await request(app.getHttpServer())
        .delete(`/workouts/${sessionId}`)
        .expect(401);

      expect(workoutsService.deleteSession).not.toHaveBeenCalled();
    });

    it('propagates service errors', async () => {
      workoutsService.deleteSession.mockRejectedValueOnce(
        new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN')
      );

      const response = await request(app.getHttpServer())
        .delete(`/workouts/${sessionId}`)
        .expect(403);

      expect(response.body.message).toBe('WORKOUT_ACCESS_FORBIDDEN');
    });
  });
});
