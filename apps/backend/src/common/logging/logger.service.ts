import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import pino, { Logger as PinoLogger, LogFn, LoggerOptions } from 'pino';

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'verbose' | 'log';

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

const PRODUCTION_ENV = 'production';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: PinoLogger;

  constructor() {
    const options: LoggerOptions = {
      level: process.env.LOG_LEVEL ?? 'info',
      base: undefined
    };

    if (process.env.NODE_ENV !== PRODUCTION_ENV) {
      options.transport = {
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: true
        }
      };
    }

    this.logger = pino(options);
  }

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
    const cleanedMetadata = this.sanitizeMetadata(metadata);
    const { context, ...details } = cleanedMetadata ?? {};
    const logMethod = this.resolveLogMethod(level);
    const payload = context ? { ...details, context } : details;

    if (payload && Object.keys(payload).length > 0) {
      logMethod(payload, message);
      return;
    }

    logMethod(message);
  }

  private sanitizeMetadata(metadata?: LogMetadata): LogMetadata | undefined {
    if (!metadata) {
      return undefined;
    }

    const entries = Object.entries(metadata).filter(([, value]) => value !== undefined);
    return entries.length > 0 ? (Object.fromEntries(entries) as LogMetadata) : undefined;
  }

  private resolveLogMethod(level: LogLevel): LogFn {
    switch (level) {
      case 'error':
        return this.logger.error.bind(this.logger);
      case 'warn':
        return this.logger.warn.bind(this.logger);
      case 'debug':
        return this.logger.debug.bind(this.logger);
      case 'verbose':
        return this.logger.trace.bind(this.logger);
      case 'info':
      case 'log':
      default:
        return this.logger.info.bind(this.logger);
    }
  }
}
