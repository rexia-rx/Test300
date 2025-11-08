import { render, screen } from '@testing-library/react';

import type { WorkoutSession } from '@myfitness2/shared-types';

import { WorkoutSummary } from './WorkoutSummary';

const baseSession: WorkoutSession = {
  id: 'session-1',
  userId: 'user-1',
  startTime: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  endTime: null,
  createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  loggedExercises: []
};

describe('WorkoutSummary', () => {
  it('renders empty state when no exercises logged', () => {
    render(<WorkoutSummary session={baseSession} />);

    expect(
      screen.getByText(/no exercises logged yet/i)
    ).toBeInTheDocument();
  });

  it('renders strength sets and cardio data when present', () => {
    const session: WorkoutSession = {
      ...baseSession,
      endTime: new Date('2024-01-01T11:00:00.000Z').toISOString(),
      loggedExercises: [
        {
          id: 'le-1',
          sessionId: 'session-1',
          exerciseId: 'exercise-1',
          notes: 'Focus on form',
          createdAt: new Date('2024-01-01T10:10:00.000Z').toISOString(),
          updatedAt: new Date('2024-01-01T10:20:00.000Z').toISOString(),
          exercise: {
            id: 'exercise-1',
            name: 'Bench Press',
            type: 'STRENGTH',
            createdAt: new Date('2023-12-01T10:00:00.000Z').toISOString(),
            updatedAt: new Date('2023-12-01T10:00:00.000Z').toISOString(),
            createdById: null
          },
          strengthSets: [
            {
              id: 'set-1',
              loggedExerciseId: 'le-1',
              setNumber: 1,
              reps: 8,
              weight: 60,
              createdAt: new Date('2024-01-01T10:15:00.000Z').toISOString()
            }
          ],
          cardioEntry: null
        },
        {
          id: 'le-2',
          sessionId: 'session-1',
          exerciseId: 'exercise-2',
          notes: null,
          createdAt: new Date('2024-01-01T10:30:00.000Z').toISOString(),
          updatedAt: new Date('2024-01-01T10:45:00.000Z').toISOString(),
          exercise: {
            id: 'exercise-2',
            name: 'Treadmill',
            type: 'CARDIO',
            createdAt: new Date('2023-12-01T10:00:00.000Z').toISOString(),
            updatedAt: new Date('2023-12-01T10:00:00.000Z').toISOString(),
            createdById: null
          },
          strengthSets: [],
          cardioEntry: {
            id: 'cardio-1',
            loggedExerciseId: 'le-2',
            durationSeconds: 900,
            distanceMeters: 2400,
            createdAt: new Date('2024-01-01T10:45:00.000Z').toISOString()
          }
        }
      ]
    };

    render(<WorkoutSummary session={session} />);

    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText(/set 1: 8 reps @ 60 kg/i)).toBeInTheDocument();
    expect(screen.getByText('Treadmill')).toBeInTheDocument();
    expect(screen.getByText(/15 min/i)).toBeInTheDocument();
    expect(screen.getByText(/2.40 km/i)).toBeInTheDocument();
  });
});
