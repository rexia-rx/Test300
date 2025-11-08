import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Exercise } from '@myfitness2/shared-types';

import type { ApiErrorResponse } from '../../services/auth.service';
import { exercisesService } from '../../services/exercises.service';
import { CreateCustomExerciseModal } from './CreateCustomExerciseModal';

jest.mock('../../services/exercises.service');

const createCustomExerciseMock =
  exercisesService.createCustomExercise as jest.Mock;

const createdExercise: Exercise = {
  id: 'exercise-1',
  name: 'Custom Movement',
  type: 'STRENGTH',
  createdById: 'user-1',
  createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
  updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString()
};

describe('CreateCustomExerciseModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    createCustomExerciseMock.mockResolvedValue(createdExercise);
  });

  it('does not render when closed', () => {
    render(
      <CreateCustomExerciseModal
        isOpen={false}
        onClose={jest.fn()}
        onCreated={jest.fn()}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('validates that the exercise name is required', async () => {
    const user = userEvent.setup();

    render(
      <CreateCustomExerciseModal
        isOpen
        onClose={jest.fn()}
        onCreated={jest.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /save exercise/i }));

    expect(
      screen.getByText('Exercise name is required')
    ).toBeInTheDocument();
    expect(createCustomExerciseMock).not.toHaveBeenCalled();
  });

  it('submits the form and invokes onCreated on success', async () => {
    const user = userEvent.setup();
    const onCreated = jest.fn();

    render(
      <CreateCustomExerciseModal
        isOpen
        onClose={jest.fn()}
        onCreated={onCreated}
      />
    );

    await user.type(screen.getByLabelText('Exercise name'), 'Custom Movement');
    await user.click(screen.getByLabelText('Cardio'));
    await user.click(screen.getByRole('button', { name: /save exercise/i }));

    expect(createCustomExerciseMock).toHaveBeenCalledWith({
      name: 'Custom Movement',
      type: 'CARDIO'
    });
    expect(onCreated).toHaveBeenCalledWith(createdExercise);
  });

  it('displays API error messages when creation fails', async () => {
    const user = userEvent.setup();
    const apiError: ApiErrorResponse = {
      statusCode: 409,
      message: 'EXERCISE_NAME_CONFLICT'
    };

    createCustomExerciseMock.mockRejectedValueOnce(apiError);

    render(
      <CreateCustomExerciseModal
        isOpen
        onClose={jest.fn()}
        onCreated={jest.fn()}
      />
    );

    await user.type(screen.getByLabelText('Exercise name'), 'Custom Movement');
    await user.click(screen.getByRole('button', { name: /save exercise/i }));

    expect(
      screen.getByText('EXERCISE_NAME_CONFLICT')
    ).toBeInTheDocument();
  });
});
