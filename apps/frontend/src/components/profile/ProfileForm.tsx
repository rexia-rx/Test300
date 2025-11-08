'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent
} from 'react';

import type { Units } from '@myfitness2/shared-types';

import { Button } from '../common/Button';

type ProfileFormValues = {
  displayName: string;
  preferredUnits: Units;
};

type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>;

type ProfileFormProps = {
  initialValues: ProfileFormValues;
  email: string;
  onSubmit: (values: ProfileFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
};

const validate = (values: ProfileFormValues): ProfileFormErrors => {
  const errors: ProfileFormErrors = {};

  if (!values.displayName.trim()) {
    errors.displayName = 'Display name cannot be empty.';
  }

  if (!['METRIC', 'IMPERIAL'].includes(values.preferredUnits)) {
    errors.preferredUnits = 'Please select a valid unit.';
  }

  return errors;
};

export function ProfileForm({
  initialValues,
  email,
  onSubmit,
  isSubmitting = false,
  errorMessage = null,
  successMessage = null
}: ProfileFormProps): JSX.Element {
  const [values, setValues] = useState<ProfileFormValues>(initialValues);
  const [errors, setErrors] = useState<ProfileFormErrors>({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const isSubmitDisabled = useMemo(
    () => isSubmitting,
    [isSubmitting]
  );

  const handleInputChange = useCallback(
    (field: keyof ProfileFormValues) =>
      (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = event.target.value as Units | string;
        setValues((previous) => ({
          ...previous,
          [field]: field === 'preferredUnits' ? (value as Units) : value
        }));
      },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmedValues: ProfileFormValues = {
        displayName: values.displayName.trim(),
        preferredUnits: values.preferredUnits
      };
      const validationErrors = validate(trimmedValues);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      await onSubmit(trimmedValues);
    },
    [onSubmit, values]
  );

  return (
    <form className="mx-auto max-w-xl space-y-6" noValidate onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          readOnly
          className="mt-1 w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="displayName">
          Display name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={values.displayName}
          onChange={handleInputChange('displayName')}
          aria-describedby={errors.displayName ? 'display-name-error' : undefined}
          aria-invalid={errors.displayName ? 'true' : 'false'}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
        />
        {errors.displayName ? (
          <p className="mt-1 text-sm text-red-600" id="display-name-error">
            {errors.displayName}
          </p>
        ) : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="preferredUnits">
          Preferred units
        </label>
        <select
          id="preferredUnits"
          name="preferredUnits"
          value={values.preferredUnits}
          onChange={handleInputChange('preferredUnits')}
          aria-describedby={errors.preferredUnits ? 'preferred-units-error' : undefined}
          aria-invalid={errors.preferredUnits ? 'true' : 'false'}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none"
        >
          <option value="METRIC">Metric (kg, km)</option>
          <option value="IMPERIAL">Imperial (lbs, mi)</option>
        </select>
        {errors.preferredUnits ? (
          <p className="mt-1 text-sm text-red-600" id="preferred-units-error">
            {errors.preferredUnits}
          </p>
        ) : null}
      </div>

      {errorMessage ? (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800" role="alert">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700" role="status">
          {successMessage}
        </div>
      ) : null}

      <Button
        type="submit"
        isLoading={isSubmitting}
        loadingText="Saving…"
        disabled={isSubmitDisabled}
      >
        Save changes
      </Button>
    </form>
  );
}
