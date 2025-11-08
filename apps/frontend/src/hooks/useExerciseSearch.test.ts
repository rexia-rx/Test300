import { act, renderHook, waitFor } from '@testing-library/react';

import type { Exercise } from '@myfitness2/shared-types';

import { exercisesService } from '../services/exercises.service';
import { useExerciseSearch } from './useExerciseSearch';

jest.mock('../services/exercises.service');

describe('useExerciseSearch', () => {
  const mockExercises: Exercise[] = [
    {
      id: 'exercise-1',
      name: 'Bench Press',
      type: 'STRENGTH',
      createdById: null,
      createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
    }
  ];

  beforeEach(() => {
    jest.useFakeTimers();
    (exercisesService.getExercises as jest.Mock).mockResolvedValue(
      mockExercises
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('fetches exercises on mount', async () => {
    renderHook(() => useExerciseSearch(100));

    await waitFor(() => {
      expect(exercisesService.getExercises).toHaveBeenCalledWith(undefined);
    });
  });

  it('debounces search input before fetching', async () => {
    const { result } = renderHook(() => useExerciseSearch(200));

    act(() => {
      result.current.setSearchQuery('s');
      result.current.setSearchQuery('sq');
      result.current.setSearchQuery('squ');
    });

    act(() => {
      jest.advanceTimersByTime(199);
    });

    expect(exercisesService.getExercises).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(1);
    });

    await waitFor(() => {
      expect(exercisesService.getExercises).toHaveBeenCalledWith('squ');
    });
  });

  it('captures API errors and exposes them', async () => {
    (exercisesService.getExercises as jest.Mock).mockRejectedValueOnce({
      message: 'NETWORK_ERROR'
    });

    const { result } = renderHook(() => useExerciseSearch(100));

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('NETWORK_ERROR');
      expect(result.current.exercises).toEqual([]);
    });
  });

  it('provides a manual fetch function', async () => {
    const { result } = renderHook(() => useExerciseSearch(100));

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(exercisesService.getExercises).toHaveBeenCalledTimes(1);
    });

    (exercisesService.getExercises as jest.Mock).mockResolvedValueOnce([]);

    await act(async () => {
      await result.current.fetchExercises('press');
    });

    expect(exercisesService.getExercises).toHaveBeenLastCalledWith('press');
  });
});
