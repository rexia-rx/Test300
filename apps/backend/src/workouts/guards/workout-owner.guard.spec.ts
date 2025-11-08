import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common';

import { LoggerService } from '../../common/logging/logger.service';
import { WorkoutsService } from '../workouts.service';
import { WorkoutOwnerGuard } from './workout-owner.guard';

describe('WorkoutOwnerGuard', () => {
  let guard: WorkoutOwnerGuard;
  let workoutsService: { ensureSessionOwnership: jest.Mock };
  let logger: Partial<LoggerService>;

  const createContext = ({
    user,
    params
  }: {
    user?: { id?: string };
    params?: Record<string, string>;
  }): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          user,
          params: params ?? {}
        })
      })
    }) as unknown as ExecutionContext;

  beforeEach(() => {
    workoutsService = {
      ensureSessionOwnership: jest.fn().mockResolvedValue(undefined)
    };
    logger = {
      warn: jest.fn()
    };
    guard = new WorkoutOwnerGuard(
      workoutsService as unknown as WorkoutsService,
      logger as LoggerService
    );
  });

  it('allows access when workoutId param is provided', async () => {
    const context = createContext({
      user: { id: 'user-1' },
      params: { workoutId: 'session-1' }
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(workoutsService.ensureSessionOwnership).toHaveBeenCalledWith(
      'user-1',
      'session-1'
    );
  });

  it('allows access when id param is provided', async () => {
    const context = createContext({
      user: { id: 'user-2' },
      params: { id: 'session-2' }
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(workoutsService.ensureSessionOwnership).toHaveBeenCalledWith(
      'user-2',
      'session-2'
    );
  });

  it('throws UnauthorizedException when user missing', async () => {
    const context = createContext({ params: { id: 'session-3' } });

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException
    );
    expect(workoutsService.ensureSessionOwnership).not.toHaveBeenCalled();
  });

  it('throws ForbiddenException when workout id missing', async () => {
    const context = createContext({ user: { id: 'user-3' } });

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      ForbiddenException
    );
    expect(workoutsService.ensureSessionOwnership).not.toHaveBeenCalled();
  });
});
