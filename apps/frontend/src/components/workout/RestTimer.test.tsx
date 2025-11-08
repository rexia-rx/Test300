import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RestTimer } from './RestTimer';

describe('RestTimer', () => {
  const baseProps = {
    timeLeft: 60,
    isRunning: false,
    onStart: jest.fn(),
    onPause: jest.fn(),
    onResume: jest.fn(),
    onSkip: jest.fn(),
    onFinish: jest.fn()
  } satisfies Parameters<typeof RestTimer>[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders countdown and start action', () => {
    render(<RestTimer {...baseProps} />);

    expect(screen.getByTestId('rest-timer-display')).toHaveTextContent('01:00');
    expect(screen.getByRole('button', { name: /start rest/i })).toBeInTheDocument();
  });

  it('pauses an active timer', async () => {
    const user = userEvent.setup();
    const props = { ...baseProps, isRunning: true };

    render(<RestTimer {...props} />);

    await user.click(screen.getByRole('button', { name: /pause/i }));

    expect(props.onPause).toHaveBeenCalledTimes(1);
  });

  it('resumes a paused timer', async () => {
    const user = userEvent.setup();
    const props = { ...baseProps, timeLeft: 42, isRunning: false };

    render(<RestTimer {...props} />);

    await user.click(screen.getByRole('button', { name: /resume/i }));

    expect(props.onResume).toHaveBeenCalledTimes(1);
  });

  it('skips the current rest period', async () => {
    const user = userEvent.setup();

    render(<RestTimer {...baseProps} />);

    await user.click(screen.getByRole('button', { name: /skip/i }));

    expect(baseProps.onSkip).toHaveBeenCalledTimes(1);
  });

  it('invokes finish callback when timer reaches zero', () => {
    const props = { ...baseProps };
    const { rerender } = render(<RestTimer {...props} />);

    rerender(<RestTimer {...props} timeLeft={0} isRunning={false} isFinished />);

    expect(props.onFinish).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('rest-timer-finished')).toBeInTheDocument();
  });
});
