export type ExerciseType = 'STRENGTH' | 'CARDIO';

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  createdById: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetExercisesQuery {
  search?: string;
}

export interface CreateExerciseDto {
  name: string;
  type: 'STRENGTH' | 'CARDIO';
}
