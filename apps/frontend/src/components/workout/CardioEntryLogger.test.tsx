import { fireEvent, render, screen } from '@testing-library/react';

import type { CardioEntryDraft } from '../../hooks/useWorkoutEditor';
import { CardioEntryLogger } from './CardioEntryLogger';

describe('CardioEntryLogger', () => {
  const baseEntry: CardioEntryDraft = {
    clientId: 'cardio-1',
    id: 'cardio-1',
    durationSeconds: 300,
    distanceMeters: 1500
  };

  it('notifies about changes and clear actions', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();

    render(
      <CardioEntryLogger entry={baseEntry} onChange={onChange} onClear={onClear} />
    );

    fireEvent.change(screen.getByLabelText(/duration/i), {
      target: { value: '450' }
    });
    expect(onChange).toHaveBeenCalledWith({ durationSeconds: 450 });

    fireEvent.change(screen.getByLabelText(/distance/i), {
      target: { value: '' }
    });
    expect(onChange).toHaveBeenCalledWith({ distanceMeters: undefined });

    fireEvent.click(screen.getByRole('button', { name: /clear cardio entry/i }));
    expect(onClear).toHaveBeenCalled();
  });
});
