import axios, { AxiosError } from 'axios';

import axiosInstance from '../lib/axios';

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const authService = {
  async register(data: RegisterRequest): Promise<void> {
    try {
      await axiosInstance.post('/auth/register', data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response?.data) {
          throw axiosError.response.data;
        }
        throw {
          statusCode: axiosError.response?.status ?? 500,
          message: 'NETWORK_ERROR'
        };
      }

      throw {
        statusCode: 500,
        message: 'NETWORK_ERROR'
      };
    }
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        '/auth/login',
        data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response?.data) {
          throw axiosError.response.data;
        }
        throw {
          statusCode: axiosError.response?.status ?? 500,
          message: 'NETWORK_ERROR'
        };
      }

      throw {
        statusCode: 500,
        message: 'NETWORK_ERROR'
      };
    }
  }
};
