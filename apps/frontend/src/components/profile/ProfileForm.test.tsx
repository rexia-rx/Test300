import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Units } from '@myfitness2/shared-types';

import { ProfileForm } from './ProfileForm';

describe('ProfileForm', () => {
  const baseProps = {
    initialValues: {
      displayName: 'Test User',
      preferredUnits: 'METRIC' as Units
    },
    email: 'user@example.com'
  };

  it('submits the form with trimmed values when validation passes', async () => {
    const onSubmit = jest.fn();
    render(
      <ProfileForm
        {...baseProps}
        onSubmit={onSubmit}
      />
    );

    await userEvent.clear(screen.getByLabelText(/display name/i));
    await userEvent.type(screen.getByLabelText(/display name/i), '  Updated User  ');
    await userEvent.selectOptions(
      screen.getByLabelText(/preferred units/i),
      'IMPERIAL'
    );

    await userEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        displayName: 'Updated User',
        preferredUnits: 'IMPERIAL'
      });
    });
  });

  it('shows an error message when the display name is empty', async () => {
    const onSubmit = jest.fn();
    render(
      <ProfileForm
        {...baseProps}
        onSubmit={onSubmit}
      />
    );

    await userEvent.clear(screen.getByLabelText(/display name/i));
    await userEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(
      await screen.findByText('Display name cannot be empty.')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables the submit button when submitting', () => {
    const onSubmit = jest.fn();
    render(
      <ProfileForm
        {...baseProps}
        onSubmit={onSubmit}
        isSubmitting
      />
    );

    expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled();
  });

  it('renders error and success messages', () => {
    const onSubmit = jest.fn();
    render(
      <ProfileForm
        {...baseProps}
        onSubmit={onSubmit}
        errorMessage="Update failed"
        successMessage="Saved successfully"
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Update failed');
    expect(screen.getByRole('status')).toHaveTextContent('Saved successfully');
  });
});
