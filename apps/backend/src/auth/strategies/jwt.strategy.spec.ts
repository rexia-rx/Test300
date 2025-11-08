import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

import { AuthService, AuthUser } from '../auth.service';
import { LoggerService } from '../../common/logging/logger.service';
import { JwtStrategy, JwtPayload } from './jwt.strategy';

describe('JwtStrategy', () => {
  const configServiceMock: Partial<ConfigService> = {
    get: jest.fn().mockReturnValue('test-secret')
  };

  const loggerMock: LoggerService = {
    log: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn()
  } as unknown as LoggerService;

  const user: AuthUser = {
    id: 'user-id',
    email: 'user@example.com',
    passwordHash: 'hash',
    displayName: 'Test User',
    preferredUnits: 'METRIC',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  it('returns user when found', async () => {
    const authServiceMock: Partial<AuthService> = {
      findUserById: jest.fn().mockResolvedValue(user)
    };

    const strategy = new JwtStrategy(
      configServiceMock as ConfigService,
      authServiceMock as AuthService,
      loggerMock
    );

    const payload: JwtPayload = { sub: 'user-id', email: 'user@example.com' };
    const result = await strategy.validate(payload);

    expect(authServiceMock.findUserById).toHaveBeenCalledWith('user-id');
    expect(result).toEqual(user);
    expect(loggerMock.debug).toHaveBeenCalledWith('jwt.validate.success', {
      userId: 'user-id',
      email: 'user@example.com'
    });
  });

  it('throws unauthorized when user not found', async () => {
    const authServiceMock: Partial<AuthService> = {
      findUserById: jest.fn().mockResolvedValue(null)
    };

    const strategy = new JwtStrategy(
      configServiceMock as ConfigService,
      authServiceMock as AuthService,
      loggerMock
    );

    const payload: JwtPayload = { sub: 'missing-user', email: 'missing@example.com' };

    await expect(strategy.validate(payload)).rejects.toBeInstanceOf(
      UnauthorizedException
    );
    expect(loggerMock.warn).toHaveBeenCalledWith('jwt.validate.user_not_found', {
      userId: 'missing-user'
    });
  });
});
