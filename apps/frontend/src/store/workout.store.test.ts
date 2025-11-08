import { act, renderHook } from '@testing-library/react';

import type {
  CardioEntry,
  StrengthSet,
  WorkoutSession
} from '@myfitness2/shared-types';

import { __internal, useWorkoutStore } from './workout.store';

describe('useWorkoutStore', () => {
  const mockSession: WorkoutSession = {
    id: 'session-1',
    userId: 'user-1',
    startTime: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    endTime: null,
    createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    loggedExercises: [
      {
        id: 'le-1',
        sessionId: 'session-1',
        exerciseId: 'exercise-1',
        notes: null,
        createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
        updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
        exercise: undefined,
        strengthSets: [],
        cardioEntry: null
      }
    ]
  };

  beforeEach(() => {
    __internal.reset();
  });

  it('returns null active session by default', () => {
    const { result } = renderHook(() => useWorkoutStore());

    expect(result.current.activeSession).toBeNull();
  });

  it('stores the active session when setActiveSession is called', () => {
    const { result } = renderHook(() => useWorkoutStore());

    act(() => {
      result.current.setActiveSession(mockSession);
    });

    expect(result.current.activeSession).toEqual(mockSession);
  });

  it('clears the active session when clearActiveSession is called', () => {
    const { result } = renderHook(() => useWorkoutStore());

    act(() => {
      result.current.setActiveSession(mockSession);
    });

    act(() => {
      result.current.clearActiveSession();
    });

    expect(result.current.activeSession).toBeNull();
  });

  it('appends a strength set to the active session', () => {
    const newSet: StrengthSet = {
      id: 'set-1',
      loggedExerciseId: 'le-1',
      setNumber: 1,
      reps: 10,
      weight: 60,
      createdAt: new Date('2024-01-01T11:00:00.000Z').toISOString()
    };

    const { result } = renderHook(() => useWorkoutStore());

    act(() => {
      result.current.setActiveSession(mockSession);
    });

    act(() => {
      result.current.appendStrengthSet('le-1', newSet);
    });

    expect(result.current.activeSession?.loggedExercises?.[0].strengthSets).toEqual([
      newSet
    ]);
  });

  it('upserts a cardio entry for the active session', () => {
    const cardioEntry: CardioEntry = {
      id: 'cardio-1',
      loggedExerciseId: 'le-1',
      durationSeconds: 1800,
      distanceMeters: 5000,
      createdAt: new Date('2024-01-01T11:30:00.000Z').toISOString()
    };

    const { result } = renderHook(() => useWorkoutStore());

    act(() => {
      result.current.setActiveSession(mockSession);
    });

    act(() => {
      result.current.upsertCardioEntry('le-1', cardioEntry);
    });

    expect(result.current.activeSession?.loggedExercises?.[0].cardioEntry).toEqual(
      cardioEntry
    );
  });
});
