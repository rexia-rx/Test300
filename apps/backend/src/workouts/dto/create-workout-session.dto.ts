import { IsDateString, IsOptional } from 'class-validator';

export class CreateWorkoutSessionDto {
  @IsOptional()
  @IsDateString()
  startTime?: string;
}
