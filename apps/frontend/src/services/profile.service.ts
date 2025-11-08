import axios, { AxiosError } from 'axios';

import type {
  UpdateProfilePayload,
  UserProfile
} from '@myfitness2/shared-types';

import axiosInstance from '../lib/axios';
import type { ApiErrorResponse } from './auth.service';

const mapAxiosError = (
  error: AxiosError<ApiErrorResponse>
): ApiErrorResponse => {
  if (error.response?.data) {
    return error.response.data;
  }

  return {
    statusCode: error.response?.status ?? 500,
    message: 'NETWORK_ERROR'
  };
};

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await axiosInstance.get<UserProfile>('/profile');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        throw mapAxiosError(error as AxiosError<ApiErrorResponse>);
      }

      throw {
        statusCode: 500,
        message: 'NETWORK_ERROR'
      } satisfies ApiErrorResponse;
    }
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    try {
      const response = await axiosInstance.put<UserProfile>(
        '/profile',
        payload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        throw mapAxiosError(error as AxiosError<ApiErrorResponse>);
      }

      throw {
        statusCode: 500,
        message: 'NETWORK_ERROR'
      } satisfies ApiErrorResponse;
    }
  }
};
