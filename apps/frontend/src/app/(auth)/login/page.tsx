'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import {
  LoginForm,
  type LoginFormValues
} from '../../../components/auth/LoginForm';
import {
  ApiErrorResponse,
  authService
} from '../../../services/auth.service';
import type { LoginResponse } from '../../../services/auth.service';
import { useAuthStore } from '../../../store/auth.store';

const mapLoginError = (error: ApiErrorResponse | undefined) => {
  if (!error) {
    return 'An unexpected error occurred. Please try again.';
  }

  if (error.message === 'INVALID_CREDENTIALS' || error.statusCode === 401) {
    return 'Invalid email or password.';
  }

  if (error.statusCode === 400 || error.message === 'INVALID_INPUT') {
    return 'Please check your input and try again.';
  }

  if (error.message === 'NETWORK_ERROR') {
    return 'Cannot connect to server. Please try again.';
  }

  return 'An unexpected error occurred. Please try again.';
};

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      setErrorMessage(null);
      setIsSubmitting(true);

      try {
        const response: LoginResponse = await authService.login(values);
        setAccessToken(response.accessToken);
        router.push('/dashboard');
      } catch (error) {
        const mappedError = mapLoginError(error as ApiErrorResponse | undefined);
        setErrorMessage(mappedError);
      } finally {
        setIsSubmitting(false);
      }
    },
    [router, setAccessToken]
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold text-gray-900">
        Log in to your account
      </h1>
      <p className="mb-8 text-gray-600">
        Welcome back! Enter your credentials to access your personalized dashboard.
      </p>

      <LoginForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />

      <p className="mt-6 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link className="text-indigo-600 hover:text-indigo-500" href="/register">
          Create one now
        </Link>
        .
      </p>
    </div>
  );
}
