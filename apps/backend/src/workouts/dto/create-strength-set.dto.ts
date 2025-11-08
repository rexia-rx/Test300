import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateStrengthSetDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  reps!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  weight!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  setNumber?: number;
}
