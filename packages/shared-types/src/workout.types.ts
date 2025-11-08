import type { Exercise } from './exercise.types';

export interface CreateWorkoutSessionPayload {
  startTime?: string;
}

export interface StrengthSet {
  id: string;
  loggedExerciseId: string;
  setNumber: number;
  reps: number;
  weight: number;
  createdAt: string;
}

export interface CreateStrengthSetPayload {
  reps: number;
  weight: number;
  setNumber?: number;
}

export interface CardioEntry {
  id: string;
  loggedExerciseId: string;
  durationSeconds: number | null;
  distanceMeters: number | null;
  createdAt: string;
}

export interface CreateCardioEntryPayload {
  durationSeconds?: number;
  distanceMeters?: number;
}

export interface LoggedExercise {
  id: string;
  sessionId: string;
  exerciseId: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  exercise?: Exercise;
  strengthSets: StrengthSet[];
  cardioEntry: CardioEntry | null;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  startTime: string;
  endTime: string | null;
  createdAt: string;
  updatedAt: string;
  loggedExercises?: LoggedExercise[];
}
