'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import type {
  Exercise,
  LoggedExercise,
  WorkoutSession
} from '@myfitness2/shared-types';

import { Button } from '../../../../components/common/Button';
import { DeleteConfirmationModal } from '../../../../components/common/DeleteConfirmationModal';
import { CreateCustomExerciseModal } from '../../../../components/workout/CreateCustomExerciseModal';
import { ExerciseLibraryModal } from '../../../../components/workout/ExerciseLibraryModal';
import { ExerciseCard } from '../../../../components/workout/ExerciseCard';
import { LoggedExerciseEditor } from '../../../../components/workout/LoggedExerciseEditor';
import { RestTimer } from '../../../../components/workout/RestTimer';
import { useExerciseSearch } from '../../../../hooks/useExerciseSearch';
import { useRestTimer } from '../../../../hooks/useRestTimer';
import {
  type LoggedExerciseDraft,
  useWorkoutEditor
} from '../../../../hooks/useWorkoutEditor';
import { useWorkoutStore } from '../../../../store/workout.store';
import type { ApiErrorResponse } from '../../../../services/auth.service';
import { workoutService } from '../../../../services/workout.service';
import { FinishWorkoutButton } from './FinishWorkoutButton';
import { WorkoutSummary } from './WorkoutSummary';

const mapSessionLoadError = (error: ApiErrorResponse | undefined) => {
  if (!error) {
    return 'We were unable to load this workout session. Please try again.';
  }

  if (error.statusCode === 404 || error.message === 'WORKOUT_NOT_FOUND') {
    return 'We couldn’t find this workout session.';
  }

  if (error.statusCode === 403 || error.message === 'WORKOUT_ACCESS_FORBIDDEN') {
    return 'You do not have access to this workout session.';
  }

  if (error.statusCode === 401 || error.message === 'AUTHENTICATION_REQUIRED') {
    return 'Your session has expired. Please log in again.';
  }

  if (error.message === 'NETWORK_ERROR') {
    return 'We cannot connect to the server right now. Please check your connection and try again.';
  }

  return 'We were unable to load this workout session. Please try again.';
};

