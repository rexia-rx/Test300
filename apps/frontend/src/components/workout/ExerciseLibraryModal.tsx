'use client';

import { useCallback } from 'react';
import type { ChangeEvent } from 'react';

import type { Exercise } from '@myfitness2/shared-types';

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
}

export function ExerciseLibraryModal({
  isOpen,
  onClose,
  onSelectExercise,
  exercises,
  isLoading,
  onSearch,
  errorMessage,
  currentSearchQuery
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
        <TextInput
          label="Search exercises"
          placeholder="Search by name"
          value={currentSearchQuery}
          onChange={handleSearchChange}
          autoFocus
        />

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
