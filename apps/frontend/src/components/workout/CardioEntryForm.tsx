'use client';

import { useEffect, useMemo, useState } from 'react';

import type {
  CreateCardioEntryPayload,
  LoggedExercise
} from '@myfitness2/shared-types';

import { workoutService } from '../../services/workout.service';
import type { ApiErrorResponse } from '../../services/auth.service';
import { useWorkoutStore } from '../../store/workout.store';
import { Button } from '../common/Button';

interface CardioEntryFormProps {
  loggedExercise: LoggedExercise;
}

const mapErrorMessage = (message: string | string[] | undefined) => {
  if (!message) {
    return 'FAILED_TO_LOG_CARDIO';
  }

  return Array.isArray(message) ? message.join(', ') : message;
};

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) {
    return '—';
  }

  return value.toString();
};

export function CardioEntryForm({
  loggedExercise
}: CardioEntryFormProps): JSX.Element {
  const { upsertCardioEntry } = useWorkoutStore();
  const [durationInput, setDurationInput] = useState('');
  const [distanceInput, setDistanceInput] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    duration?: string;
    distance?: string;
  }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasExistingEntry = useMemo(
    () => Boolean(loggedExercise.cardioEntry),
    [loggedExercise.cardioEntry]
  );

  useEffect(() => {
    if (loggedExercise.cardioEntry) {
      setDurationInput(
        loggedExercise.cardioEntry.durationSeconds !== null &&
          loggedExercise.cardioEntry.durationSeconds !== undefined
          ? loggedExercise.cardioEntry.durationSeconds.toString()
          : ''
      );
      setDistanceInput(
        loggedExercise.cardioEntry.distanceMeters !== null &&
          loggedExercise.cardioEntry.distanceMeters !== undefined
          ? loggedExercise.cardioEntry.distanceMeters.toString()
          : ''
      );
      setFieldErrors({});
      setFormError(null);
      setApiError(null);
    }
  }, [loggedExercise.cardioEntry]);

  const handleSubmit = async () => {
    if (!loggedExercise) {
      return;
    }

    const errors: { duration?: string; distance?: string } = {};
    setFormError(null);
    setApiError(null);

    const duration = durationInput.trim() === '' ? undefined : Number(durationInput);
    const distance = distanceInput.trim() === '' ? undefined : Number(distanceInput);

    if (durationInput.trim() !== '' && (Number.isNaN(duration) || duration < 0)) {
      errors.duration = 'Duration must be a non-negative number';
    }

    if (distanceInput.trim() !== '' && (Number.isNaN(distance) || distance < 0)) {
      errors.distance = 'Distance must be a non-negative number';
    }

    const hasDuration = duration !== undefined;
    const hasDistance = distance !== undefined;

    if (!hasDuration && !hasDistance) {
      setFormError('Provide at least duration or distance');
    }

    if (Object.keys(errors).length > 0 || (!hasDuration && !hasDistance)) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const payload: CreateCardioEntryPayload = {};

      if (hasDuration) {
        payload.durationSeconds = duration as number;
      }

      if (hasDistance) {
        payload.distanceMeters = distance as number;
      }

      const createdEntry = await workoutService.logCardioEntry(
        loggedExercise.sessionId,
        loggedExercise.id,
        payload
      );

      upsertCardioEntry?.(loggedExercise.id, createdEntry);
    } catch (error) {
      const apiResponse = error as ApiErrorResponse;
      setApiError(mapErrorMessage(apiResponse?.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4" data-testid={`cardio-entry-${loggedExercise.id}`}>
      <div className="rounded-md bg-gray-50 p-3">
        <h3 className="text-sm font-semibold text-gray-800">Cardio entry</h3>
        {loggedExercise.cardioEntry ? (
          <dl className="mt-2 space-y-1 text-sm text-gray-700">
            <div className="flex justify-between">
              <dt>Duration (seconds)</dt>
              <dd>{formatNumber(loggedExercise.cardioEntry.durationSeconds)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Distance (meters)</dt>
              <dd>{formatNumber(loggedExercise.cardioEntry.distanceMeters)}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            No cardio entry has been logged yet.
          </p>
        )}
      </div>

      <form
        className="flex flex-col gap-3 md:flex-row md:items-end"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Duration (seconds)
            <input
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              inputMode="numeric"
              name="duration"
              value={durationInput}
              onChange={(event) => setDurationInput(event.target.value)}
              disabled={hasExistingEntry || isSubmitting}
              aria-invalid={fieldErrors.duration ? 'true' : 'false'}
              aria-describedby={
                fieldErrors.duration ? `duration-error-${loggedExercise.id}` : undefined
              }
            />
          </label>
          {fieldErrors.duration ? (
            <p
              className="text-xs text-red-600"
              id={`duration-error-${loggedExercise.id}`}
            >
              {fieldErrors.duration}
            </p>
          ) : null}
        </div>

        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Distance (meters)
            <input
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              inputMode="decimal"
              name="distance"
              value={distanceInput}
              onChange={(event) => setDistanceInput(event.target.value)}
              disabled={hasExistingEntry || isSubmitting}
              aria-invalid={fieldErrors.distance ? 'true' : 'false'}
              aria-describedby={
                fieldErrors.distance ? `distance-error-${loggedExercise.id}` : undefined
              }
            />
          </label>
          {fieldErrors.distance ? (
            <p
              className="text-xs text-red-600"
              id={`distance-error-${loggedExercise.id}`}
            >
              {fieldErrors.distance}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={hasExistingEntry || isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Logging...' : hasExistingEntry ? 'Cardio Logged' : 'Add Cardio'}
        </Button>
      </form>

      {formError ? (
        <p className="text-sm text-red-600" data-testid="cardio-form-error">
          {formError}
        </p>
      ) : null}

      {apiError ? (
        <p className="text-sm text-red-600" data-testid="cardio-api-error">
          {apiError}
        </p>
      ) : null}
    </div>
  );
}
