'use client';

import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent
} from 'react';

export type LoginFormValues = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof LoginFormValues, string>>;

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialState: LoginFormValues = {
  email: '',
  password: ''
};

export function LoginForm({
  onSubmit,
  isSubmitting = false,
  errorMessage = null
}: LoginFormProps): JSX.Element {
  const [formValues, setFormValues] = useState<LoginFormValues>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const isSubmitDisabled = useMemo(
    () => isSubmitting,
    [isSubmitting]
  );

  const validate = useCallback((values: LoginFormValues): FormErrors => {
    const errors: FormErrors = {};

    if (!emailRegex.test(values.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    return errors;
  }, []);

  const handleChange = useCallback(
    (field: keyof LoginFormValues) =>
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormValues((previous) => ({
          ...previous,
          [field]: value
        }));
      },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const errors = validate(formValues);
      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        return;
      }

      await onSubmit(formValues);
    },
    [formValues, onSubmit, validate]
  );

  return (
    <form className="mx-auto max-w-md space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
          value={formValues.email}
          onChange={handleChange('email')}
          aria-describedby={formErrors.email ? 'login-email-error' : undefined}
          aria-invalid={formErrors.email ? 'true' : 'false'}
        />
        {formErrors.email ? (
          <p className="mt-1 text-sm text-red-600" id="login-email-error">
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
          autoComplete="current-password"
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
          value={formValues.password}
          onChange={handleChange('password')}
          aria-describedby={
            formErrors.password ? 'login-password-error' : undefined
          }
          aria-invalid={formErrors.password ? 'true' : 'false'}
        />
        {formErrors.password ? (
          <p className="mt-1 text-sm text-red-600" id="login-password-error">
            {formErrors.password}
          </p>
        ) : null}
      </div>

      {errorMessage ? (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitDisabled}
      >
        {isSubmitting ? 'Logging in…' : 'Log in'}
      </button>
    </form>
  );
}
