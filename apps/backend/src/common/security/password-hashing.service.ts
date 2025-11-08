import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

import { LoggerService } from '../logging/logger.service';

const DEFAULT_SALT_ROUNDS = 12;

@Injectable()
export class PasswordHashingService {
  private readonly saltRounds: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService
  ) {
    const configuredSaltRounds = this.configService.get<number>(
      'BCRYPT_SALT_ROUNDS'
    );

    this.saltRounds = configuredSaltRounds ?? DEFAULT_SALT_ROUNDS;
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      this.logger.error(
        'password_hash_failed',
        (error as Error).stack,
        {
          context: PasswordHashingService.name
        }
      );
      throw new InternalServerErrorException('PASSWORD_HASHING_FAILED');
    }
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      this.logger.error(
        'password_compare_failed',
        (error as Error).stack,
        {
          context: PasswordHashingService.name
        }
      );
      throw new InternalServerErrorException('PASSWORD_COMPARISON_FAILED');
    }
  }
}
