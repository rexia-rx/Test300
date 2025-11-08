import type {
  CardioEntry,
  StrengthSet,
  WorkoutSession
} from '@myfitness2/shared-types';

import axiosInstance from '../lib/axios';
import type { ApiErrorResponse } from './auth.service';
import { workoutService } from './workout.service';

jest.mock('axios');

describe('workoutService', () => {
  const mockSession: WorkoutSession = {
    id: 'session-1',
    userId: 'user-1',
    startTime: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    endTime: null,
    createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-01-01T10:00:00.000Z').toISOString()
  };

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('returns the workout session when the request succeeds', async () => {
    jest.spyOn(axiosInstance, 'post').mockResolvedValueOnce({
      data: mockSession
    });

    const result = await workoutService.startSession();

    expect(axiosInstance.post).toHaveBeenCalledWith('/workouts', {});
    expect(result).toEqual(mockSession);
  });

  it('throws the API error response when available', async () => {
    const errorResponse: ApiErrorResponse = {
      statusCode: 400,
      message: 'INVALID_INPUT'
    };

    jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: errorResponse,
        status: 400
      }
    });

    await expect(workoutService.startSession()).rejects.toEqual(
      errorResponse
    );
  });

  it('maps network errors when response is not available', async () => {
    jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
      isAxiosError: true,
      response: undefined
    });

    await expect(workoutService.startSession()).rejects.toEqual({
      statusCode: 500,
      message: 'NETWORK_ERROR'
    });
  });

  it('maps non-axios errors to network errors', async () => {
    jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce(new Error('boom'));

    await expect(workoutService.startSession()).rejects.toEqual({
      statusCode: 500,
      message: 'NETWORK_ERROR'
    });
  });

  describe('logStrengthSet', () => {
    const strengthSet: StrengthSet = {
      id: 'set-1',
      loggedExerciseId: 'le-1',
      setNumber: 1,
      reps: 10,
      weight: 60,
      createdAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
    };

    it('returns the created strength set on success', async () => {
      jest.spyOn(axiosInstance, 'post').mockResolvedValueOnce({
        data: strengthSet
      });

      const result = await workoutService.logStrengthSet(
        'session-1',
        'le-1',
        { reps: 10, weight: 60 }
      );

      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/workouts/session-1/logged-exercises/le-1/sets',
        { reps: 10, weight: 60 }
      );
      expect(result).toEqual(strengthSet);
    });

    it('throws API error when backend returns error', async () => {
      const errorResponse: ApiErrorResponse = {
        statusCode: 400,
        message: 'INVALID_STRENGTH_SET'
      };

      jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          data: errorResponse,
          status: 400
        }
      });

      await expect(
        workoutService.logStrengthSet('session-1', 'le-1', {
          reps: 10,
          weight: 60
        })
      ).rejects.toEqual(errorResponse);
    });

    it('maps network errors for logStrengthSet', async () => {
      jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
        isAxiosError: true,
        response: undefined
      });

      await expect(
        workoutService.logStrengthSet('session-1', 'le-1', {
          reps: 10,
          weight: 60
        })
      ).rejects.toEqual({
        statusCode: 500,
        message: 'NETWORK_ERROR'
      });
    });
  });

  describe('logCardioEntry', () => {
    const cardioEntry: CardioEntry = {
      id: 'cardio-1',
      loggedExerciseId: 'le-1',
      durationSeconds: 600,
      distanceMeters: 5000,
      createdAt: new Date('2024-01-02T11:00:00.000Z').toISOString()
    };

    it('returns the created cardio entry on success', async () => {
      jest.spyOn(axiosInstance, 'post').mockResolvedValueOnce({
        data: cardioEntry
      });

      const result = await workoutService.logCardioEntry(
        'session-1',
        'le-1',
        { durationSeconds: 600, distanceMeters: 5000 }
      );

      expect(axiosInstance.post).toHaveBeenCalledWith(
        '/workouts/session-1/logged-exercises/le-1/cardio',
        { durationSeconds: 600, distanceMeters: 5000 }
      );
      expect(result).toEqual(cardioEntry);
    });

    it('throws API error when backend returns error', async () => {
      const errorResponse: ApiErrorResponse = {
        statusCode: 409,
        message: 'CARDIO_ENTRY_ALREADY_EXISTS'
      };

      jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          data: errorResponse,
          status: 409
        }
      });

      await expect(
        workoutService.logCardioEntry('session-1', 'le-1', {
          durationSeconds: 600,
          distanceMeters: 5000
        })
      ).rejects.toEqual(errorResponse);
    });

    it('maps network errors for logCardioEntry', async () => {
      jest.spyOn(axiosInstance, 'post').mockRejectedValueOnce({
        isAxiosError: true,
        response: undefined
      });

      await expect(
        workoutService.logCardioEntry('session-1', 'le-1', {
          durationSeconds: 600
        })
      ).rejects.toEqual({
        statusCode: 500,
        message: 'NETWORK_ERROR'
      });
    });
  });
});
