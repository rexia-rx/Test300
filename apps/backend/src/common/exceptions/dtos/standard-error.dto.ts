export class StandardErrorResponseDto {
  statusCode!: number;
  message!: string | string[];
  errorCode!: string;
  timestamp!: string;
  path!: string;
  details?: Record<string, unknown>;
}
