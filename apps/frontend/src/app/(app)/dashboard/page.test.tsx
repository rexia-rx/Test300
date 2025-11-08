import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DashboardPage from './page';
import { workoutService } from '../../../services/workout.service';
import { useWorkoutStore } from '../../../store/workout.store';

jest.mock('../../../services/workout.service');

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

jest.mock('../../../store/workout.store');

const setActiveSession = jest.fn();
const clearActiveSession = jest.fn();

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useWorkoutStore as jest.Mock).mockReturnValue({
      activeSession: null,
      setActiveSession,
      clearActiveSession
    });
  });

  it('starts a workout session and navigates to the session page', async () => {
    const session = {
      id: 'session-123',
      userId: 'user-1',
      startTime: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      endTime: null,
      createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString()
    };

    (workoutService.startSession as jest.Mock).mockResolvedValueOnce(session);

    render(<DashboardPage />);

    await userEvent.click(
      screen.getByRole('button', { name: /start workout/i })
    );

    await waitFor(() => {
      expect(clearActiveSession).toHaveBeenCalled();
      expect(workoutService.startSession).toHaveBeenCalledWith();
      expect(setActiveSession).toHaveBeenCalledWith(session);
      expect(pushMock).toHaveBeenCalledWith('/workouts/session-123');
    });
  });

  it('shows an error message when the request fails', async () => {
    (workoutService.startSession as jest.Mock).mockRejectedValueOnce({
      statusCode: 401,
      message: 'UNAUTHORIZED'
    });

    render(<DashboardPage />);

    await userEvent.click(
      screen.getByRole('button', { name: /start workout/i })
    );

    expect(
      await screen.findByText('Your session has expired. Please log in again.')
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('shows a network error message when the request cannot reach the server', async () => {
    (workoutService.startSession as jest.Mock).mockRejectedValueOnce({
      statusCode: 500,
      message: 'NETWORK_ERROR'
    });

    render(<DashboardPage />);

    await userEvent.click(
      screen.getByRole('button', { name: /start workout/i })
    );

    expect(
      await screen.findByText(
        'Unable to reach the server. Check your connection and try again.'
      )
    ).toBeInTheDocument();
  });

  it('disables the button while the request is in flight', async () => {
    let resolvePromise: (value: unknown) => void;
    (workoutService.startSession as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(<DashboardPage />);

    const button = screen.getByRole('button', { name: /start workout/i });
    await userEvent.click(button);

    expect(button).toBeDisabled();

    resolvePromise?.({
      id: 'session-123',
      userId: 'user-1',
      startTime: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      endTime: null,
      createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString()
    });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
