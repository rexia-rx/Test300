import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GetExercisesQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;
}
