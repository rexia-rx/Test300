'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { WorkoutSession } from '@myfitness2/shared-types';

import { Button } from '../../../../components/common/Button';
import type { ApiErrorResponse } from '../../../../services/auth.service';
import { workoutService } from '../../../../services/workout.service';
import { useWorkoutStore } from '../../../../store/workout.store';

type FinishWorkoutButtonProps = {
  sessionId: string;
  onCompleted?: (session: WorkoutSession) => void;
};

export function FinishWorkoutButton({
  sessionId,
  onCompleted
}: FinishWorkoutButtonProps): JSX.Element {
  const router = useRouter();
  const { clearActiveSession } = useWorkoutStore();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFinish = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const completedSession = await workoutService.completeSession(sessionId);
      clearActiveSession();
      onCompleted?.(completedSession);
      setSuccessMessage('Workout completed successfully. Redirecting…');
      router.push('/dashboard');
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      setErrorMessage(apiError.message ?? 'WORKOUT_COMPLETE_FAILED');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, clearActiveSession, onCompleted, router]);

  return (
    <div className="mt-8 space-y-3" aria-live="polite">
      <Button
        onClick={handleFinish}
        isLoading={isLoading}
        loadingText="Finishing…"
        disabled={isLoading || Boolean(successMessage)}
      >
        Finish Workout
      </Button>
      {errorMessage ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
      {successMessage ? (
        <p className="text-sm text-green-600">{successMessage}</p>
      ) : null}
    </div>
  );
}
