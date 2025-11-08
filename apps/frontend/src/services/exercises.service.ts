import axios, { AxiosError } from 'axios';

import type { Exercise } from '@myfitness2/shared-types';

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

export const exercisesService = {
  async getExercises(search?: string): Promise<Exercise[]> {
    try {
      const response = await axiosInstance.get<Exercise[]>('/exercises', {
        params: search ? { search } : undefined
      });

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
