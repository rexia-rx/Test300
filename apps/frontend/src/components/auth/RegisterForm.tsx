'use client';

import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent
} from 'react';
import { useRouter } from 'next/navigation';

import { authService, ApiErrorResponse } from '../../services/auth.service';

type FormErrors = Partial<{
  email: string;
  password: string;
  confirmPassword: string;
}>;

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
};

const initialState: FormState = {
  email: '',
  password: '',
  confirmPassword: ''
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const mapApiError = (error: ApiErrorResponse | undefined) => {
  if (!error) {
    return 'An unexpected error occurred. Please try again.';
  }

  if (error.message === 'ACCOUNT_EXISTS' || error.statusCode === 409) {
    return 'An account with this email already exists.';
  }

  if (error.message === 'INVALID_INPUT' || error.statusCode === 400) {
    return 'Invalid email or password.';
  }

  if (error.message === 'NETWORK_ERROR') {
    return 'Cannot connect to server. Please try again.';
  }

  return 'An unexpected error occurred. Please try again.';
};

export function RegisterForm(): JSX.Element {
  const [formValues, setFormValues] = useState<FormState>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const isSubmitDisabled = useMemo(
    () => isSubmitting,
    [isSubmitting]
  );

  const validate = useCallback(
    (values: FormState): FormErrors => {
      const errors: FormErrors = {};

      if (!emailRegex.test(values.email)) {
        errors.email = 'Please enter a valid email address.';
      }

      if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
      }

      return errors;
    },
    []
  );

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        setFormValues((previous) => ({
          ...previous,
          [field]: event.target.value
        }));
      },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setApiError(null);

      const errors = validate(formValues);
      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        return;
      }

      setIsSubmitting(true);

      try {
        await authService.register({
          email: formValues.email,
          password: formValues.password
        });
        router.push('/login');
      } catch (error) {
        const mappedError = mapApiError(error as ApiErrorResponse | undefined);
        setApiError(mappedError);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formValues, router, validate]
  );

  return (
    <form className="mx-auto max-w-md space-y-6" noValidate onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
          value={formValues.email}
          onChange={handleChange('email')}
          aria-describedby={formErrors.email ? 'email-error' : undefined}
          aria-invalid={formErrors.email ? 'true' : 'false'}
        />
        {formErrors.email ? (
          <p className="mt-1 text-sm text-red-600" id="email-error">
            {formErrors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
          value={formValues.password}
          onChange={handleChange('password')}
          aria-describedby={formErrors.password ? 'password-error' : undefined}
          aria-invalid={formErrors.password ? 'true' : 'false'}
        />
        {formErrors.password ? (
          <p className="mt-1 text-sm text-red-600" id="password-error">
            {formErrors.password}
          </p>
        ) : null}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
          value={formValues.confirmPassword}
          onChange={handleChange('confirmPassword')}
          aria-describedby={
            formErrors.confirmPassword ? 'confirm-password-error' : undefined
          }
          aria-invalid={formErrors.confirmPassword ? 'true' : 'false'}
        />
        {formErrors.confirmPassword ? (
          <p className="mt-1 text-sm text-red-600" id="confirm-password-error">
            {formErrors.confirmPassword}
          </p>
        ) : null}
      </div>

      {apiError ? (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">
          {apiError}
        </div>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitDisabled}
      >
        {isSubmitting ? 'Registering…' : 'Create account'}
      </button>
    </form>
  );
}
