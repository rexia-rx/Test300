import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type {
  Exercise,
  LoggedExercise,
  WorkoutSession
} from '@myfitness2/shared-types';

import WorkoutSessionPage from './page';
import { useExerciseSearch } from '../../../../hooks/useExerciseSearch';
import type { RestTimerControl } from '../../../../hooks/useRestTimer';
import { useRestTimer } from '../../../../hooks/useRestTimer';
import { useWorkoutStore } from '../../../../store/workout.store';
import { workoutService } from '../../../../services/workout.service';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'session-1' }),
  useRouter: () => ({ push: pushMock })
}));

jest.mock('../../../../store/workout.store');
jest.mock('../../../../hooks/useExerciseSearch');
jest.mock('../../../../hooks/useRestTimer');
jest.mock('../../../../services/workout.service', () => ({
  workoutService: {
    getSession: jest.fn(),
    completeSession: jest.fn(),
    updateSession: jest.fn(),
    deleteWorkout: jest.fn()
  }
}));
jest.mock('../../../../components/workout/ExerciseCard', () => ({
  ExerciseCard: ({ loggedExercise }: { loggedExercise: LoggedExercise }) => (
    <div data-testid="logged-exercise-card">{loggedExercise.id}</div>
  )
}));

jest.mock('../../../../components/workout/ExerciseLibraryModal', () => ({
  ExerciseLibraryModal: ({
    isOpen,
    onClose,
    onSelectExercise,
    exercises,
    onOpenCreateCustomExercise
  }: {
    isOpen: boolean;
    onClose: () => void;
    onSelectExercise: (exercise: Exercise) => void;
    exercises: Exercise[];
    onOpenCreateCustomExercise?: () => void;
  }) =>
    isOpen ? (
      <div>
        <button onClick={() => onSelectExercise(exercises[0])}>
          Select exercise
        </button>
        {onOpenCreateCustomExercise ? (
          <button onClick={onOpenCreateCustomExercise}>
            Create custom exercise
          </button>
        ) : null}
        <button onClick={onClose}>Close modal</button>
      </div>
    ) : null
}));

const customExercise: Exercise = {
  id: 'exercise-2',
  name: 'Custom Movement',
  type: 'CARDIO',
  createdById: 'user-1',
  createdAt: new Date('2024-01-05T10:00:00.000Z').toISOString(),
  updatedAt: new Date('2024-01-05T10:00:00.000Z').toISOString()
};

jest.mock('../../../../components/workout/CreateCustomExerciseModal', () => ({
  CreateCustomExerciseModal: ({
    isOpen,
    onClose,
    onCreated
  }: {
    isOpen: boolean;
    onClose: () => void;
    onCreated: (exercise: Exercise) => void;
  }) =>
    isOpen ? (
      <div>
        <button onClick={() => onCreated(customExercise)}>
          Confirm custom exercise
        </button>
        <button onClick={onClose}>Cancel custom exercise</button>
      </div>
    ) : null
}));

const exercise: Exercise = {
  id: 'exercise-1',
  name: 'Bench Press',
  type: 'STRENGTH',
  createdById: null,
  createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  updatedAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
};

const baseSession: WorkoutSession = {
  id: 'session-1',
  userId: 'user-1',
  startTime: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  endTime: null,
  createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  loggedExercises: []
};

