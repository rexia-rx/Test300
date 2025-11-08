import {
  INestApplication,
  NotFoundException,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import type { Units } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggerService } from '../common/logging/logger.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
  let app: INestApplication;
  let profileService: {
    getProfile: jest.Mock;
    updateProfile: jest.Mock;
  };
  let guard: { canActivate: jest.Mock };
  let logger: LoggerService;

  const profileResponse = {
    id: 'user-1',
    email: 'user@example.com',
    displayName: 'Test User',
    preferredUnits: 'METRIC' as Units
  };

  beforeEach(async () => {
    profileService = {
      getProfile: jest.fn().mockResolvedValue(profileResponse),
      updateProfile: jest.fn().mockResolvedValue(profileResponse)
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
      controllers: [ProfileController],
      providers: [
        { provide: ProfileService, useValue: profileService },
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

  describe('GET /profile', () => {
    it('returns the authenticated user profile', async () => {
      const response = await request(app.getHttpServer())
        .get('/profile')
        .expect(200);

      expect(profileService.getProfile).toHaveBeenCalledWith('user-1');
      expect(response.body).toEqual(profileResponse);
    });

    it('returns 401 when the guard denies access', async () => {
      guard.canActivate.mockImplementationOnce(() => {
        throw new UnauthorizedException();
      });

      await request(app.getHttpServer()).get('/profile').expect(401);
    });

    it('returns 401 when the request lacks a user context', async () => {
      guard.canActivate.mockImplementationOnce((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = undefined;
        return true;
      });

      await request(app.getHttpServer()).get('/profile').expect(401);
      expect(profileService.getProfile).not.toHaveBeenCalled();
    });

    it('propagates service errors from getProfile', async () => {
      profileService.getProfile.mockRejectedValueOnce(
        new NotFoundException('PROFILE_NOT_FOUND')
      );

      const response = await request(app.getHttpServer())
        .get('/profile')
        .expect(404);

      expect(response.body.message).toBe('PROFILE_NOT_FOUND');
    });
  });

  describe('PUT /profile', () => {
    it('updates the profile with valid data', async () => {
      const response = await request(app.getHttpServer())
        .put('/profile')
        .send({
          displayName: 'Updated User',
          preferredUnits: 'IMPERIAL'
        })
        .expect(200);

      expect(profileService.updateProfile).toHaveBeenCalledWith('user-1', {
        displayName: 'Updated User',
        preferredUnits: 'IMPERIAL'
      });
      expect(response.body).toEqual(profileResponse);
    });

    it('returns 400 when validation fails', async () => {
      await request(app.getHttpServer())
        .put('/profile')
        .send({ displayName: '' })
        .expect(400);

      expect(profileService.updateProfile).not.toHaveBeenCalled();
    });

    it('returns 401 when the guard denies the request', async () => {
      guard.canActivate.mockImplementationOnce(() => {
        throw new UnauthorizedException();
      });

      await request(app.getHttpServer())
        .put('/profile')
        .send({ displayName: 'Name' })
        .expect(401);
    });

    it('returns 401 when user context missing', async () => {
      guard.canActivate.mockImplementationOnce((context) => {
        const req = context.switchToHttp().getRequest();
        req.user = undefined;
        return true;
      });

      await request(app.getHttpServer())
        .put('/profile')
        .send({ displayName: 'Name' })
        .expect(401);
      expect(profileService.updateProfile).not.toHaveBeenCalled();
    });

    it('propagates service errors from updateProfile', async () => {
      profileService.updateProfile.mockRejectedValueOnce(
        new NotFoundException('PROFILE_NOT_FOUND')
      );

      const response = await request(app.getHttpServer())
        .put('/profile')
        .send({ displayName: 'Name' })
        .expect(404);

      expect(response.body.message).toBe('PROFILE_NOT_FOUND');
    });
  });
});
