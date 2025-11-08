import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginPage from './page';
import { authService } from '../../../services/auth.service';
import { useAuthStore } from '../../../store/auth.store';

jest.mock('../../../services/auth.service');

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

jest.mock('../../../store/auth.store');

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}));

describe('LoginPage', () => {
  const setAccessToken = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    (useAuthStore as jest.Mock).mockReturnValue({
      accessToken: null,
      isLoggedIn: false,
      setAccessToken,
      logout: jest.fn()
    });
  });

  it('submits valid credentials and redirects to the dashboard', async () => {
    (authService.login as jest.Mock).mockResolvedValueOnce({
      accessToken: 'token'
    });

    render(<LoginPage />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123'
      });
      expect(setAccessToken).toHaveBeenCalledWith('token');
      expect(pushMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('displays an error message when the service rejects with invalid credentials', async () => {
    (authService.login as jest.Mock).mockRejectedValueOnce({
      statusCode: 401,
      message: 'INVALID_CREDENTIALS'
    });

    render(<LoginPage />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(
      await screen.findByText('Invalid email or password.')
    ).toBeInTheDocument();
    expect(setAccessToken).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('shows a network error message when the request fails to reach the server', async () => {
    (authService.login as jest.Mock).mockRejectedValueOnce({
      statusCode: 500,
      message: 'NETWORK_ERROR'
    });

    render(<LoginPage />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(
      await screen.findByText('Cannot connect to server. Please try again.')
    ).toBeInTheDocument();
  });

  it('disables the submit button while the login request is in flight', async () => {
    let resolvePromise: (value: unknown) => void;
    (authService.login as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(<LoginPage />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    const button = screen.getByRole('button', { name: /log in/i });
    await userEvent.click(button);

    expect(button).toBeDisabled();

    resolvePromise?.({ accessToken: 'token' });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
