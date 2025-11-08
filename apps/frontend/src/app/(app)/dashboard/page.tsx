'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import type { ApiErrorResponse } from '../../../services/auth.service';
import { workoutService } from '../../../services/workout.service';
import { Button } from '../../../components/common/Button';
import { useWorkoutStore } from '../../../store/workout.store';

const mapStartError = (error: ApiErrorResponse | undefined) => {
  if (!error) {
    return 'Unable to start your workout right now. Please try again.';
  }

  if (error.statusCode === 401 || error.message === 'UNAUTHORIZED') {
    return 'Your session has expired. Please log in again.';
  }

  if (error.statusCode === 400 || error.message === 'INVALID_INPUT') {
    return 'Invalid start time provided. Please try again.';
  }

  if (error.message === 'NETWORK_ERROR') {
    return 'Unable to reach the server. Check your connection and try again.';
  }

  return 'Unable to start your workout right now. Please try again.';
};

export default function DashboardPage(): JSX.Element {
  const router = useRouter();
  const { setActiveSession, clearActiveSession } = useWorkoutStore();
  const [isStarting, setIsStarting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStartWorkout = useCallback(async () => {
    setErrorMessage(null);
    clearActiveSession();
    setIsStarting(true);

    try {
      const session = await workoutService.startSession();
      setActiveSession(session);
      router.push(`/workouts/${session.id}`);
    } catch (error) {
      const mappedError = mapStartError(error as ApiErrorResponse | undefined);
      setErrorMessage(mappedError);
    } finally {
      setIsStarting(false);
    }
  }, [clearActiveSession, router, setActiveSession]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Kick off a new workout session to start tracking your progress.
      </p>

      {errorMessage ? (
        <div className="mt-6 rounded-md bg-red-50 p-4 text-sm text-red-800" role="alert">
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-8">
        <Button
          aria-label="Start a new workout session"
          isLoading={isStarting}
          loadingText="Starting workout…"
          onClick={handleStartWorkout}
        >
          Start Workout
        </Button>
      </div>
    </div>
  );
}
