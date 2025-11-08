'use client';

import { useCallback, useEffect, useState } from 'react';

import type { Exercise } from '@myfitness2/shared-types';

import type { ApiErrorResponse } from '../services/auth.service';
import { exercisesService } from '../services/exercises.service';
import { useDebounce } from './useDebounce';

export interface UseExerciseSearchResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  exercises: Exercise[];
  isLoading: boolean;
  error: string | null;
  fetchExercises: (query?: string) => Promise<void>;
}

export function useExerciseSearch(
  debounceDelay = 500
): UseExerciseSearchResult {
  const [searchQuery, setSearchQuery] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(searchQuery, debounceDelay);

  const fetchExercises = useCallback(
    async (query?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await exercisesService.getExercises(query);
        setExercises(results);
      } catch (caughtError) {
        const apiError = caughtError as ApiErrorResponse | undefined;
        setError(apiError?.message ?? 'FAILED_TO_LOAD_EXERCISES');
        setExercises([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void fetchExercises(debouncedQuery || undefined);
  }, [debouncedQuery, fetchExercises]);

  return {
    searchQuery,
    setSearchQuery,
    exercises,
    isLoading,
    error,
    fetchExercises
  };
}
