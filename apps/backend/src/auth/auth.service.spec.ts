import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../common/logging/logger.service';
import { PasswordHashingService } from '../common/security/password-hashing.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let hashingService: jest.Mocked<PasswordHashingService>;
  let logger: jest.Mocked<LoggerService>;
  let jwtService: jest.Mocked<JwtService>;

  let prismaServiceMock: {
    user: {
      findUnique: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    hashingService = {
      hashPassword: jest.fn().mockResolvedValue('hashed-value'),
      comparePassword: jest.fn().mockResolvedValue(true)
    } as unknown as jest.Mocked<PasswordHashingService>;

    logger = {
      log: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn()
    } as unknown as jest.Mocked<LoggerService>;

    prismaServiceMock = {
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn()
      }
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('access-token')
    } as unknown as jest.Mocked<JwtService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PasswordHashingService,
          useValue: hashingService
        },
        {
          provide: LoggerService,
          useValue: logger
        },
        {
          provide: PrismaService,
          useValue: prismaServiceMock as unknown as PrismaService
        },
        {
          provide: JwtService,
          useValue: jwtService
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('hashes passwords using the hashing service', async () => {
    const result = await service.hashPassword('plain-password');

    expect(hashingService.hashPassword).toHaveBeenCalledWith(
      'plain-password'
    );
    expect(result).toBe('hashed-value');
    expect(logger.debug).toHaveBeenCalledWith('auth.hash_password.start');
    expect(logger.debug).toHaveBeenCalledWith('auth.hash_password.success');
  });

  it('throws when password is shorter than 8 characters', async () => {
    await expect(service.hashPassword('short')).rejects.toBeInstanceOf(
      BadRequestException
    );
    expect(logger.warn).toHaveBeenCalledWith(
      'auth.hash_password.invalid_length'
    );
    expect(hashingService.hashPassword).not.toHaveBeenCalled();
  });

  it('compares passwords using the hashing service', async () => {
    hashingService.comparePassword.mockResolvedValueOnce(true);

    const result = await service.comparePassword('plain', 'hash');

    expect(hashingService.comparePassword).toHaveBeenCalledWith(
      'plain',
      'hash'
    );
    expect(result).toBe(true);
    expect(logger.debug).toHaveBeenCalledWith('auth.compare_password.start');
    expect(logger.debug).toHaveBeenCalledWith('auth.compare_password.result', {
      match: true
    });
  });

  it('looks up a user by id using PrismaService', async () => {
    prismaServiceMock.user.findUnique.mockResolvedValueOnce({
      id: 'user-id'
    });

    const result = await service.findUserById('user-id');

    expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-id' }
    });
    expect(result).toEqual({ id: 'user-id' });
    expect(logger.debug).toHaveBeenCalledWith('auth.find_user_by_id', {
      userId: 'user-id'
    });
  });

  describe('register', () => {
    const registerDto = {
      email: 'test@example.com',
      password: 'password123'
    };

    it('creates a new user when email is unique', async () => {
      prismaServiceMock.user.create.mockResolvedValueOnce({
        id: 'new-user-id',
        email: registerDto.email,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-01T00:00:00.000Z')
      });

      const result = await service.register(registerDto);

      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: registerDto.email }
      });
      expect(hashingService.hashPassword).toHaveBeenCalledWith(
        registerDto.password
      );
      expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
        data: {
          email: registerDto.email,
          passwordHash: 'hashed-value'
        }
      });
      expect(result).toEqual({
        id: 'new-user-id',
        email: registerDto.email,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-01T00:00:00.000Z')
      });
      expect(logger.info).toHaveBeenCalledWith('auth.register.created', {
        userId: 'new-user-id',
        email: registerDto.email
      });
    });

    it('throws conflict when user already exists', async () => {
      prismaServiceMock.user.findUnique.mockResolvedValueOnce({
        id: 'existing-user'
      });

      await expect(service.register(registerDto)).rejects.toBeInstanceOf(
        ConflictException
      );
      expect(prismaServiceMock.user.create).not.toHaveBeenCalled();
      expect(hashingService.hashPassword).not.toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith('auth.register.email_exists', {
        email: registerDto.email
      });
    });

    it('throws conflict when Prisma returns unique constraint error', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'error',
        'P2002',
        '5.10.2'
      );

      prismaServiceMock.user.create.mockRejectedValueOnce(prismaError);

      await expect(service.register(registerDto)).rejects.toBeInstanceOf(
        ConflictException
      );
      expect(logger.warn).toHaveBeenCalledWith(
        'auth.register.email_exists_conflict',
        { email: registerDto.email }
      );
    });

    it('throws internal error for unexpected failures', async () => {
      prismaServiceMock.user.create.mockRejectedValueOnce(new Error('boom'));

      await expect(service.register(registerDto)).rejects.toBeInstanceOf(
        InternalServerErrorException
      );
      expect(logger.error).toHaveBeenCalledWith(
        'auth.register.failed',
        expect.any(String),
        { email: registerDto.email }
      );
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'user@example.com',
      password: 'password123'
    };

    const userRecord = {
      id: 'user-id',
      email: loginDto.email,
      passwordHash: 'stored-hash',
      displayName: null,
      preferredUnits: 'metric',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z')
    };

    beforeEach(() => {
      prismaServiceMock.user.findUnique.mockResolvedValue(userRecord);
      hashingService.comparePassword.mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValue('access-token');
    });

    it('returns an access token when credentials are valid', async () => {
      const result = await service.login(loginDto);

      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
        select: {
          id: true,
          email: true,
          passwordHash: true,
          displayName: true,
          preferredUnits: true,
          createdAt: true,
          updatedAt: true
        }
      });
      expect(hashingService.comparePassword).toHaveBeenCalledWith(
        loginDto.password,
        userRecord.passwordHash
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: userRecord.id,
        email: userRecord.email
      });
      expect(result).toEqual({ accessToken: 'access-token' });
      expect(logger.info).toHaveBeenCalledWith('auth.login.success', {
        userId: userRecord.id
      });
    });

    it('throws unauthorized when user is not found', async () => {
      prismaServiceMock.user.findUnique.mockResolvedValueOnce(null);

      await expect(service.login(loginDto)).rejects.toBeInstanceOf(
        UnauthorizedException
      );
      expect(logger.warn).toHaveBeenCalledWith(
        'auth.login.invalid_credentials',
        { email: loginDto.email }
      );
      expect(hashingService.comparePassword).not.toHaveBeenCalled();
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('throws unauthorized when password does not match', async () => {
      hashingService.comparePassword.mockResolvedValueOnce(false);

      await expect(service.login(loginDto)).rejects.toBeInstanceOf(
        UnauthorizedException
      );
      expect(logger.warn).toHaveBeenCalledWith(
        'auth.login.invalid_credentials',
        { email: loginDto.email }
      );
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('throws internal error when token generation fails', async () => {
      jwtService.signAsync.mockRejectedValueOnce(new Error('boom'));

      await expect(service.login(loginDto)).rejects.toBeInstanceOf(
        InternalServerErrorException
      );
      expect(logger.error).toHaveBeenCalledWith(
        'auth.login.token_generation_failed',
        expect.any(String),
        { userId: userRecord.id }
      );
    });
  });
});
