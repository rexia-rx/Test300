import { Body, Controller, Get, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggerService } from '../common/logging/logger.service';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

interface RequestWithUser extends Request {
  user?: { id?: string };
}

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly logger: LoggerService
  ) {}

  @Get()
  async getProfile(@Req() req: RequestWithUser): Promise<ProfileDto> {
    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('profile.get.missing_user');
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('profile.get.request', { userId });
    const profile = await this.profileService.getProfile(userId);
    this.logger.info('profile.get.response', { userId });
    return profile;
  }

  @Put()
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() dto: UpdateProfileDto
  ): Promise<ProfileDto> {
    const userId = req.user?.id;

    if (!userId) {
      this.logger.warn('profile.update.missing_user');
      throw new UnauthorizedException('AUTHENTICATION_REQUIRED');
    }

    this.logger.info('profile.update.request', {
      userId,
      hasDisplayName: dto.displayName !== undefined,
      preferredUnits: dto.preferredUnits ?? null
    });

    const profile = await this.profileService.updateProfile(userId, dto);

    this.logger.info('profile.update.response', { userId });
    return profile;
  }
}