export default function WorkoutSessionPage(): JSX.Element {
  const params = useParams<{ id: string }>();
  const sessionId = useMemo(() => params?.id?.toString() ?? '', [params]);
  const router = useRouter();
  const { activeSession, setActiveSession, clearActiveSession } =
    useWorkoutStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [isCreateCustomModalOpen, setIsCreateCustomModalOpen] = useState(false);
  const [completedSession, setCompletedSession] =
    useState<WorkoutSession | null>(null);
  const [sessionSnapshot, setSessionSnapshot] = useState<WorkoutSession | null>(
    () => (activeSession?.id === sessionId ? activeSession : null)
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { searchQuery, setSearchQuery, exercises, isLoading, error, fetchExercises } =
    useExerciseSearch();

  const session = completedSession ?? sessionSnapshot;
  const isSessionCompleted = Boolean(session?.endTime);
  const [sessionLoadError, setSessionLoadError] = useState<string | null>(null);
  const [isSessionLoading, setIsSessionLoading] = useState(
    () => !session || session.id !== sessionId
  );

  const {
    timeLeft: restTimeLeft,
    isRunning: isRestRunning,
    isPaused: isRestPaused,
    isFinished: isRestFinished,
    startTimer: startRestTimer,
    pauseTimer: pauseRestTimer,
    resumeTimer: resumeRestTimer,
    skipTimer: skipRestTimer,
    resetTimer: resetRestTimer
  } = useRestTimer();

  const restSetCountRef = useRef<number | null>(null);

  const totalStrengthSets = useMemo(() => {
    if (!session?.loggedExercises) {
      return 0;
    }

    return session.loggedExercises.reduce((total, item) => {
      return total + (item.strengthSets?.length ?? 0);
    }, 0);
  }, [session?.loggedExercises]);

  useEffect(() => {
    restSetCountRef.current = null;
    resetRestTimer();
  }, [resetRestTimer, sessionId]);

  useEffect(() => {
    if (activeSession && activeSession.id === sessionId) {
      setSessionSnapshot(activeSession);
    }
  }, [activeSession, sessionId]);

  useEffect(() => {
    if (!session || session.id !== sessionId) {
      restSetCountRef.current = null;
      return;
    }

    if (restSetCountRef.current === null) {
      restSetCountRef.current = totalStrengthSets;
      return;
    }

    if (!isSessionCompleted && totalStrengthSets > restSetCountRef.current) {
      console.info('frontend.rest_timer.auto_start', {
        sessionId: session.id,
        totalStrengthSets
      });
      startRestTimer();
    }

    restSetCountRef.current = totalStrengthSets;
  }, [
    isSessionCompleted,
    session,
    sessionId,
    startRestTimer,
    totalStrengthSets
  ]);

  useEffect(() => {
    if (isSessionCompleted) {
      resetRestTimer();
    }
  }, [isSessionCompleted, resetRestTimer]);

  useEffect(() => {
    let isMounted = true;

    if (!sessionId) {
      setIsSessionLoading(false);
      setSessionLoadError('We couldn’t find this workout session.');
      return () => {
        isMounted = false;
      };
    }

    if (session && session.id === sessionId) {
      setIsSessionLoading(false);
      setSessionLoadError(null);
      return () => {
        isMounted = false;
      };
    }

    setIsSessionLoading(true);
    setSessionLoadError(null);

    const fetchSession = async () => {
      try {
        const fetched = await workoutService.getSession(sessionId);
        if (!isMounted) {
          return;
        }
        setActiveSession(fetched);
        setSessionSnapshot(fetched);
        setIsSessionLoading(false);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setSessionLoadError(
          mapSessionLoadError(error as ApiErrorResponse | undefined)
        );
        setIsSessionLoading(false);
      }
    };

    void fetchSession();

    return () => {
      isMounted = false;
    };
  }, [session, sessionId, setActiveSession]);

  const handleUpdatedSession = useCallback(
    (updated: WorkoutSession) => {
      setActiveSession(updated);
      setSessionSnapshot(updated);
      setCompletedSession((current) =>
        current && current.id === updated.id ? updated : current
      );
    },
    [setActiveSession, setSessionSnapshot]
  );

  const {
    startTimeInput,
    endTimeInput,
    setStartTimeInput,
    setEndTimeInput,
    saveChanges,
    isSaving,
    errorMessage: editorError,
    wasSaved,
    loggedExercises: loggedExerciseDrafts,
    updateLoggedExerciseNotes,
    addStrengthSet,
    updateStrengthSet,
    removeStrengthSet,
    updateCardioEntry,
    clearCardioEntry
  } = useWorkoutEditor({ session, onUpdated: handleUpdatedSession });

  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercises((previous) => {
      if (previous.some((item) => item.id === exercise.id)) {
        return previous;
      }

      return [...previous, exercise];
    });
    setIsModalOpen(false);
  };

  const handleSessionCompleted = useCallback(
    (completed: WorkoutSession) => {
      const nextSession: WorkoutSession = {
        ...completed,
        loggedExercises: session?.loggedExercises ?? completed.loggedExercises
      };
      setCompletedSession(nextSession);
      setSessionSnapshot(nextSession);
      resetRestTimer();
    },
    [resetRestTimer, session?.loggedExercises, setSessionSnapshot]
  );

  const handleOpenCreateCustomExercise = useCallback(() => {
    setIsModalOpen(false);
    setIsCreateCustomModalOpen(true);
  }, []);

  const handleCloseCreateCustomExercise = useCallback(() => {
    setIsCreateCustomModalOpen(false);
    setIsModalOpen(true);
  }, []);

  const handleCustomExerciseCreated = useCallback(
    async (exercise: Exercise) => {
      setSelectedExercises((previous) => {
        if (previous.some((item) => item.id === exercise.id)) {
          return previous;
        }

        return [...previous, exercise];
      });

      setIsCreateCustomModalOpen(false);
      setIsModalOpen(false);

      await fetchExercises(searchQuery ? searchQuery : undefined);
    },
    [fetchExercises, searchQuery]
  );

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDeleteError(null);
  }, []);

  const handleDeleteConfirmed = useCallback(async () => {
    if (!session) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      console.info('frontend.workout.delete.request', { sessionId: session.id });
      await workoutService.deleteWorkout(session.id);
      console.info('frontend.workout.delete.success', { sessionId: session.id });
      clearActiveSession();
      setSessionSnapshot(null);
      resetRestTimer();
      setIsDeleteModalOpen(false);
      router.push('/dashboard');
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      console.error('frontend.workout.delete.failure', {
        sessionId: session.id,
        message: apiError.message ?? 'WORKOUT_DELETE_FAILED'
      });
      setDeleteError(apiError.message ?? 'WORKOUT_DELETE_FAILED');
    } finally {
      setIsDeleting(false);
    }
  }, [clearActiveSession, router, session, setSessionSnapshot]);

  const handleRestStart = useCallback(() => {
    if (!session) {
      return;
    }

    console.info('frontend.rest_timer.start', { sessionId: session.id });
    startRestTimer();
  }, [session, startRestTimer]);

  const resolveExerciseDetails = useCallback(
    (draft: LoggedExerciseDraft): Exercise => {
      const entity = session.loggedExercises?.find(
        (item) => item.id === draft.id
      );

      if (entity?.exercise) {
        return entity.exercise;
      }

      const createdAt =
        entity?.exercise?.createdAt ?? entity?.createdAt ?? session.createdAt;
      const updatedAt =
        entity?.exercise?.updatedAt ?? entity?.updatedAt ?? session.updatedAt;

      return {
        id: draft.exerciseId,
        name: entity?.exercise?.name ?? 'Exercise',
        type: draft.type,
        createdById: entity?.exercise?.createdById ?? null,
        createdAt,
        updatedAt
      } satisfies Exercise;
    },
    [session]
  );

  const handleRestPause = useCallback(() => {
    if (!session) {
      return;
    }

    pauseRestTimer();
    console.info('frontend.rest_timer.pause', { sessionId: session.id });
  }, [pauseRestTimer, session]);

  const handleRestResume = useCallback(() => {
    if (!session) {
      return;
    }

    resumeRestTimer();
    console.info('frontend.rest_timer.resume', { sessionId: session.id });
  }, [resumeRestTimer, session]);

  const handleRestSkip = useCallback(() => {
    if (!session) {
      return;
    }

    skipRestTimer();
    console.info('frontend.rest_timer.skip', { sessionId: session.id });
  }, [session, skipRestTimer]);

  const handleRestFinish = useCallback(() => {
    if (!session) {
      return;
    }

    console.info('frontend.rest_timer.finish', { sessionId: session.id });
  }, [session]);

  if (isSessionLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">Workout session</h1>
        <p className="mt-4 text-gray-600">Loading workout session…</p>
      </div>
    );
  }

  if (sessionLoadError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12" role="alert">
        <h1 className="text-2xl font-semibold text-gray-900">Workout session</h1>
        <p className="mt-4 text-gray-600">{sessionLoadError}</p>
      </div>
    );
  }

  if (!session || session.id !== sessionId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">Workout session</h1>
        <p className="mt-4 text-gray-600">
          We couldn’t find an active workout for this session. Start a new workout
          from the dashboard to begin tracking your exercises.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="flex flex-col gap-2 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Workout session
        </h1>
        <p className="text-sm text-gray-600">
          Started on {new Date(session.startTime).toLocaleString()}
        </p>
        {!isSessionCompleted ? (
          <div>
            <Button onClick={() => setIsModalOpen(true)}>Add Exercise</Button>
          </div>
        ) : null}
      </header>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Session details</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col text-sm font-medium text-gray-700">
              Start time
              <input
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                type="datetime-local"
                value={startTimeInput}
                onChange={(event) => setStartTimeInput(event.target.value)}
              />
            </label>
            <label className="flex flex-col text-sm font-medium text-gray-700">
              End time (optional)
              <input
                className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                type="datetime-local"
                value={endTimeInput}
                onChange={(event) => setEndTimeInput(event.target.value)}
              />
            </label>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={() => {
                void saveChanges();
              }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving…' : 'Save Changes'}
            </Button>
            {editorError ? (
              <p className="text-sm text-red-600">{editorError}</p>
            ) : null}
            {wasSaved ? (
              <p className="text-sm text-green-600">Changes saved.</p>
            ) : null}
          </div>
        </div>
        {!isSessionCompleted ? (
          <RestTimer
            timeLeft={restTimeLeft}
            isRunning={isRestRunning}
            isPaused={isRestPaused}
            isFinished={isRestFinished}
            onStart={handleRestStart}
            onPause={handleRestPause}
            onResume={handleRestResume}
            onSkip={handleRestSkip}
            onFinish={handleRestFinish}
          />
        ) : null}
      </section>

      <section className="mt-6 space-y-3">
        {isSessionCompleted ? (
          loggedExerciseDrafts.length === 0 ? (
            <p className="rounded-md bg-gray-50 p-4 text-sm text-gray-600">
              This workout does not include any exercises. Add exercises to the
              session before saving your changes.
            </p>
          ) : (
            <div className="space-y-4">
              {loggedExerciseDrafts.map((draft) => {
                const exerciseForEditor = resolveExerciseDetails(draft);

                return (
                  <LoggedExerciseEditor
                    key={draft.clientId}
                    exercise={exerciseForEditor}
                    draft={draft}
                    onNotesChange={(notes) =>
                      updateLoggedExerciseNotes(draft.clientId, notes)
                    }
                    onAddStrengthSet={() => addStrengthSet(draft.clientId)}
                    onChangeStrengthSet={(setId, updates) =>
                      updateStrengthSet(draft.clientId, setId, updates)
                    }
                    onRemoveStrengthSet={(setId) =>
                      removeStrengthSet(draft.clientId, setId)
                    }
                    onUpdateCardioEntry={(updates) =>
                      updateCardioEntry(draft.clientId, updates)
                    }
                    onClearCardioEntry={() =>
                      clearCardioEntry(draft.clientId)
                    }
                    disabled={isSaving}
                  />
                );
              })}
            </div>
          )
        ) : (
          <>
            {(session.loggedExercises?.length ?? 0) === 0 &&
            selectedExercises.length === 0 ? (
              <p className="rounded-md bg-gray-50 p-4 text-sm text-gray-600">
                No exercises have been added yet. Use the Add Exercise button to
                select one from the library.
              </p>
            ) : null}

            {session.loggedExercises && session.loggedExercises.length > 0 ? (
              <ul className="space-y-4">
                {session.loggedExercises.map((loggedExercise: LoggedExercise) => {
                  const exerciseForCard: Exercise =
                    loggedExercise.exercise ??
                    ({
                      id: loggedExercise.exerciseId,
                      name: 'Exercise',
                      type: loggedExercise.cardioEntry ? 'CARDIO' : 'STRENGTH',
                      createdAt: loggedExercise.createdAt,
                      updatedAt: loggedExercise.updatedAt,
                      createdById: null
                    } as Exercise);

                  return (
                    <li key={loggedExercise.id}>
                      <ExerciseCard
                        exercise={exerciseForCard}
                        loggedExercise={loggedExercise}
                      />
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {selectedExercises.length > 0 &&
            (session.loggedExercises?.length ?? 0) === 0 ? (
              <ul className="space-y-3">
                {selectedExercises.map((exercise) => (
                  <li
                    className="rounded-md border border-gray-200 bg-white p-4 shadow-sm"
                    key={exercise.id}
                  >
                    <p className="text-base font-semibold text-gray-900">
                      {exercise.name}
                    </p>
                    <p className="text-sm text-gray-500">{exercise.type}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </section>

      {!isSessionCompleted ? (
        <ExerciseLibraryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectExercise={handleSelectExercise}
          exercises={exercises}
          isLoading={isLoading}
          onSearch={setSearchQuery}
          errorMessage={error ?? undefined}
          currentSearchQuery={searchQuery}
          onOpenCreateCustomExercise={handleOpenCreateCustomExercise}
        />
      ) : null}

      <WorkoutSummary session={session} />

      <FinishWorkoutButton
        sessionId={session.id}
        onCompleted={handleSessionCompleted}
      />

      <div className="mt-8">
        <Button
          type="button"
          className="bg-red-600 hover:bg-red-500 focus:ring-red-500"
          onClick={() => {
            setDeleteError(null);
            setIsDeleteModalOpen(true);
          }}
        >
          Delete Workout
        </Button>
      </div>

      <CreateCustomExerciseModal
        isOpen={isCreateCustomModalOpen}
        onClose={handleCloseCreateCustomExercise}
        onCreated={handleCustomExerciseCreated}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirmed}
        title="Delete workout?"
        message="Deleting this workout will remove all logged exercises and sets. This action cannot be undone."
        confirmButtonText="Delete workout"
        cancelButtonText="Cancel"
        isConfirming={isDeleting}
        errorMessage={deleteError}
        workoutId={session.id}
      />
    </div>
  );
}
