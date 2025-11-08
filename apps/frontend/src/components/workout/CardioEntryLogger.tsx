'use client';

import { useEffect, useState } from 'react';

import type { CardioEntryDraft } from '../../hooks/useWorkoutEditor';
import { Button } from '../common/Button';

interface CardioEntryLoggerProps {
  entry: CardioEntryDraft | undefined;
  onChange: (updates: Partial<CardioEntryDraft>) => void;
  onClear: () => void;
  disabled?: boolean;
}

type FieldKey = 'durationSeconds' | 'distanceMeters';

interface FieldState {
  durationSeconds: string;
  distanceMeters: string;
}

interface FieldErrors {
  durationSeconds?: string;
  distanceMeters?: string;
}

const labels: Record<FieldKey, string> = {
  durationSeconds: 'Duration (seconds)',
  distanceMeters: 'Distance (meters)'
};

const toState = (entry: CardioEntryDraft | undefined): FieldState => ({
  durationSeconds:
    entry?.durationSeconds !== undefined && entry?.durationSeconds !== null
      ? entry.durationSeconds.toString()
      : '',
  distanceMeters:
    entry?.distanceMeters !== undefined && entry?.distanceMeters !== null
      ? entry.distanceMeters.toString()
      : ''
});

export function CardioEntryLogger({
  entry,
  onChange,
  onClear,
  disabled = false
}: CardioEntryLoggerProps): JSX.Element {
  const [inputs, setInputs] = useState<FieldState>(() => toState(entry));
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    setInputs(toState(entry));
  }, [entry?.distanceMeters, entry?.durationSeconds]);

  const handleChange = (field: FieldKey, value: string) => {
    setInputs((previous) => ({
      ...previous,
      [field]: value
    }));

    if (value.trim() === '') {
      setErrors((previous) => ({
        ...previous,
        [field]: undefined
      }));
      onChange({ [field]: undefined });
      return;
    }

    const parsed = Number(value);

    if (!Number.isFinite(parsed) || Number.isNaN(parsed) || parsed < 0) {
      setErrors((previous) => ({
        ...previous,
        [field]: 'Value must be a non-negative number'
      }));
      return;
    }

    setErrors((previous) => ({
      ...previous,
      [field]: undefined
    }));
    onChange({ [field]: parsed });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {(Object.keys(labels) as FieldKey[]).map((field) => (
          <label
            key={field}
            className="flex flex-col text-sm font-medium text-gray-700"
          >
            {labels[field]}
            <input
              className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              type="number"
              value={inputs[field]}
              onChange={(event) => handleChange(field, event.target.value)}
              min={0}
              disabled={disabled}
              aria-invalid={errors[field] ? 'true' : 'false'}
              aria-describedby={
                errors[field] ? `cardio-${field}-error` : undefined
              }
            />
            {errors[field] ? (
              <span
                className="mt-1 text-xs text-red-600"
                id={`cardio-${field}-error`}
              >
                {errors[field]}
              </span>
            ) : null}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button type="button" onClick={onClear} disabled={disabled}>
          Clear cardio entry
        </Button>
        <p className="text-xs text-gray-500">
          Provide at least one value. Leave both fields empty to remove the
          cardio entry.
        </p>
      </div>
    </div>
  );
}
