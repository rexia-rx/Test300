'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import type { Exercise, LoggedExercise } from '@myfitness2/shared-types';

import { Button } from '../../../../components/common/Button';
import { ExerciseLibraryModal } from '../../../../components/workout/ExerciseLibraryModal';
import { ExerciseCard } from '../../../../components/workout/ExerciseCard';
import { useExerciseSearch } from '../../../../hooks/useExerciseSearch';
import { useWorkoutStore } from '../../../../store/workout.store';

export default function WorkoutSessionPage(): JSX.Element {
  const params = useParams<{ id: string }>();
  const sessionId = useMemo(() => params?.id?.toString() ?? '', [params]);
  const { activeSession } = useWorkoutStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const { searchQuery, setSearchQuery, exercises, isLoading, error } =
    useExerciseSearch();

  const handleSelectExercise = (exercise: Exercise) => {
    setSelectedExercises((previous) => {
      if (previous.some((item) => item.id === exercise.id)) {
        return previous;
      }

      return [...previous, exercise];
    });
    setIsModalOpen(false);
  };

  if (!activeSession || activeSession.id !== sessionId) {
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
          Started on {new Date(activeSession.startTime).toLocaleString()}
        </p>
        <div>
          <Button onClick={() => setIsModalOpen(true)}>Add Exercise</Button>
        </div>
      </header>

      <section className="mt-6 space-y-3">
        {(activeSession.loggedExercises?.length ?? 0) === 0 &&
        selectedExercises.length === 0 ? (
          <p className="rounded-md bg-gray-50 p-4 text-sm text-gray-600">
            No exercises have been added yet. Use the Add Exercise button to
            select one from the library.
          </p>
        ) : null}

        {activeSession.loggedExercises &&
        activeSession.loggedExercises.length > 0 ? (
          <ul className="space-y-4">
            {activeSession.loggedExercises.map((loggedExercise: LoggedExercise) => {
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
        (activeSession.loggedExercises?.length ?? 0) === 0 ? (
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
      </section>

      <ExerciseLibraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectExercise={handleSelectExercise}
        exercises={exercises}
        isLoading={isLoading}
        onSearch={setSearchQuery}
        errorMessage={error ?? undefined}
        currentSearchQuery={searchQuery}
      />
    </div>
  );
}
