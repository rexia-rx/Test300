import {
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import { LoggerService } from '../common/logging/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let prisma: {
    user: {
      findUnique: jest.Mock;
      update: jest.Mock;
    };
  };
  let logger: jest.Mocked<LoggerService>;

  const profileRecord = {
    id: 'user-1',
    email: 'user@example.com',
    displayName: 'Test User',
    preferredUnits: 'METRIC'
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(profileRecord),
        update: jest.fn().mockResolvedValue(profileRecord)
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
        ProfileService,
        { provide: PrismaService, useValue: prisma },
        { provide: LoggerService, useValue: logger }
      ]
    }).compile();

    service = module.get(ProfileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('returns the profile when the user exists', async () => {
      const result = await service.getProfile('user-1');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        select: {
          id: true,
          email: true,
          displayName: true,
          preferredUnits: true
        }
      });
      expect(result).toEqual(profileRecord);
      expect(logger.info).toHaveBeenCalledWith(
        'profile.service.get.success',
        { userId: 'user-1' }
      );
    });

    it('throws NotFoundException when the user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(service.getProfile('missing-user')).rejects.toBeInstanceOf(
        NotFoundException
      );
      expect(logger.warn).toHaveBeenCalledWith(
        'profile.service.get.not_found',
        { userId: 'missing-user' }
      );
    });

    it('throws InternalServerErrorException when prisma fails', async () => {
      const error = new Error('database error');
      prisma.user.findUnique.mockRejectedValueOnce(error);

      await expect(service.getProfile('user-1')).rejects.toBeInstanceOf(
        InternalServerErrorException
      );
      expect(logger.error).toHaveBeenCalledWith(
        'profile.service.get.failure',
        error.stack,
        { userId: 'user-1' }
      );
    });
  });

  describe('updateProfile', () => {
    it('updates the profile and returns the updated values', async () => {
      const result = await service.updateProfile('user-1', {
        displayName: 'Updated Name',
        preferredUnits: 'IMPERIAL'
      });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: {
          displayName: 'Updated Name',
          preferredUnits: 'IMPERIAL'
        },
        select: {
          id: true,
          email: true,
          displayName: true,
          preferredUnits: true
        }
      });
      expect(result).toEqual(profileRecord);
      expect(logger.info).toHaveBeenCalledWith(
        'profile.service.update.success',
        { userId: 'user-1' }
      );
    });

    it('allows partial updates when only one field is provided', async () => {
      await service.updateProfile('user-1', { preferredUnits: 'METRIC' });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { preferredUnits: 'METRIC' },
        select: {
          id: true,
          email: true,
          displayName: true,
          preferredUnits: true
        }
      });
    });

    it('throws NotFoundException when prisma reports missing record', async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'not found',
        'P2025',
        '5.10.2'
      );
      prisma.user.update.mockRejectedValueOnce(prismaError);

      await expect(
        service.updateProfile('missing-user', { preferredUnits: 'METRIC' })
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(logger.warn).toHaveBeenCalledWith(
        'profile.service.update.not_found',
        { userId: 'missing-user' }
      );
    });

    it('throws InternalServerErrorException for unexpected prisma errors', async () => {
      const error = new Error('unexpected failure');
      prisma.user.update.mockRejectedValueOnce(error);

      await expect(
        service.updateProfile('user-1', { displayName: 'Test' })
      ).rejects.toBeInstanceOf(InternalServerErrorException);
      expect(logger.error).toHaveBeenCalledWith(
        'profile.service.update.failure',
        error.stack,
        { userId: 'user-1' }
      );
    });
  });
});
