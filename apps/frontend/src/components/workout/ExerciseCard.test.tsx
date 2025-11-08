import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type {
  Exercise,
  LoggedExercise,
  StrengthSet
} from '@myfitness2/shared-types';

import { ExerciseCard } from './ExerciseCard';
import { workoutService } from '../../services/workout.service';
import { useWorkoutStore } from '../../store/workout.store';

jest.mock('../../services/workout.service');
jest.mock('../../store/workout.store');

const exercise: Exercise = {
  id: 'exercise-1',
  name: 'Bench Press',
  type: 'STRENGTH',
  createdById: null,
  createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  updatedAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
};

describe('ExerciseCard', () => {
  const appendStrengthSet = jest.fn();
  const upsertCardioEntry = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    appendStrengthSet.mockReset();
    upsertCardioEntry.mockReset();
    (useWorkoutStore as jest.Mock).mockReturnValue({
      appendStrengthSet,
      upsertCardioEntry
    });
  });

  it('renders exercise details and triggers onSelect', async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();

    render(<ExerciseCard exercise={exercise} onSelect={onSelect} />);

    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Strength')).toBeInTheDocument();

    await user.click(screen.getByTestId('exercise-card-exercise-1'));

    expect(onSelect).toHaveBeenCalledWith(exercise);
  });

  it('does not call onSelect when disabled', async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();

    render(<ExerciseCard exercise={exercise} onSelect={onSelect} disabled />);

    await user.click(screen.getByTestId('exercise-card-exercise-1'));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('logs a new strength set when inputs are valid', async () => {
    const user = userEvent.setup();
    const strengthSet: StrengthSet = {
      id: 'set-1',
      loggedExerciseId: 'le-1',
      setNumber: 1,
      reps: 8,
      weight: 60,
      createdAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
    };

    const loggedExercise: LoggedExercise = {
      id: 'le-1',
      sessionId: 'session-1',
      exerciseId: 'exercise-1',
      notes: null,
      createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      exercise,
      strengthSets: [],
      cardioEntry: null
    };

    (workoutService.logStrengthSet as jest.Mock).mockResolvedValueOnce(
      strengthSet
    );

    render(
      <ExerciseCard exercise={exercise} loggedExercise={loggedExercise} />
    );

    await user.type(screen.getByLabelText(/reps/i), '8');
    await user.type(screen.getByLabelText(/weight/i), '60');
    await user.click(screen.getByRole('button', { name: /add set/i }));

    expect(workoutService.logStrengthSet).toHaveBeenCalledWith(
      'session-1',
      'le-1',
      { reps: 8, weight: 60 }
    );
    expect(appendStrengthSet).toHaveBeenCalledWith('le-1', strengthSet);
  });

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();
    const loggedExercise: LoggedExercise = {
      id: 'le-1',
      sessionId: 'session-1',
      exerciseId: 'exercise-1',
      notes: null,
      createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      exercise,
      strengthSets: [],
      cardioEntry: null
    };

    render(
      <ExerciseCard exercise={exercise} loggedExercise={loggedExercise} />
    );

    await user.type(screen.getByLabelText(/reps/i), '-1');
    await user.type(screen.getByLabelText(/weight/i), 'abc');
    await user.click(screen.getByRole('button', { name: /add set/i }));

    expect(screen.getByText(/reps must be/i)).toBeInTheDocument();
    expect(screen.getByText(/weight must be/i)).toBeInTheDocument();
    expect(workoutService.logStrengthSet).not.toHaveBeenCalled();
  });

  it('displays API errors returned from the service', async () => {
    const user = userEvent.setup();
    const loggedExercise: LoggedExercise = {
      id: 'le-1',
      sessionId: 'session-1',
      exerciseId: 'exercise-1',
      notes: null,
      createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      exercise,
      strengthSets: [],
      cardioEntry: null
    };

    (workoutService.logStrengthSet as jest.Mock).mockRejectedValueOnce({
      message: 'INVALID_STRENGTH_SET'
    });

    render(
      <ExerciseCard exercise={exercise} loggedExercise={loggedExercise} />
    );

    await user.type(screen.getByLabelText(/reps/i), '8');
    await user.type(screen.getByLabelText(/weight/i), '60');
    await user.click(screen.getByRole('button', { name: /add set/i }));

    expect(
      await screen.findByTestId('exercise-card-error')
    ).toHaveTextContent('INVALID_STRENGTH_SET');
  });

  it('renders cardio entry form for cardio exercises', () => {
    const cardioExercise: Exercise = {
      ...exercise,
      id: 'exercise-cardio',
      name: 'Rowing',
      type: 'CARDIO'
    };

    const loggedExercise: LoggedExercise = {
      id: 'le-2',
      sessionId: 'session-1',
      exerciseId: 'exercise-cardio',
      notes: null,
      createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      exercise: cardioExercise,
      strengthSets: [],
      cardioEntry: null
    };

    render(
      <ExerciseCard exercise={cardioExercise} loggedExercise={loggedExercise} />
    );

    expect(
      screen.getByTestId(`cardio-entry-${loggedExercise.id}`)
    ).toBeInTheDocument();
  });
});
