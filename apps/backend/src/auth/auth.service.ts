import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, type Units } from '@prisma/client';

import { LoggerService } from '../common/logging/logger.service';
import { PasswordHashingService } from '../common/security/password-hashing.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string | null;
  preferredUnits: Units;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisteredUser {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordHashingService: PasswordHashingService,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService
  ) {}

  async hashPassword(password: string): Promise<string> {
    this.logger.debug('auth.hash_password.start');

    if (!password || password.length < 8) {
      this.logger.warn('auth.hash_password.invalid_length');
      throw new BadRequestException('PASSWORD_TOO_SHORT');
    }

    const hash = await this.passwordHashingService.hashPassword(password);

    this.logger.debug('auth.hash_password.success');
    return hash;
  }

  async comparePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    this.logger.debug('auth.compare_password.start');

    const isMatch = await this.passwordHashingService.comparePassword(
      password,
      passwordHash
    );

    this.logger.debug('auth.compare_password.result', {
      match: isMatch
    });

    return isMatch;
  }

  async findUserById(userId: string): Promise<AuthUser | null> {
    this.logger.debug('auth.find_user_by_id', {
      userId
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    return user as AuthUser | null;
  }

  async register(registerDto: RegisterDto): Promise<RegisteredUser> {
    const { email, password } = registerDto;

    this.logger.info('auth.register.attempt', {
      email
    });

    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      this.logger.warn('auth.register.email_exists', { email });
      throw new ConflictException('ACCOUNT_EXISTS');
    }

    const passwordHash = await this.hashPassword(password);

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          email,
          passwordHash
        }
      });

      const sanitizedUser: RegisteredUser = {
        id: createdUser.id,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt
      };

      this.logger.info('auth.register.created', {
        userId: sanitizedUser.id,
        email: sanitizedUser.email
      });

      return sanitizedUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          this.logger.warn('auth.register.email_exists_conflict', { email });
          throw new ConflictException('ACCOUNT_EXISTS');
        }
      }

      this.logger.error('auth.register.failed', (error as Error).stack, {
        email
      });
      throw new InternalServerErrorException('ACCOUNT_CREATION_FAILED');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthTokens> {
    const { email, password } = loginDto;

    this.logger.info('auth.login.attempt', {
      email
    });

    const user = (await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        displayName: true,
        preferredUnits: true,
        createdAt: true,
        updatedAt: true
      }
    })) as AuthUser | null;

    if (!user) {
      this.logger.warn('auth.login.invalid_credentials', { email });
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    const passwordMatches = await this.comparePassword(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      this.logger.warn('auth.login.invalid_credentials', { email });
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    try {
      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        email: user.email
      });

      this.logger.info('auth.login.success', {
        userId: user.id
      });

      return { accessToken };
    } catch (error) {
      this.logger.error(
        'auth.login.token_generation_failed',
        (error as Error).stack,
        {
          userId: user.id
        }
      );
      throw new InternalServerErrorException('TOKEN_GENERATION_FAILED');
    }
  }
}
