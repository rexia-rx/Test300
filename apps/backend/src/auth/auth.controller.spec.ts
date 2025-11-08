import {
  ConflictException,
  INestApplication,
  InternalServerErrorException,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AuthController } from './auth.controller';
import { AuthService, RegisteredUser } from './auth.service';
import { LoggerService } from '../common/logging/logger.service';

describe('AuthController', () => {
  let app: INestApplication;
  let authService: { register: jest.Mock; login: jest.Mock };
  let logger: LoggerService;

  beforeEach(async () => {
    authService = {
      register: jest.fn(),
      login: jest.fn()
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
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService
        },
        {
          provide: LoggerService,
          useValue: logger
        }
      ]
    }).compile();

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

  const validRequest = {
    email: 'user@example.com',
    password: 'password123'
  };

  const validLoginResponse = {
    accessToken: 'jwt-token'
  };

  it('registers a user and returns the sanitized response', async () => {
    const registeredUser: RegisteredUser = {
      id: 'user-id',
      email: validRequest.email,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z')
    };

    authService.register.mockResolvedValueOnce(registeredUser);

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(validRequest)
      .expect(201);

    expect(authService.register).toHaveBeenCalledWith(validRequest);
    expect(response.body).toEqual({
      id: registeredUser.id,
      email: registeredUser.email,
      createdAt: registeredUser.createdAt.toISOString(),
      updatedAt: registeredUser.updatedAt.toISOString()
    });
  });

  it('logs a user in and returns the access token', async () => {
    authService.login.mockResolvedValueOnce(validLoginResponse);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(validRequest)
      .expect(200);

    expect(authService.login).toHaveBeenCalledWith(validRequest);
    expect(response.body).toEqual(validLoginResponse);
  });

  it('returns 400 when email is invalid', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...validRequest, email: 'not-an-email' })
      .expect(400);
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('returns 400 when login email is invalid', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...validRequest, email: 'not-an-email' })
      .expect(400);

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('returns 400 when password is too short', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ ...validRequest, password: 'short' })
      .expect(400);
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('returns 400 when login password is too short', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...validRequest, password: 'short' })
      .expect(400);

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('returns 409 when service throws conflict', async () => {
    authService.register.mockRejectedValueOnce(
      new ConflictException('ACCOUNT_EXISTS')
    );

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(validRequest)
      .expect(409);

    expect(response.body.message).toBe('ACCOUNT_EXISTS');
  });

  it('returns 500 when service throws internal error', async () => {
    authService.register.mockRejectedValueOnce(
      new InternalServerErrorException('ACCOUNT_CREATION_FAILED')
    );

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(validRequest)
      .expect(500);

    expect(response.body.message).toBe('ACCOUNT_CREATION_FAILED');
  });

  it('returns 401 when login throws unauthorized', async () => {
    authService.login.mockRejectedValueOnce(
      new UnauthorizedException('INVALID_CREDENTIALS')
    );

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(validRequest)
      .expect(401);

    expect(response.body.message).toBe('INVALID_CREDENTIALS');
  });

  it('returns 500 when login throws unexpected error', async () => {
    authService.login.mockRejectedValueOnce(
      new InternalServerErrorException('TOKEN_GENERATION_FAILED')
    );

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(validRequest)
      .expect(500);

    expect(response.body.message).toBe('TOKEN_GENERATION_FAILED');
  });
});
