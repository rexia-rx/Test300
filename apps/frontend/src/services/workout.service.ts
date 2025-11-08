import axios, { AxiosError } from 'axios';

import type {
  CardioEntry,
  CreateCardioEntryPayload,
  CreateStrengthSetPayload,
  CreateWorkoutSessionPayload,
  StrengthSet,
  UpdateWorkoutPayload,
  WorkoutSession
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

export const workoutService = {
  async startSession(
    payload: CreateWorkoutSessionPayload = {}
  ): Promise<WorkoutSession> {
    try {
      const response = await axiosInstance.post<WorkoutSession>(
        '/workouts',
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
  },

  async getSession(sessionId: string): Promise<WorkoutSession> {
    try {
      const response = await axiosInstance.get<WorkoutSession>(
        `/workouts/${sessionId}`
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
  },

  async logStrengthSet(
    workoutId: string,
    loggedExerciseId: string,
    payload: CreateStrengthSetPayload
  ): Promise<StrengthSet> {
    try {
      const response = await axiosInstance.post<StrengthSet>(
        `/workouts/${workoutId}/logged-exercises/${loggedExerciseId}/sets`,
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
  },

  async logCardioEntry(
    workoutId: string,
    loggedExerciseId: string,
    payload: CreateCardioEntryPayload
  ): Promise<CardioEntry> {
    try {
      const response = await axiosInstance.post<CardioEntry>(
        `/workouts/${workoutId}/logged-exercises/${loggedExerciseId}/cardio`,
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
  },

  async completeSession(sessionId: string): Promise<WorkoutSession> {
    try {
      const response = await axiosInstance.put<WorkoutSession>(
        `/workouts/${sessionId}/complete`
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
  },

  async updateSession(
    sessionId: string,
    payload: UpdateWorkoutPayload
  ): Promise<WorkoutSession> {
    try {
      const response = await axiosInstance.put<WorkoutSession>(
        `/workouts/${sessionId}`,
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
  },

  async deleteWorkout(sessionId: string): Promise<void> {
    try {
      await axiosInstance.delete(`/workouts/${sessionId}`);
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
