import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested
} from 'class-validator';

import { ExerciseType } from '@prisma/client';

export class UpdateStrengthSetDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsInt()
  @Min(1)
  setNumber!: number;

  @IsInt()
  @Min(0)
  reps!: number;

  @IsNumber()
  @Min(0)
  weight!: number;
}

export class UpdateCardioEntryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  durationSeconds?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  distanceMeters?: number;
}

export class UpdateLoggedExerciseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  exerciseId!: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsEnum(ExerciseType)
  type!: ExerciseType;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateStrengthSetDto)
  strengthSets?: UpdateStrengthSetDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCardioEntryDto)
  cardioEntry?: UpdateCardioEntryDto;
}

export class UpdateWorkoutDto {
  @IsOptional()
  @IsISO8601()
  startTime?: string;

  @IsOptional()
  @IsISO8601()
  endTime?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateLoggedExerciseDto)
  loggedExercises?: UpdateLoggedExerciseDto[];
}
