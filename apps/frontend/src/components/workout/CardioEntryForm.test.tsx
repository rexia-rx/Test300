import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { LoggedExercise } from '@myfitness2/shared-types';

import { CardioEntryForm } from './CardioEntryForm';
import { workoutService } from '../../services/workout.service';
import { useWorkoutStore } from '../../store/workout.store';

jest.mock('../../services/workout.service');
jest.mock('../../store/workout.store');

describe('CardioEntryForm', () => {
  const upsertCardioEntry = jest.fn();

  const loggedExercise: LoggedExercise = {
    id: 'le-1',
    sessionId: 'session-1',
    exerciseId: 'exercise-1',
    notes: null,
    createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    exercise: undefined,
    strengthSets: [],
    cardioEntry: null
  };

  beforeEach(() => {
    jest.clearAllMocks();
    upsertCardioEntry.mockReset();
    (useWorkoutStore as jest.Mock).mockReturnValue({ upsertCardioEntry });
  });

  it('submits valid cardio entry data', async () => {
    const user = userEvent.setup();
    (workoutService.logCardioEntry as jest.Mock).mockResolvedValueOnce({
      id: 'cardio-1',
      loggedExerciseId: 'le-1',
      durationSeconds: 1200,
      distanceMeters: 5000,
      createdAt: new Date('2024-01-01T11:00:00.000Z').toISOString()
    });

    render(<CardioEntryForm loggedExercise={loggedExercise} />);

    await user.type(screen.getByLabelText(/duration/i), '1200');
    await user.type(screen.getByLabelText(/distance/i), '5000');
    await user.click(screen.getByRole('button', { name: /add cardio/i }));

    expect(workoutService.logCardioEntry).toHaveBeenCalledWith(
      'session-1',
      'le-1',
      { durationSeconds: 1200, distanceMeters: 5000 }
    );
    expect(upsertCardioEntry).toHaveBeenCalled();
  });

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();

    render(<CardioEntryForm loggedExercise={loggedExercise} />);

    await user.type(screen.getByLabelText(/duration/i), '-5');
    await user.type(screen.getByLabelText(/distance/i), 'abc');
    await user.click(screen.getByRole('button', { name: /add cardio/i }));

    expect(screen.getByText(/duration must/i)).toBeInTheDocument();
    expect(screen.getByText(/distance must/i)).toBeInTheDocument();
    expect(workoutService.logCardioEntry).not.toHaveBeenCalled();
  });

  it('requires at least one metric to submit', async () => {
    const user = userEvent.setup();

    render(<CardioEntryForm loggedExercise={loggedExercise} />);

    await user.click(screen.getByRole('button', { name: /add cardio/i }));

    expect(
      screen.getByTestId('cardio-form-error')
    ).toHaveTextContent(/provide at least duration or distance/i);
    expect(workoutService.logCardioEntry).not.toHaveBeenCalled();
  });

  it('displays API errors returned from the service', async () => {
    const user = userEvent.setup();
    (workoutService.logCardioEntry as jest.Mock).mockRejectedValueOnce({
      message: 'INVALID_CARDIO_ENTRY'
    });

    render(<CardioEntryForm loggedExercise={loggedExercise} />);

    await user.type(screen.getByLabelText(/duration/i), '1200');
    await user.click(screen.getByRole('button', { name: /add cardio/i }));

    expect(
      await screen.findByTestId('cardio-api-error')
    ).toHaveTextContent('INVALID_CARDIO_ENTRY');
  });

  it('disables inputs when cardio entry already exists', () => {
    const existingExercise: LoggedExercise = {
      ...loggedExercise,
      cardioEntry: {
        id: 'cardio-existing',
        loggedExerciseId: 'le-1',
        durationSeconds: 900,
        distanceMeters: null,
        createdAt: new Date('2024-01-01T10:30:00.000Z').toISOString()
      }
    };

    render(<CardioEntryForm loggedExercise={existingExercise} />);

    expect(screen.getByLabelText(/duration/i)).toHaveValue('900');
    expect(screen.getByRole('button', { name: /cardio logged/i })).toBeDisabled();
  });
});
