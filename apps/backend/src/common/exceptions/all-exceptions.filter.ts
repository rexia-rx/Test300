import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggerService } from '../logging/logger.service';
import { StandardErrorResponseDto } from './dtos/standard-error.dto';

type HttpRequest = Request & {
  correlationId?: string;
  user?: { id?: string };
};

type ErrorLogMetadata = {
  correlationId?: string;
  statusCode: number;
  errorCode: string;
  path: string;
  userId?: string;
  details?: Record<string, unknown>;
  message: string | string[];
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<HttpRequest>();

    const { statusCode, message, errorCode, details } = this.normalizeException(exception);
    const payload: StandardErrorResponseDto = {
      statusCode,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(details ? { details } : {})
    };

    this.logException(exception, {
      correlationId: request.correlationId,
      statusCode,
      errorCode,
      path: request.url,
      userId: request.user?.id,
      details,
      message
    });

    response.status(statusCode).json(payload);
  }

  private normalizeException(exception: unknown): {
    statusCode: number;
    message: string | string[];
    errorCode: string;
    details?: Record<string, unknown>;
  } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      const message = this.extractMessage(response) ?? exception.message;
      const errorCode = this.extractErrorCode(response) ?? this.mapStatusToErrorCode(status);
      const details = this.extractDetails(response);

      return {
        statusCode: status,
        message,
        errorCode,
        details
      };
    }

    if (exception instanceof Error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errorCode: 'INTERNAL_ERROR',
        details: { message: exception.message }
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      errorCode: 'INTERNAL_ERROR'
    };
  }

  private extractMessage(response: unknown): string | string[] | undefined {
    if (typeof response === 'string') {
      return response;
    }

    if (Array.isArray(response)) {
      return response as string[];
    }

    if (typeof response === 'object' && response !== null) {
      const message = (response as Record<string, unknown>).message;
      if (Array.isArray(message)) {
        return message as string[];
      }
      if (typeof message === 'string') {
        return message;
      }
    }

    return undefined;
  }

  private extractErrorCode(response: unknown): string | undefined {
    if (typeof response === 'object' && response !== null) {
      const errorCode = (response as Record<string, unknown>).errorCode;
      if (typeof errorCode === 'string') {
        return errorCode;
      }
    }
    return undefined;
  }

  private extractDetails(response: unknown): Record<string, unknown> | undefined {
    if (typeof response === 'object' && response !== null && !Array.isArray(response)) {
      const { message, error, statusCode, errorCode, ...rest } = response as Record<string, unknown>;
      return Object.keys(rest).length > 0 ? rest : undefined;
    }
    return undefined;
  }

  private mapStatusToErrorCode(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'INVALID_INPUT';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.TOO_MANY_REQUESTS:
        return 'TOO_MANY_REQUESTS';
      default:
        return status >= 500 ? 'INTERNAL_ERROR' : 'UNKNOWN_ERROR';
    }
  }

  private logException(exception: unknown, metadata: ErrorLogMetadata): void {
    const logPayload = {
      correlationId: metadata.correlationId,
      statusCode: metadata.statusCode,
      errorCode: metadata.errorCode,
      path: metadata.path,
      userId: metadata.userId,
      details: metadata.details,
      message: metadata.message
    };

    if (exception instanceof HttpException) {
      this.logger.warn('Handled HTTP exception', logPayload);
      return;
    }

    if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack, logPayload);
      return;
    }

    this.logger.error('Unknown exception caught', undefined, logPayload);
  }
}
