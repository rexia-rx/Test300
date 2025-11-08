import { act, renderHook } from '@testing-library/react';

import type { WorkoutSession } from '@myfitness2/shared-types';

import { workoutService } from '../services/workout.service';
import { useWorkoutEditor } from './useWorkoutEditor';

jest.mock('../services/workout.service');

describe('useWorkoutEditor', () => {
  const baseSession: WorkoutSession = {
    id: 'session-1',
    userId: 'user-1',
    startTime: new Date('2024-04-01T10:00:00.000Z').toISOString(),
    endTime: null,
    createdAt: new Date('2024-04-01T09:50:00.000Z').toISOString(),
    updatedAt: new Date('2024-04-01T09:50:00.000Z').toISOString(),
    loggedExercises: []
  };

  let infoSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    infoSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('submits updates and triggers callback', async () => {
    const updatedSession = {
      ...baseSession,
      startTime: new Date('2024-04-01T11:00:00.000Z').toISOString()
    } satisfies WorkoutSession;

    (workoutService.updateSession as jest.Mock).mockResolvedValueOnce(
      updatedSession
    );

    const onUpdated = jest.fn();
    const { result } = renderHook(() =>
      useWorkoutEditor({ session: baseSession, onUpdated })
    );

    act(() => {
      result.current.setStartTimeInput('2024-04-01T11:00');
    });

    await act(async () => {
      await result.current.saveChanges();
    });

    expect(workoutService.updateSession).toHaveBeenCalledWith(
      'session-1',
      expect.objectContaining({ startTime: updatedSession.startTime })
    );
    expect(onUpdated).toHaveBeenCalledWith(updatedSession);
    expect(result.current.wasSaved).toBe(true);
    expect(result.current.errorMessage).toBeNull();
  });

  it('prevents submission when end time precedes start time', async () => {
    const { result } = renderHook(() =>
      useWorkoutEditor({ session: baseSession })
    );

    act(() => {
      result.current.setStartTimeInput('2024-04-01T12:00');
      result.current.setEndTimeInput('2024-04-01T11:00');
    });

    await act(async () => {
      await result.current.saveChanges();
    });

    expect(workoutService.updateSession).not.toHaveBeenCalled();
    expect(result.current.errorMessage).toBe('START_AFTER_END');
    expect(result.current.wasSaved).toBe(false);
  });

  it('skips calling the API when no fields have changed', async () => {
    const { result } = renderHook(() =>
      useWorkoutEditor({ session: baseSession })
    );

    await act(async () => {
      await result.current.saveChanges();
    });

    expect(workoutService.updateSession).not.toHaveBeenCalled();
    expect(result.current.wasSaved).toBe(true);
    expect(result.current.errorMessage).toBeNull();
    expect(infoSpy).toHaveBeenCalledWith(
      'frontend.workout.edit.noop',
      expect.objectContaining({ sessionId: 'session-1' })
    );
  });

  it('tracks edits to logged exercises and submits updated payload', async () => {
    const sessionWithExercises: WorkoutSession = {
      ...baseSession,
      loggedExercises: [
        {
          id: 'logged-strength',
          sessionId: 'session-1',
          exerciseId: 'exercise-1',
          notes: 'Initial notes',
          createdAt: baseSession.createdAt,
          updatedAt: baseSession.updatedAt,
          exercise: {
            id: 'exercise-1',
            name: 'Bench Press',
            type: 'STRENGTH',
            createdAt: baseSession.createdAt,
            updatedAt: baseSession.updatedAt,
            createdById: null
          },
          strengthSets: [
            {
              id: 'set-1',
              loggedExerciseId: 'logged-strength',
              setNumber: 1,
              reps: 8,
              weight: 80,
              createdAt: baseSession.createdAt
            }
          ],
          cardioEntry: null
        }
      ]
    };

    (workoutService.updateSession as jest.Mock).mockResolvedValueOnce(
      sessionWithExercises
    );

    const { result } = renderHook(() =>
      useWorkoutEditor({ session: sessionWithExercises })
    );

    const draft = result.current.loggedExercises[0];

    act(() => {
      result.current.updateLoggedExerciseNotes(draft.clientId, 'Updated notes');
      result.current.updateStrengthSet(draft.clientId, 'set-1', { reps: 10 });
      result.current.addStrengthSet(draft.clientId);
    });

    await act(async () => {
      await result.current.saveChanges();
    });

    expect(workoutService.updateSession).toHaveBeenCalledWith(
      'session-1',
      expect.objectContaining({
        loggedExercises: expect.arrayContaining([
          expect.objectContaining({
            notes: 'Updated notes',
            strengthSets: expect.arrayContaining([
              expect.objectContaining({ id: 'set-1', reps: 10 })
            ])
          })
        ])
      })
    );
  });

  it('includes newly created strength sets when saving changes', async () => {
    const sessionWithStrength: WorkoutSession = {
      ...baseSession,
      loggedExercises: [
        {
          id: 'logged-strength',
          sessionId: 'session-1',
          exerciseId: 'exercise-1',
          notes: null,
          createdAt: baseSession.createdAt,
          updatedAt: baseSession.updatedAt,
          exercise: {
            id: 'exercise-1',
            name: 'Bench Press',
            type: 'STRENGTH',
            createdAt: baseSession.createdAt,
            updatedAt: baseSession.updatedAt,
            createdById: null
          },
          strengthSets: [
            {
              id: 'set-1',
              loggedExerciseId: 'logged-strength',
              setNumber: 1,
              reps: 8,
              weight: 80,
              createdAt: baseSession.createdAt
            }
          ],
          cardioEntry: null
        }
      ]
    };

    (workoutService.updateSession as jest.Mock).mockResolvedValueOnce(
      sessionWithStrength
    );

    const { result } = renderHook(() =>
      useWorkoutEditor({ session: sessionWithStrength })
    );

    const draft = result.current.loggedExercises[0];
    let newSetClientId: string | undefined;

    act(() => {
      result.current.addStrengthSet(draft.clientId);
    });

    newSetClientId = result.current.loggedExercises[0].strengthSets?.find(
      (set) => set.clientId !== 'set-1'
    )?.clientId;

    expect(newSetClientId).toBeDefined();

    act(() => {
      result.current.updateStrengthSet(draft.clientId, newSetClientId as string, {
        reps: 12,
        weight: 60
      });
    });

    await act(async () => {
      await result.current.saveChanges();
    });

    expect(workoutService.updateSession).toHaveBeenCalledWith(
      'session-1',
      expect.objectContaining({
        loggedExercises: expect.arrayContaining([
          expect.objectContaining({
            strengthSets: expect.arrayContaining([
              expect.objectContaining({
                id: undefined,
                reps: 12,
                weight: 60
              })
            ])
          })
        ])
      })
    );
  });

  it('supports updating and clearing cardio entries', () => {
    const sessionWithCardio: WorkoutSession = {
      ...baseSession,
      loggedExercises: [
        {
          id: 'logged-cardio',
          sessionId: 'session-1',
          exerciseId: 'exercise-2',
          notes: null,
          createdAt: baseSession.createdAt,
          updatedAt: baseSession.updatedAt,
          exercise: {
            id: 'exercise-2',
            name: 'Running',
            type: 'CARDIO',
            createdAt: baseSession.createdAt,
            updatedAt: baseSession.updatedAt,
            createdById: null
          },
          strengthSets: [],
          cardioEntry: {
            id: 'cardio-entry',
            loggedExerciseId: 'logged-cardio',
            durationSeconds: 300,
            distanceMeters: 1500,
            createdAt: baseSession.createdAt
          }
        }
      ]
    };

    const { result } = renderHook(() =>
      useWorkoutEditor({ session: sessionWithCardio })
    );

    const draft = result.current.loggedExercises[0];

    act(() => {
      result.current.updateCardioEntry(draft.clientId, { durationSeconds: 600 });
      result.current.updateCardioEntry(draft.clientId, { distanceMeters: undefined });
      result.current.clearCardioEntry(draft.clientId);
    });

    expect(result.current.loggedExercises[0].cardioEntry).toBeUndefined();
  });
});