describe('WorkoutSessionPage', () => {
  const getSessionMock = workoutService.getSession as unknown as jest.Mock;
  const completeSessionMock =
    workoutService.completeSession as unknown as jest.Mock;
  const updateSessionMock =
    workoutService.updateSession as unknown as jest.Mock;
  const deleteWorkoutMock =
    workoutService.deleteWorkout as unknown as jest.Mock;
  let storeValue: {
    activeSession: WorkoutSession | null;
    appendStrengthSet: jest.Mock;
    upsertCardioEntry: jest.Mock;
    clearActiveSession: jest.Mock;
    setActiveSession: jest.Mock;
  };

  let fetchExercisesMock: jest.Mock;
  let restTimerControls: RestTimerControl & {
    startTimer: jest.Mock;
    pauseTimer: jest.Mock;
    resumeTimer: jest.Mock;
    skipTimer: jest.Mock;
    resetTimer: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    pushMock.mockReset();
    getSessionMock.mockReset();
    completeSessionMock.mockReset();
    updateSessionMock.mockReset();
    deleteWorkoutMock.mockReset();

    fetchExercisesMock = jest.fn();

    (useExerciseSearch as jest.Mock).mockReturnValue({
      searchQuery: '',
      setSearchQuery: jest.fn(),
      exercises: [exercise],
      isLoading: false,
      error: null,
      fetchExercises: fetchExercisesMock
    });

    storeValue = {
      activeSession: null,
      appendStrengthSet: jest.fn(),
      upsertCardioEntry: jest.fn(),
      clearActiveSession: jest.fn(),
      setActiveSession: jest.fn()
    };

    (useWorkoutStore as jest.Mock).mockImplementation(() => storeValue);

    restTimerControls = {
      timeLeft: 60,
      isRunning: false,
      isPaused: false,
      isFinished: false,
      startTimer: jest.fn(),
      pauseTimer: jest.fn(),
      resumeTimer: jest.fn(),
      skipTimer: jest.fn(),
      resetTimer: jest.fn()
    };

    (useRestTimer as jest.Mock).mockReturnValue(restTimerControls);

    getSessionMock.mockResolvedValue(baseSession);
    completeSessionMock.mockResolvedValue({
      ...baseSession,
      endTime: new Date('2024-01-01T11:00:00.000Z').toISOString()
    });
    deleteWorkoutMock.mockResolvedValue(undefined);
  });

  it('shows loading state while fetching session', () => {
    getSessionMock.mockReturnValue(new Promise(() => {}));

    render(<WorkoutSessionPage />);

    expect(
      screen.getByText(/loading workout session/i)
    ).toBeInTheDocument();
  });

  it('fetches session when not present in store and updates state', async () => {
    render(<WorkoutSessionPage />);

    await waitFor(() => {
      expect(storeValue.setActiveSession).toHaveBeenCalledWith(baseSession);
    });

    expect(getSessionMock).toHaveBeenCalledWith('session-1');
    expect(await screen.findByText(/session details/i)).toBeInTheDocument();
  });

  it('renders error message when session cannot be loaded', async () => {
    getSessionMock.mockRejectedValueOnce({
      statusCode: 404,
      message: 'WORKOUT_NOT_FOUND'
    });

    render(<WorkoutSessionPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/we couldn’t find this workout session/i)
      ).toBeInTheDocument();
    });
  });

  it('saves updated session times when submitting', async () => {
    const updatedSession: WorkoutSession = {
      ...baseSession,
      startTime: new Date('2024-01-01T11:30:00.000Z').toISOString()
    };
    storeValue.activeSession = { ...baseSession };
    updateSessionMock.mockResolvedValueOnce(updatedSession);

    const user = userEvent.setup();
    render(<WorkoutSessionPage />);

    const startInput = screen.getByLabelText(/start time/i) as HTMLInputElement;
    await user.clear(startInput);
    await user.type(startInput, '2024-01-01T11:30');

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    expect(updateSessionMock).toHaveBeenCalledWith(
      'session-1',
      expect.objectContaining({ startTime: updatedSession.startTime })
    );
    expect(storeValue.setActiveSession).toHaveBeenCalledWith(updatedSession);
    expect(screen.getByText(/changes saved/i)).toBeInTheDocument();
  });

  it('shows validation error when times are invalid', async () => {
    storeValue.activeSession = { ...baseSession };

    const user = userEvent.setup();
    render(<WorkoutSessionPage />);

    const startInput = screen.getByLabelText(/start time/i) as HTMLInputElement;
    const endInput = screen.getByLabelText(/end time/i) as HTMLInputElement;

    await user.clear(startInput);
    await user.type(startInput, '2024-01-01T12:00');
    await user.type(endInput, '2024-01-01T11:00');

    await user.click(screen.getByRole('button', { name: /save changes/i }));

    expect(updateSessionMock).not.toHaveBeenCalled();
    expect(screen.getByText(/start_after_end/i)).toBeInTheDocument();
  });

  it('opens the exercise modal and adds selected exercise to the list', async () => {
    storeValue.activeSession = { ...baseSession };

    const user = userEvent.setup();
    render(<WorkoutSessionPage />);

    await user.click(screen.getByRole('button', { name: /add exercise/i }));

    await user.click(screen.getByRole('button', { name: /select exercise/i }));

    expect(screen.getByText('Bench Press')).toBeInTheDocument();
  });

  it('creates a custom exercise and appends it to the selection', async () => {
    storeValue.activeSession = { ...baseSession };

    const user = userEvent.setup();
    render(<WorkoutSessionPage />);

    await user.click(screen.getByRole('button', { name: /add exercise/i }));

    await user.click(
      screen.getByRole('button', { name: /create custom exercise/i })
    );

    await user.click(
      screen.getByRole('button', { name: /confirm custom exercise/i })
    );

    expect(screen.getByText('Custom Movement')).toBeInTheDocument();
    expect(fetchExercisesMock).toHaveBeenCalledWith(undefined);
  });

  it('renders logged exercises when they exist', () => {
    storeValue.activeSession = {
      ...baseSession,
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
    };

    render(<WorkoutSessionPage />);

    expect(screen.getByTestId('logged-exercise-card')).toHaveTextContent(
      'logged-1'
    );
  });

  it('shows workout summary when session is active', () => {
    storeValue.activeSession = { ...baseSession };

    render(<WorkoutSessionPage />);

    expect(
      screen.getByRole('heading', { name: /workout summary/i })
    ).toBeInTheDocument();
  });

  it('renders the rest timer when session is active', () => {
    storeValue.activeSession = { ...baseSession };

    render(<WorkoutSessionPage />);

    expect(screen.getByTestId('rest-timer')).toBeInTheDocument();
  });

  it('starts the rest timer when new strength sets are logged', async () => {
    storeValue.activeSession = { ...baseSession };

    const view = render(<WorkoutSessionPage />);

    expect(restTimerControls.startTimer).not.toHaveBeenCalled();

    storeValue.activeSession = {
      ...baseSession,
      loggedExercises: [
        {
          id: 'logged-1',
          sessionId: 'session-1',
          exerciseId: 'exercise-1',
          notes: null,
          createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
          updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
          exercise,
          strengthSets: [
            {
              id: 'set-1',
              loggedExerciseId: 'logged-1',
              setNumber: 1,
              reps: 8,
              weight: 80,
              createdAt: new Date('2024-01-01T10:05:00.000Z').toISOString()
            }
          ],
          cardioEntry: null
        }
      ]
    };

    view.rerender(<WorkoutSessionPage />);

    await waitFor(() => {
      expect(restTimerControls.startTimer).toHaveBeenCalled();
    });
  });

  it('hides the rest timer when the session is completed', () => {
    storeValue.activeSession = {
      ...baseSession,
      endTime: new Date('2024-01-01T11:00:00.000Z').toISOString()
    };

    render(<WorkoutSessionPage />);

    expect(screen.queryByTestId('rest-timer')).not.toBeInTheDocument();
  });

  it('completes the workout and navigates to dashboard', async () => {
    storeValue.activeSession = {
      ...baseSession,
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
    };

    const user = userEvent.setup();
    render(<WorkoutSessionPage />);

    await user.click(screen.getByRole('button', { name: /finish workout/i }));

    expect(completeSessionMock).toHaveBeenCalledWith('session-1');
    expect(storeValue.clearActiveSession).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/dashboard');
    expect(
      screen.getByText(/workout completed successfully/i)
    ).toBeInTheDocument();
  });

  it('displays an error message when completion fails', async () => {
    storeValue.activeSession = { ...baseSession };
    completeSessionMock.mockRejectedValueOnce({
      statusCode: 400,
      message: 'WORKOUT_ALREADY_COMPLETED'
    });

    const user = userEvent.setup();
    render(<WorkoutSessionPage />);

    await user.click(screen.getByRole('button', { name: /finish workout/i }));

    expect(
      screen.getByRole('alert')
    ).toHaveTextContent('WORKOUT_ALREADY_COMPLETED');
  });

  it('opens the delete modal and deletes the workout', async () => {
    storeValue.activeSession = { ...baseSession };
    const user = userEvent.setup();

    render(<WorkoutSessionPage />);

    await user.click(screen.getByRole('button', { name: /delete workout/i }));
    const modal = screen.getByRole('dialog');

    await user.click(
      within(modal).getByRole('button', { name: /delete workout/i })
    );

    await waitFor(() => {
      expect(deleteWorkoutMock).toHaveBeenCalledWith('session-1');
      expect(storeValue.clearActiveSession).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalledWith('/dashboard');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('displays deletion errors in the confirmation modal', async () => {
    storeValue.activeSession = { ...baseSession };
    deleteWorkoutMock.mockRejectedValueOnce({
      statusCode: 403,
      message: 'WORKOUT_ACCESS_FORBIDDEN'
    });

    const user = userEvent.setup();
    render(<WorkoutSessionPage />);

    await user.click(screen.getByRole('button', { name: /delete workout/i }));
    const modal = screen.getByRole('dialog');
    await user.click(
      within(modal).getByRole('button', { name: /delete workout/i })
    );

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent('WORKOUT_ACCESS_FORBIDDEN');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('allows cancelling the delete modal without calling the API', async () => {
    storeValue.activeSession = { ...baseSession };

    const user = userEvent.setup();
    render(<WorkoutSessionPage />);

    await user.click(screen.getByRole('button', { name: /delete workout/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(deleteWorkoutMock).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
