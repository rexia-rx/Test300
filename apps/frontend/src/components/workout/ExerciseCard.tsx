'use client';

import { useMemo, useState } from 'react';

import type {
  Exercise,
  LoggedExercise,
  StrengthSet
} from '@myfitness2/shared-types';

import { workoutService } from '../../services/workout.service';
import type { ApiErrorResponse } from '../../services/auth.service';
import { useWorkoutStore } from '../../store/workout.store';
import { Button } from '../common/Button';
import { CardioEntryForm } from './CardioEntryForm';

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect?: (exercise: Exercise) => void;
  disabled?: boolean;
  loggedExercise?: LoggedExercise;
}

const formatExerciseType = (type: Exercise['type']) => {
  switch (type) {
    case 'STRENGTH':
      return 'Strength';
    case 'CARDIO':
      return 'Cardio';
    case 'MOBILITY':
      return 'Mobility';
    default:
      return type;
  }
};

const mapErrorMessage = (message: string | string[] | undefined) => {
  if (!message) {
    return 'FAILED_TO_LOG_SET';
  }

  return Array.isArray(message) ? message.join(', ') : message;
};

export function ExerciseCard({
  exercise,
  onSelect,
  disabled = false,
  loggedExercise
}: ExerciseCardProps): JSX.Element {
  const { appendStrengthSet } = useWorkoutStore();
  const [repsInput, setRepsInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ reps?: string; weight?: string }>(
    {}
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = () => {
    if (disabled || !onSelect) {
      return;
    }

    onSelect(exercise);
  };

  const strengthSets: StrengthSet[] = useMemo(() => {
    if (!loggedExercise) {
      return [];
    }

    return [...loggedExercise.strengthSets].sort(
      (left, right) => left.setNumber - right.setNumber
    );
  }, [loggedExercise]);

  const handleAddSet = async () => {
    if (!loggedExercise) {
      return;
    }

    const errors: { reps?: string; weight?: string } = {};
    const reps = Number(repsInput);
    const weight = Number(weightInput);

    if (Number.isNaN(reps) || reps < 0) {
      errors.reps = 'Reps must be a non-negative number';
    }

    if (Number.isNaN(weight) || weight < 0) {
      errors.weight = 'Weight must be a non-negative number';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setApiError(null);
    setIsSubmitting(true);

    try {
      const createdSet = await workoutService.logStrengthSet(
        loggedExercise.sessionId,
        loggedExercise.id,
        { reps, weight }
      );

      appendStrengthSet?.(loggedExercise.id, createdSet);
      setRepsInput('');
      setWeightInput('');
    } catch (error) {
      const apiResponse = error as ApiErrorResponse;
      setApiError(mapErrorMessage(apiResponse?.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!loggedExercise) {
    return (
      <button
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-indigo-500 hover:shadow disabled:cursor-not-allowed disabled:opacity-70"
        onClick={handleClick}
        type="button"
        disabled={disabled}
        data-testid={`exercise-card-${exercise.id}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-gray-900">
              {exercise.name}
            </p>
            <p className="text-sm text-gray-500">
              {formatExerciseType(exercise.type)}
            </p>
          </div>
          <span className="text-xs text-gray-400">
            Updated {new Date(exercise.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </button>
    );
  }

  const activeExercise = loggedExercise.exercise ?? exercise;
  const isCardio = activeExercise.type === 'CARDIO';

  return (
    <div
      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm"
      data-testid={`exercise-card-${loggedExercise.id}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-gray-900">
            {activeExercise.name}
          </p>
          <p className="text-sm text-gray-500">
            {formatExerciseType(activeExercise.type)}
          </p>
        </div>
        <span className="text-xs text-gray-400">
          Last updated {new Date(activeExercise.updatedAt).toLocaleDateString()}
        </span>
      </div>

      {isCardio ? (
        <div className="mt-4">
          <CardioEntryForm loggedExercise={loggedExercise} />
        </div>
      ) : (
        <>
          <div className="mt-4 space-y-2">
            {strengthSets.length === 0 ? (
              <p className="text-sm text-gray-500">No sets logged yet.</p>
            ) : (
              <ul className="space-y-1">
                {strengthSets.map((set) => (
                  <li
                    key={set.id}
                    className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-700"
                  >
                    <span>Set {set.setNumber}</span>
                    <span>{set.reps} reps</span>
                    <span>{set.weight} kg</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form
            className="mt-4 flex flex-col gap-3 md:flex-row md:items-end"
            onSubmit={(event) => {
              event.preventDefault();
              void handleAddSet();
            }}
          >
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Reps
                <input
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  inputMode="numeric"
                  name="reps"
                  value={repsInput}
                  onChange={(event) => setRepsInput(event.target.value)}
                  aria-invalid={fieldErrors.reps ? 'true' : 'false'}
                  aria-describedby={
                    fieldErrors.reps ? `reps-error-${loggedExercise.id}` : undefined
                  }
                />
              </label>
              {fieldErrors.reps ? (
                <p
                  className="text-xs text-red-600"
                  id={`reps-error-${loggedExercise.id}`}
                >
                  {fieldErrors.reps}
                </p>
              ) : null}
            </div>

            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Weight (kg)
                <input
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  inputMode="decimal"
                  name="weight"
                  value={weightInput}
                  onChange={(event) => setWeightInput(event.target.value)}
                  aria-invalid={fieldErrors.weight ? 'true' : 'false'}
                  aria-describedby={
                    fieldErrors.weight ? `weight-error-${loggedExercise.id}` : undefined
                  }
                />
              </label>
              {fieldErrors.weight ? (
                <p
                  className="text-xs text-red-600"
                  id={`weight-error-${loggedExercise.id}`}
                >
                  {fieldErrors.weight}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? 'Adding...' : 'Add Set'}
            </Button>
          </form>

          {apiError ? (
            <p
              className="mt-2 text-sm text-red-600"
              data-testid="exercise-card-error"
            >
              {apiError}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
