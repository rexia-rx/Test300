import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common';

import { AuthService, RegisteredUser } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoggerService } from '../common/logging/logger.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<RegisteredUser> {
    this.logger.info('auth.register.request', {
      email: registerDto.email
    });

    const user = await this.authService.register(registerDto);

    this.logger.info('auth.register.success', {
      userId: user.id,
      email: user.email
    });

    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    this.logger.info('auth.login.request', {
      email: loginDto.email
    });

    const response = await this.authService.login(loginDto);

    this.logger.info('auth.login.success', {
      email: loginDto.email
    });

    return response;
  }
}
