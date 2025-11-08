import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

import { LoggerService } from './logger.service';

interface RequestWithContext extends Request {
  correlationId?: string;
  user?: { id?: string } | undefined;
}

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: RequestWithContext, res: Response, next: NextFunction): void {
    const correlationId = req.headers['x-correlation-id']?.toString() ?? randomUUID();
    const start = process.hrtime.bigint();

    req.correlationId = correlationId;
    res.setHeader('x-correlation-id', correlationId);

    const { method } = req;
    const url = req.originalUrl || req.url;
    const userAgent = this.extractUserAgent(req);

    this.logger.info('HTTP request received', {
      correlationId,
      method,
      url,
      userId: this.extractUserId(req),
      userAgent
    });

    res.on('finish', () => {
      const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
      const responseTimeMs = Math.round(duration * 1000) / 1000;
      const metadata = {
        correlationId,
        method,
        url,
        statusCode: res.statusCode,
        responseTimeMs,
        userId: this.extractUserId(req),
        userAgent
      };

      if (res.statusCode >= 500) {
        this.logger.error('HTTP request failed', undefined, metadata);
      } else if (res.statusCode >= 400) {
        this.logger.warn('HTTP request completed with client error', metadata);
      } else {
        this.logger.info('HTTP request completed', metadata);
      }
    });

    next();
  }

  private extractUserId(req: RequestWithContext): string | undefined {
    return typeof req.user === 'object' && req.user !== null ? req.user.id : undefined;
  }

  private extractUserAgent(req: RequestWithContext): string | undefined {
    const userAgent = req.headers['user-agent'];
    if (Array.isArray(userAgent)) {
      return userAgent.join(', ');
    }
    return userAgent ?? undefined;
  }
}
