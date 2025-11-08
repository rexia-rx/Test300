import type { Exercise } from '@myfitness2/shared-types';

import axiosInstance from '../lib/axios';
import type { ApiErrorResponse } from './auth.service';
import { exercisesService } from './exercises.service';

jest.mock('axios');

describe('exercisesService', () => {
  const mockExercises: Exercise[] = [
    {
      id: 'exercise-1',
      name: 'Bench Press',
      type: 'STRENGTH',
      createdById: null,
      createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
      updatedAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
    }
  ];

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('returns exercises when the request succeeds', async () => {
    jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
      data: mockExercises
    });

    const result = await exercisesService.getExercises();

    expect(axiosInstance.get).toHaveBeenCalledWith('/exercises', {
      params: undefined
    });
    expect(result).toEqual(mockExercises);
  });

  it('passes the search query as a parameter', async () => {
    jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
      data: mockExercises
    });

    await exercisesService.getExercises('press');

    expect(axiosInstance.get).toHaveBeenCalledWith('/exercises', {
      params: { search: 'press' }
    });
  });

  it('throws API error responses when available', async () => {
    const errorResponse: ApiErrorResponse = {
      statusCode: 400,
      message: 'INVALID_QUERY'
    };

    jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: errorResponse,
        status: 400
      }
    });

    await expect(exercisesService.getExercises()).rejects.toEqual(
      errorResponse
    );
  });

  it('maps network errors when the response is unavailable', async () => {
    jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce({
      isAxiosError: true,
      response: undefined
    });

    await expect(exercisesService.getExercises()).rejects.toEqual({
      statusCode: 500,
      message: 'NETWORK_ERROR'
    });
  });

  it('maps non-axios errors to network errors', async () => {
    jest.spyOn(axiosInstance, 'get').mockRejectedValueOnce(new Error('boom'));

    await expect(exercisesService.getExercises()).rejects.toEqual({
      statusCode: 500,
      message: 'NETWORK_ERROR'
    });
  });
});
