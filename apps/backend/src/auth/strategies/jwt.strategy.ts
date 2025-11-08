import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService, AuthUser } from '../auth.service';
import { LoggerService } from '../../common/logging/logger.service';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
    private readonly logger: LoggerService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.authService.findUserById(payload.sub);

    if (!user) {
      this.logger.warn('jwt.validate.user_not_found', {
        userId: payload.sub
      });
      throw new UnauthorizedException('User not found.');
    }

    this.logger.debug('jwt.validate.success', {
      userId: user.id,
      email: payload.email
    });

    return user;
  }
}
