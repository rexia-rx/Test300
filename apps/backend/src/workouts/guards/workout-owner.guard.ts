import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';

import { LoggerService } from '../../common/logging/logger.service';
import { WorkoutsService } from '../workouts.service';

interface RequestWithUser extends Request {
  user?: { id?: string };
}

@Injectable()
export class WorkoutOwnerGuard implements CanActivate {
  constructor(
    private readonly workoutsService: WorkoutsService,
    private readonly logger: LoggerService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const userId = req.user?.id;
    const workoutId =
      req.params?.workoutId ?? req.params?.id ?? req.params?.sessionId;

    if (!userId) {
      this.logger.warn('workouts.owner_guard.missing_user');
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    if (!workoutId) {
      this.logger.warn('workouts.owner_guard.missing_workout_id', { userId });
      throw new ForbiddenException('WORKOUT_ACCESS_FORBIDDEN');
    }

    await this.workoutsService.ensureSessionOwnership(userId, workoutId);

    return true;
  }
}
