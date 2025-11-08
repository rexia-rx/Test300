import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProfilePage from './page';
import { profileService } from '../../../services/profile.service';
import { useProfileStore } from '../../../store/profile.store';

jest.mock('../../../services/profile.service');
jest.mock('../../../store/profile.store');

const mockProfile = {
  id: 'user-1',
  email: 'user@example.com',
  displayName: 'Test User',
  preferredUnits: 'METRIC'
};

describe('ProfilePage', () => {
  const setProfile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useProfileStore as jest.Mock).mockReturnValue({
      profile: null,
      setProfile
    });
  });

  it('fetches and renders the user profile', async () => {
    (profileService.getProfile as jest.Mock).mockResolvedValueOnce(mockProfile);

    render(<ProfilePage />);

    expect(
      await screen.findByLabelText(/display name/i)
    ).toHaveValue('Test User');
    await waitFor(() => {
      expect(profileService.getProfile).toHaveBeenCalled();
      expect(setProfile).toHaveBeenCalledWith(mockProfile);
    });
  });

  it('shows an error message when profile loading fails', async () => {
    (profileService.getProfile as jest.Mock).mockRejectedValueOnce({
      statusCode: 401,
      message: 'UNAUTHORIZED'
    });

    render(<ProfilePage />);

    expect(
      await screen.findByText('Your session has expired. Please log in again.')
    ).toBeInTheDocument();
  });

  it('updates the profile successfully', async () => {
    (useProfileStore as jest.Mock).mockReturnValue({
      profile: mockProfile,
      setProfile
    });
    (profileService.updateProfile as jest.Mock).mockResolvedValueOnce({
      ...mockProfile,
      displayName: 'Updated User'
    });

    render(<ProfilePage />);

    await userEvent.clear(screen.getByLabelText(/display name/i));
    await userEvent.type(screen.getByLabelText(/display name/i), 'Updated User');
    await userEvent.selectOptions(
      screen.getByLabelText(/preferred units/i),
      'IMPERIAL'
    );
    await userEvent.click(screen.getByRole('button', { name: /save changes/i }));

    await waitFor(() => {
      expect(profileService.updateProfile).toHaveBeenCalledWith({
        displayName: 'Updated User',
        preferredUnits: 'IMPERIAL'
      });
      expect(setProfile).toHaveBeenCalledWith({
        ...mockProfile,
        displayName: 'Updated User'
      });
      expect(
        screen.getByText('Profile updated successfully.')
      ).toBeInTheDocument();
    });
  });

  it('shows an error message when profile update fails', async () => {
    (useProfileStore as jest.Mock).mockReturnValue({
      profile: mockProfile,
      setProfile
    });
    (profileService.updateProfile as jest.Mock).mockRejectedValueOnce({
      statusCode: 400,
      message: 'INVALID_INPUT'
    });

    render(<ProfilePage />);

    await userEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(
      await screen.findByText('Please check your details and try again.')
    ).toBeInTheDocument();
  });
});
