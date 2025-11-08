import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegisterForm } from './RegisterForm';
import { authService } from '../../services/auth.service';

jest.mock('../../services/auth.service');

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('submits valid form data and redirects to login', async () => {
    (authService.register as jest.Mock).mockResolvedValueOnce(undefined);
    render(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'password123'
    );

    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123'
      });
      expect(pushMock).toHaveBeenCalledWith('/login');
    });
  });

  it('shows error for invalid email', async () => {
    render(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'password123'
    );

    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText('Please enter a valid email address.')
    ).toBeInTheDocument();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('shows error for password shorter than 8 characters', async () => {
    render(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'short');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'short'
    );

    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText('Password must be at least 8 characters long.')
    ).toBeInTheDocument();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('shows error when passwords do not match', async () => {
    render(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'different123'
    );

    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText('Passwords do not match.')
    ).toBeInTheDocument();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('shows conflict message when backend returns account exists', async () => {
    (authService.register as jest.Mock).mockRejectedValueOnce({
      statusCode: 409,
      message: 'ACCOUNT_EXISTS'
    });

    render(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'password123'
    );

    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText('An account with this email already exists.')
    ).toBeInTheDocument();
  });

  it('shows network error when request fails to reach server', async () => {
    (authService.register as jest.Mock).mockRejectedValueOnce({
      statusCode: 500,
      message: 'NETWORK_ERROR'
    });

    render(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'password123'
    );

    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText('Cannot connect to server. Please try again.')
    ).toBeInTheDocument();
  });
});
