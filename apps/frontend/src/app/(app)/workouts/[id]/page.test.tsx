import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Exercise, LoggedExercise } from '@myfitness2/shared-types';

import WorkoutSessionPage from './page';
import { useExerciseSearch } from '../../../../hooks/useExerciseSearch';
import { useWorkoutStore } from '../../../../store/workout.store';

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'session-1' })
}));

jest.mock('../../../../store/workout.store');
jest.mock('../../../../hooks/useExerciseSearch');
jest.mock('../../../../components/workout/ExerciseCard', () => ({
  ExerciseCard: ({ loggedExercise }: { loggedExercise: LoggedExercise }) => (
    <div data-testid="logged-exercise-card">{loggedExercise.id}</div>
  )
}));

const exercise: Exercise = {
  id: 'exercise-1',
  name: 'Bench Press',
  type: 'STRENGTH',
  createdById: null,
  createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  updatedAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
};

jest.mock('../../../../components/workout/ExerciseLibraryModal', () => ({
  ExerciseLibraryModal: ({
    isOpen,
    onClose,
    onSelectExercise,
    exercises
  }: {
    isOpen: boolean;
    onClose: () => void;
    onSelectExercise: (exercise: Exercise) => void;
    exercises: Exercise[];
  }) =>
    isOpen ? (
      <div>
        <button onClick={() => onSelectExercise(exercises[0])}>
          Select exercise
        </button>
        <button onClick={onClose}>Close modal</button>
      </div>
    ) : null
}));

describe('WorkoutSessionPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useExerciseSearch as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      exercises: [exercise],
      isLoading: false,
      error: null,
      fetchExercises: jest.fn()
    });

    (useWorkoutStore as jest.Mock).mockReturnValue({
      activeSession: null,
      appendStrengthSet: jest.fn()
    });
  });

  it('renders fallback when no active session present', () => {
    render(<WorkoutSessionPage />);

    expect(
      screen.getByText(
        /we couldn’t find an active workout for this session/i
      )
    ).toBeInTheDocument();
  });

  it('opens the exercise modal and adds selected exercise to the list', async () => {
    (useWorkoutStore as jest.Mock).mockReturnValue({
      activeSession: {
        id: 'session-1',
        userId: 'user-1',
        startTime: new Date('2024-01-01T10:00:00.000Z').toISOString(),
        endTime: null,
        createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
        updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
        loggedExercises: []
      },
      appendStrengthSet: jest.fn()
    });

    const user = userEvent.setup();
    render(<WorkoutSessionPage />);

    await user.click(screen.getByRole('button', { name: /add exercise/i }));

    await user.click(screen.getByRole('button', { name: /select exercise/i }));

    expect(screen.getByText('Bench Press')).toBeInTheDocument();
  });

  it('renders logged exercises when they exist', () => {
    (useWorkoutStore as jest.Mock).mockReturnValue({
      activeSession: {
        id: 'session-1',
        userId: 'user-1',
        startTime: new Date('2024-01-01T10:00:00.000Z').toISOString(),
        endTime: null,
        createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
        updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
        loggedExercises: [
          {
            id: 'logged-1',
            sessionId: 'session-1',
            exerciseId: 'exercise-1',
            notes: null,
            createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
            updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
            exercise,
            strengthSets: [],
            cardioEntry: null
          }
        ]
      },
      appendStrengthSet: jest.fn()
    });

    render(<WorkoutSessionPage />);

    expect(screen.getByTestId('logged-exercise-card')).toHaveTextContent(
      'logged-1'
    );
  });
});
