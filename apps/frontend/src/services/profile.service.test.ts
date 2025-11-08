import type {
  UpdateProfilePayload,
  UserProfile
} from '@myfitness2/shared-types';

import axiosInstance from '../lib/axios';
import type { ApiErrorResponse } from './auth.service';
import { profileService } from './profile.service';

jest.mock('axios');

describe('profileService', () => {
  const profile: UserProfile = {
    id: 'user-1',
    email: 'user@example.com',
    displayName: 'Test User',
    preferredUnits: 'METRIC'
  };

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('getProfile', () => {
    it('returns the profile when the request succeeds', async () => {
      jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce({ data: profile });

      const result = await profileService.getProfile();

      expect(axiosInstance.get).toHaveBeenCalledWith('/profile');
      expect(result).toEqual(profile);
    });

    it('throws the API error response when available', async () => {
      const errorResponse: ApiErrorResponse = {
        statusCode: 401,
        message: 'UNAUTHORIZED'
      };

      jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          data: errorResponse,
          status: 401
        }
      });

      await expect(profileService.getProfile()).rejects.toEqual(errorResponse);
    });

    it('maps network errors when response is missing', async () => {
      jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce({
        isAxiosError: true,
        response: undefined
      });

      await expect(profileService.getProfile()).rejects.toEqual({
        statusCode: 500,
        message: 'NETWORK_ERROR'
      });
    });

    it('maps non-axios errors to network errors', async () => {
      jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce(new Error('boom'));

      await expect(profileService.getProfile()).rejects.toEqual({
        statusCode: 500,
        message: 'NETWORK_ERROR'
      });
    });
  });

  describe('updateProfile', () => {
    const payload: UpdateProfilePayload = {
      displayName: 'Updated User',
      preferredUnits: 'IMPERIAL'
    };

    it('returns the updated profile on success', async () => {
      jest.spyOn(axiosInstance, 'put').mockResolvedValueOnce({ data: profile });

      const result = await profileService.updateProfile(payload);

      expect(axiosInstance.put).toHaveBeenCalledWith('/profile', payload);
      expect(result).toEqual(profile);
    });

    it('throws the API error response when update fails', async () => {
      const errorResponse: ApiErrorResponse = {
        statusCode: 400,
        message: 'INVALID_INPUT'
      };

      jest.spyOn(axiosInstance, 'put').mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          data: errorResponse,
          status: 400
        }
      });

      await expect(profileService.updateProfile(payload)).rejects.toEqual(
        errorResponse
      );
    });

    it('maps network errors when response missing for update', async () => {
      jest.spyOn(axiosInstance, 'put').mockRejectedValueOnce({
        isAxiosError: true,
        response: undefined
      });

      await expect(profileService.updateProfile(payload)).rejects.toEqual({
        statusCode: 500,
        message: 'NETWORK_ERROR'
      });
    });

    it('maps non-axios errors to network errors for update', async () => {
      jest.spyOn(axiosInstance, 'put').mockRejectedValueOnce(new Error('boom'));

      await expect(profileService.updateProfile(payload)).rejects.toEqual({
        statusCode: 500,
        message: 'NETWORK_ERROR'
      });
    });
  });
});
