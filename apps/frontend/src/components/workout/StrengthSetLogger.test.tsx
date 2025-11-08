import { fireEvent, render, screen } from '@testing-library/react';

import type { StrengthSetDraft } from '../../hooks/useWorkoutEditor';
import { StrengthSetLogger } from './StrengthSetLogger';

describe('StrengthSetLogger', () => {
  const baseSet: StrengthSetDraft = {
    clientId: 'set-1',
    id: 'set-1',
    setNumber: 1,
    reps: 8,
    weight: 80
  };

  it('renders sets and handles updates', () => {
    const onAddSet = jest.fn();
    const onChangeSet = jest.fn();
    const onRemoveSet = jest.fn();

    render(
      <StrengthSetLogger
        sets={[baseSet]}
        onAddSet={onAddSet}
        onChangeSet={onChangeSet}
        onRemoveSet={onRemoveSet}
      />
    );

    fireEvent.change(screen.getByLabelText(/set number/i), {
      target: { value: '2' }
    });

    expect(onChangeSet).toHaveBeenCalledWith('set-1', { setNumber: 2 });

    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemoveSet).toHaveBeenCalledWith('set-1');

    fireEvent.click(screen.getByRole('button', { name: /add set/i }));
    expect(onAddSet).toHaveBeenCalled();
  });
});
