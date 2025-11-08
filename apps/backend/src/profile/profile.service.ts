import {
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { Prisma, type Units } from '@prisma/client';

import { LoggerService } from '../common/logging/logger.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

type ProfileRecord = {
  id: string;
  email: string;
  displayName: string | null;
  preferredUnits: Units;
};

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService
  ) {}

  async getProfile(userId: string): Promise<ProfileDto> {
    this.logger.info('profile.service.get.start', { userId });

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          displayName: true,
          preferredUnits: true
        }
      });

      if (!user) {
        this.logger.warn('profile.service.get.not_found', { userId });
        throw new NotFoundException('PROFILE_NOT_FOUND');
      }

      const profile = this.mapToDto(user);
      this.logger.info('profile.service.get.success', { userId });
      return profile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(
        'profile.service.get.failure',
        (error as Error).stack,
        { userId }
      );
      throw new InternalServerErrorException('PROFILE_LOOKUP_FAILED');
    }
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto
  ): Promise<ProfileDto> {
    this.logger.info('profile.service.update.start', {
      userId,
      hasDisplayName: dto.displayName !== undefined,
      preferredUnits: dto.preferredUnits ?? null
    });

    const data: Prisma.UserUpdateInput = {};

    if (dto.displayName !== undefined) {
      data.displayName = dto.displayName ?? null;
    }

    if (dto.preferredUnits !== undefined) {
      data.preferredUnits = dto.preferredUnits;
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          email: true,
          displayName: true,
          preferredUnits: true
        }
      });

      const profile = this.mapToDto(updatedUser);
      this.logger.info('profile.service.update.success', { userId });
      return profile;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          this.logger.warn('profile.service.update.not_found', { userId });
          throw new NotFoundException('PROFILE_NOT_FOUND');
        }
      }

      this.logger.error(
        'profile.service.update.failure',
        (error as Error).stack,
        {
          userId
        }
      );
      throw new InternalServerErrorException('PROFILE_UPDATE_FAILED');
    }
  }

  private mapToDto(record: ProfileRecord): ProfileDto {
    return {
      id: record.id,
      email: record.email,
      displayName: record.displayName,
      preferredUnits: record.preferredUnits
    };
  }
}
