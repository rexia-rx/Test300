import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

import { LoggerService } from '../logging/logger.service';
import { PasswordHashingService } from './password-hashing.service';

describe('PasswordHashingService', () => {
  const loggerMock: LoggerService = {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn()
  } as unknown as LoggerService;

  const configServiceMock: Partial<ConfigService> = {
    get: jest.fn().mockImplementation((key: string, defaultValue?: number) => {
      if (key === 'BCRYPT_SALT_ROUNDS') {
        return 10;
      }

      return defaultValue;
    })
  };

  let service: PasswordHashingService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PasswordHashingService(
      configServiceMock as ConfigService,
      loggerMock
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('hashes a password', async () => {
    const password = 'StrongPass123!';

    const hash = await service.hashPassword(password);

    expect(hash).toBeDefined();
    expect(hash).not.toEqual(password);
    expect(hash.startsWith('$2')).toBe(true);
  });

  it('compares a password successfully', async () => {
    const password = 'AnotherPass456!';
    const hash = await service.hashPassword(password);

    await expect(service.comparePassword(password, hash)).resolves.toBe(true);
    await expect(
      service.comparePassword('incorrect', hash)
    ).resolves.toBe(false);
  });

  it('logs and throws when hashing fails', async () => {
    const error = new Error('hash failed');
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(error);

    await expect(service.hashPassword('test')).rejects.toBeInstanceOf(
      InternalServerErrorException
    );
    expect(loggerMock.error).toHaveBeenCalledWith(
      'password_hash_failed',
      error.stack,
      expect.objectContaining({ context: PasswordHashingService.name })
    );
  });

  it('logs and throws when compare fails', async () => {
    const error = new Error('compare failed');
    jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(error);

    await expect(service.comparePassword('test', 'hash')).rejects.toBeInstanceOf(
      InternalServerErrorException
    );
    expect(loggerMock.error).toHaveBeenCalledWith(
      'password_compare_failed',
      error.stack,
      expect.objectContaining({ context: PasswordHashingService.name })
    );
  });
});
