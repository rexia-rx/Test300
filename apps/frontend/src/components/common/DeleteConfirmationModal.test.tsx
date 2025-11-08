import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DeleteConfirmationModal } from './DeleteConfirmationModal';

describe('DeleteConfirmationModal', () => {
  const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

  afterEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  const baseProps = {
    isOpen: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Delete workout?',
    message: 'This action cannot be undone.',
    workoutId: 'session-1'
  } satisfies Parameters<typeof DeleteConfirmationModal>[0];

  it('does not render when closed', () => {
    const { container } = render(
      <DeleteConfirmationModal {...baseProps} isOpen={false} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders the provided title and message when open', () => {
    render(<DeleteConfirmationModal {...baseProps} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Delete workout?')).toBeInTheDocument();
    expect(
      screen.getByTestId('delete-confirmation-message')
    ).toHaveTextContent('This action cannot be undone.');
    expect(consoleSpy).toHaveBeenCalledWith(
      'ui_event_modal_delete_workout_shown',
      { workoutId: 'session-1' }
    );
  });

  it('invokes onConfirm and logs when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();

    render(<DeleteConfirmationModal {...baseProps} onConfirm={onConfirm} />);

    await user.click(screen.getByRole('button', { name: /delete/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      'ui_event_modal_delete_workout_confirmed',
      { workoutId: 'session-1' }
    );
  });

  it('invokes onClose and logs when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(<DeleteConfirmationModal {...baseProps} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      'ui_event_modal_delete_workout_cancelled',
      { workoutId: 'session-1' }
    );
  });

  it('shows error message when provided', () => {
    render(
      <DeleteConfirmationModal
        {...baseProps}
        errorMessage="WORKOUT_DELETE_FAILED"
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('WORKOUT_DELETE_FAILED');
  });
});
