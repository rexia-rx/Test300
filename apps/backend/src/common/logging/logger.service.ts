import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'verbose';

type LogMetadata = Record<string, unknown> & {
  context?: string;
  correlationId?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  responseTimeMs?: number;
  userId?: string;
  userAgent?: string;
  trace?: string;
};

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string, metadata?: LogMetadata): void {
    this.writeLog('info', message, metadata);
  }

  info(message: string, metadata?: LogMetadata): void {
    this.writeLog('info', message, metadata);
  }

  warn(message: string, metadata?: LogMetadata): void {
    this.writeLog('warn', message, metadata);
  }

  error(message: string, trace?: string, metadata?: LogMetadata): void {
    this.writeLog('error', message, { ...metadata, trace });
  }

  debug(message: string, metadata?: LogMetadata): void {
    this.writeLog('debug', message, metadata);
  }

  verbose(message: string, metadata?: LogMetadata): void {
    this.writeLog('verbose', message, metadata);
  }

  private writeLog(level: LogLevel, message: string, metadata?: LogMetadata): void {
    const payload: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...metadata
    };

    const serialized = JSON.stringify(payload);

    switch (level) {
      case 'error':
        console.error(serialized);
        break;
      case 'warn':
        console.warn(serialized);
        break;
      case 'debug':
      case 'verbose':
        console.debug(serialized);
        break;
      default:
        console.log(serialized);
        break;
    }
  }
}
