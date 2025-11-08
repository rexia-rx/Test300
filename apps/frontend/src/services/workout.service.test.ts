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

  describe('getSession', () => {
    it('returns the workout session when request succeeds', async () => {
      jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
        data: mockSession
      });

      const result = await workoutService.getSession('session-1');

      expect(axiosInstance.get).toHaveBeenCalledWith('/workouts/session-1');
      expect(result).toEqual(mockSession);
    });

    it('throws the API error when backend responds with error', async () => {
      const errorResponse: ApiErrorResponse = {
        statusCode: 404,
        message: 'WORKOUT_NOT_FOUND'
      };

      jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          data: errorResponse,
          status: 404
        }
      });

      await expect(workoutService.getSession('session-1')).rejects.toEqual(
        errorResponse
      );
    });

    it('maps network errors when getSession request fails without response', async () => {
      jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce({
        isAxiosError: true,
        response: undefined
      });

      await expect(workoutService.getSession('session-1')).rejects.toEqual({
        statusCode: 500,
        message: 'NETWORK_ERROR'
      });
    });
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

  describe('completeSession', () => {
    it('returns the completed workout on success', async () => {
      const completedSession: WorkoutSession = {
        ...mockSession,
        endTime: new Date('2024-01-01T11:00:00.000Z').toISOString()
      };

      jest.spyOn(axiosInstance, 'put').mockResolvedValueOnce({
        data: completedSession
      });

      const result = await workoutService.completeSession('session-1');

      expect(axiosInstance.put).toHaveBeenCalledWith(
        '/workouts/session-1/complete'
      );
      expect(result).toEqual(completedSession);
    });

    it('throws API error for completeSession failures', async () => {
      const errorResponse: ApiErrorResponse = {
        statusCode: 400,
        message: 'WORKOUT_ALREADY_COMPLETED'
      };

      jest.spyOn(axiosInstance, 'put').mockRejectedValueOnce({
        isAxiosError: true,
        response: { data: errorResponse, status: 400 }
      });

      await expect(
        workoutService.completeSession('session-1')
      ).rejects.toEqual(errorResponse);
    });

    it('maps network errors when completing session', async () => {
      jest.spyOn(axiosInstance, 'put').mockRejectedValueOnce({
        isAxiosError: true,
        response: undefined
      });

      await expect(
        workoutService.completeSession('session-1')
      ).rejects.toEqual({ statusCode: 500, message: 'NETWORK_ERROR' });
    });
  });

  describe('updateSession', () => {
    const payload = { startTime: mockSession.startTime };

    it('returns updated session on success', async () => {
      jest.spyOn(axiosInstance, 'put').mockResolvedValueOnce({
        data: mockSession
      });

      const result = await workoutService.updateSession('session-1', payload);

      expect(axiosInstance.put).toHaveBeenCalledWith(
        '/workouts/session-1',
        payload
      );
      expect(result).toEqual(mockSession);
    });

    it('propagates API errors when update fails', async () => {
      const errorResponse: ApiErrorResponse = {
        statusCode: 400,
        message: 'INVALID_TIME_RANGE'
      };

      jest.spyOn(axiosInstance, 'put').mockRejectedValueOnce({
        isAxiosError: true,
        response: { data: errorResponse, status: 400 }
      });

      await expect(
        workoutService.updateSession('session-1', payload)
      ).rejects.toEqual(errorResponse);
    });
  });

  describe('deleteWorkout', () => {
    it('calls the delete endpoint successfully', async () => {
      jest.spyOn(axiosInstance, 'delete').mockResolvedValueOnce({ status: 204 });

      await workoutService.deleteWorkout('session-1');

      expect(axiosInstance.delete).toHaveBeenCalledWith('/workouts/session-1');
    });

    it('throws API error when backend returns error', async () => {
      const errorResponse: ApiErrorResponse = {
        statusCode: 403,
        message: 'WORKOUT_ACCESS_FORBIDDEN'
      };

      jest.spyOn(axiosInstance, 'delete').mockRejectedValueOnce({
        isAxiosError: true,
        response: { data: errorResponse, status: 403 }
      });

      await expect(
        workoutService.deleteWorkout('session-1')
      ).rejects.toEqual(errorResponse);
    });

    it('maps network errors when delete fails without response', async () => {
      jest.spyOn(axiosInstance, 'delete').mockRejectedValueOnce({
        isAxiosError: true,
        response: undefined
      });

      await expect(
        workoutService.deleteWorkout('session-1')
      ).rejects.toEqual({ statusCode: 500, message: 'NETWORK_ERROR' });
    });
  });
});
