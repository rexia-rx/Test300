import { IsIn, IsNotEmpty, IsString } from 'class-validator';

type CreateExerciseType = 'STRENGTH' | 'CARDIO';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsIn(['STRENGTH', 'CARDIO'])
  type!: CreateExerciseType;
}
