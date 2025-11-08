import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm, type LoginFormValues } from './LoginForm';

describe('LoginForm', () => {
  const setup = (props?: Partial<Parameters<typeof LoginForm>[0]>) => {
    const onSubmit = jest.fn();
    render(
      <LoginForm
        onSubmit={onSubmit}
        isSubmitting={props?.isSubmitting}
        errorMessage={props?.errorMessage ?? null}
      />
    );
    return { onSubmit };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onSubmit with form values when validation passes', async () => {
    const { onSubmit } = setup();

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123'
      } satisfies LoginFormValues);
    });
  });

  it('shows error when email is invalid', async () => {
    const { onSubmit } = setup();

    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(
      await screen.findByText('Please enter a valid email address.')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows error when password is shorter than 8 characters', async () => {
    const { onSubmit } = setup();

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'short');

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(
      await screen.findByText('Password must be at least 8 characters long.')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables the submit button when submitting', async () => {
    setup({ isSubmitting: true });

    const button = screen.getByRole('button', { name: /logging in/i });
    expect(button).toBeDisabled();
  });

  it('renders an error message passed via props', () => {
    setup({ errorMessage: 'Invalid credentials.' });

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid credentials.');
  });
});
