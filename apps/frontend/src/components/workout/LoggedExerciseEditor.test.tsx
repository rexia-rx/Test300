import { fireEvent, render, screen } from '@testing-library/react';

import type { Exercise } from '@myfitness2/shared-types';

import type { LoggedExerciseDraft } from '../../hooks/useWorkoutEditor';
import { LoggedExerciseEditor } from './LoggedExerciseEditor';

const strengthLoggerProps: unknown[] = [];
const cardioLoggerProps: unknown[] = [];

jest.mock('./StrengthSetLogger', () => ({
  StrengthSetLogger: (props: unknown) => {
    strengthLoggerProps.push(props);
    return <div data-testid="strength-logger" />;
  }
}));

jest.mock('./CardioEntryLogger', () => ({
  CardioEntryLogger: (props: unknown) => {
    cardioLoggerProps.push(props);
    return <div data-testid="cardio-logger" />;
  }
}));

describe('LoggedExerciseEditor', () => {
  const baseExercise: Exercise = {
    id: 'exercise-1',
    name: 'Bench Press',
    type: 'STRENGTH',
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z',
    createdById: null
  };

  beforeEach(() => {
    strengthLoggerProps.length = 0;
    cardioLoggerProps.length = 0;
  });

  it('renders strength logger when exercise is strength based', () => {
    const draft: LoggedExerciseDraft = {
      clientId: 'draft-1',
      id: 'draft-1',
      exerciseId: 'exercise-1',
      type: 'STRENGTH',
      notes: 'Example',
      strengthSets: [
        { clientId: 'set-1', id: 'set-1', setNumber: 1, reps: 8, weight: 80 }
      ]
    };

    render(
      <LoggedExerciseEditor
        exercise={baseExercise}
        draft={draft}
        onNotesChange={jest.fn()}
        onAddStrengthSet={jest.fn()}
        onChangeStrengthSet={jest.fn()}
        onRemoveStrengthSet={jest.fn()}
        onUpdateCardioEntry={jest.fn()}
        onClearCardioEntry={jest.fn()}
      />
    );

    expect(screen.getByTestId('strength-logger')).toBeInTheDocument();
    expect(strengthLoggerProps[0]).toEqual(
      expect.objectContaining({ sets: draft.strengthSets })
    );
  });

  it('renders cardio logger when exercise is cardio', () => {
    const cardioExercise: Exercise = { ...baseExercise, type: 'CARDIO' };
    const draft: LoggedExerciseDraft = {
      clientId: 'draft-2',
      id: 'draft-2',
      exerciseId: 'exercise-2',
      type: 'CARDIO',
      notes: null,
      cardioEntry: {
        clientId: 'cardio-1',
        id: 'cardio-1',
        durationSeconds: 300,
        distanceMeters: 1200
      }
    };

    render(
      <LoggedExerciseEditor
        exercise={cardioExercise}
        draft={draft}
        onNotesChange={jest.fn()}
        onAddStrengthSet={jest.fn()}
        onChangeStrengthSet={jest.fn()}
        onRemoveStrengthSet={jest.fn()}
        onUpdateCardioEntry={jest.fn()}
        onClearCardioEntry={jest.fn()}
      />
    );

    expect(screen.getByTestId('cardio-logger')).toBeInTheDocument();
    expect(cardioLoggerProps[0]).toEqual(
      expect.objectContaining({ entry: draft.cardioEntry })
    );
  });

  it('updates notes via callback', () => {
    const onNotesChange = jest.fn();
    const draft: LoggedExerciseDraft = {
      clientId: 'draft-3',
      id: 'draft-3',
      exerciseId: 'exercise-1',
      type: 'STRENGTH',
      notes: '',
      strengthSets: []
    };

    render(
      <LoggedExerciseEditor
        exercise={baseExercise}
        draft={draft}
        onNotesChange={onNotesChange}
        onAddStrengthSet={jest.fn()}
        onChangeStrengthSet={jest.fn()}
        onRemoveStrengthSet={jest.fn()}
        onUpdateCardioEntry={jest.fn()}
        onClearCardioEntry={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/notes/i), {
      target: { value: 'Great set' }
    });

    expect(onNotesChange).toHaveBeenCalledWith('Great set');
  });
});
