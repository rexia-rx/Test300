'use client';

import { useCallback } from 'react';
import type { ChangeEvent } from 'react';

import type { Exercise } from '@myfitness2/shared-types';

import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Modal } from '../common/Modal';
import { TextInput } from '../common/TextInput';
import { ExerciseCard } from './ExerciseCard';

interface ExerciseLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: Exercise) => void;
  exercises: Exercise[];
  isLoading: boolean;
  onSearch: (query: string) => void;
  errorMessage?: string;
  currentSearchQuery: string;
  onOpenCreateCustomExercise?: () => void;
}

export function ExerciseLibraryModal({
  isOpen,
  onClose,
  onSelectExercise,
  exercises,
  isLoading,
  onSearch,
  errorMessage,
  currentSearchQuery,
  onOpenCreateCustomExercise
}: ExerciseLibraryModalProps): JSX.Element | null {
  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    },
    [onSearch]
  );

  const handleSelect = useCallback(
    (exercise: Exercise) => {
      onSelectExercise(exercise);
    },
    [onSelectExercise]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Exercise">
      <div className="flex flex-col gap-4" role="region" aria-label="Exercise search results">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TextInput
            label="Search exercises"
            placeholder="Search by name"
            value={currentSearchQuery}
            onChange={handleSearchChange}
            autoFocus
          />
          {onOpenCreateCustomExercise ? (
            <Button
              type="button"
              className="bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200"
              onClick={onOpenCreateCustomExercise}
            >
              Create custom exercise
            </Button>
          ) : null}
        </div>

        {isLoading ? (
          <div className="py-12">
            <LoadingSpinner label="Loading exercises…" />
          </div>
        ) : errorMessage ? (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
            {errorMessage}
          </p>
        ) : exercises.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            {currentSearchQuery
              ? `No exercises found for "${currentSearchQuery}".`
              : 'No exercises available yet.'}
          </p>
        ) : (
          <div className="flex max-h-96 flex-col gap-3 overflow-y-auto" data-testid="exercise-list">
            {exercises.map((exercise) => (
              <ExerciseCard
                exercise={exercise}
                key={exercise.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
