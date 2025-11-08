'use client';

import { useEffect, useMemo, useState } from 'react';

import type {
  StrengthSetDraft
} from '../../hooks/useWorkoutEditor';
import { Button } from '../common/Button';

interface StrengthSetLoggerProps {
  sets: StrengthSetDraft[];
  onAddSet: () => void;
  onChangeSet: (
    clientId: string,
    updates: Partial<Pick<StrengthSetDraft, 'setNumber' | 'reps' | 'weight'>>
  ) => void;
  onRemoveSet: (clientId: string) => void;
  disabled?: boolean;
}

type FieldKey = 'setNumber' | 'reps' | 'weight';

interface FieldState {
  setNumber: string;
  reps: string;
  weight: string;
}

interface FieldErrors {
  setNumber?: string;
  reps?: string;
  weight?: string;
}

const validationConfig: Record<FieldKey, { label: string; min: number }> = {
  setNumber: { label: 'Set number', min: 1 },
  reps: { label: 'Reps', min: 0 },
  weight: { label: 'Weight', min: 0 }
};

const toInputState = (sets: StrengthSetDraft[]): Record<string, FieldState> => {
  return sets.reduce<Record<string, FieldState>>((accumulator, set) => {
    accumulator[set.clientId] = {
      setNumber: set.setNumber.toString(),
      reps: set.reps.toString(),
      weight: set.weight.toString()
    };
    return accumulator;
  }, {});
};

export function StrengthSetLogger({
  sets,
  onAddSet,
  onChangeSet,
  onRemoveSet,
  disabled = false
}: StrengthSetLoggerProps): JSX.Element {
  const [inputs, setInputs] = useState<Record<string, FieldState>>(() =>
    toInputState(sets)
  );
  const [errors, setErrors] = useState<Record<string, FieldErrors>>({});

  useEffect(() => {
    setInputs(toInputState(sets));
  }, [sets]);

  const sortedSets = useMemo(() => {
    return [...sets].sort((left, right) => left.setNumber - right.setNumber);
  }, [sets]);

  const handleChange = (
    clientId: string,
    field: FieldKey,
    value: string
  ) => {
    setInputs((previous) => ({
      ...previous,
      [clientId]: {
        ...previous[clientId],
        [field]: value
      }
    }));

    if (value.trim() === '') {
      setErrors((previous) => ({
        ...previous,
        [clientId]: {
          ...previous[clientId],
          [field]: `${validationConfig[field].label} is required`
        }
      }));
      return;
    }

    const parsed = Number(value);
    const min = validationConfig[field].min;

    if (!Number.isFinite(parsed) || Number.isNaN(parsed) || parsed < min) {
      setErrors((previous) => ({
        ...previous,
        [clientId]: {
          ...previous[clientId],
          [field]: `${validationConfig[field].label} must be ${min === 0 ? 'a non-negative number' : 'at least ' + min}`
        }
      }));
      return;
    }

    setErrors((previous) => ({
      ...previous,
      [clientId]: {
        ...previous[clientId],
        [field]: undefined
      }
    }));

    onChangeSet(clientId, { [field]: parsed });
  };

  const handleRemove = (clientId: string) => {
    setInputs((previous) => {
      const { [clientId]: _removed, ...rest } = previous;
      return rest;
    });
    setErrors((previous) => {
      const { [clientId]: _removed, ...rest } = previous;
      return rest;
    });
    onRemoveSet(clientId);
  };

  return (
    <div className="space-y-3">
      {sortedSets.length === 0 ? (
        <p className="text-sm text-gray-500">No sets logged for this exercise.</p>
      ) : (
        <ul className="space-y-3">
          {sortedSets.map((set) => {
            const inputState = inputs[set.clientId] ?? {
              setNumber: set.setNumber.toString(),
              reps: set.reps.toString(),
              weight: set.weight.toString()
            };
            const fieldErrors = errors[set.clientId] ?? {};

            return (
              <li
                key={set.clientId}
                className="rounded-lg border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Set {set.setNumber}
                  </h4>
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-500"
                    onClick={() => handleRemove(set.clientId)}
                    disabled={disabled}
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {(Object.keys(validationConfig) as FieldKey[]).map((field) => (
                    <label
                      key={field}
                      className="flex flex-col text-sm font-medium text-gray-700"
                    >
                      {validationConfig[field].label}
                      <input
                        className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        type="number"
                        value={inputState[field]}
                        onChange={(event) =>
                          handleChange(set.clientId, field, event.target.value)
                        }
                        min={validationConfig[field].min}
                        disabled={disabled}
                        aria-invalid={fieldErrors[field] ? 'true' : 'false'}
                        aria-describedby={
                          fieldErrors[field]
                            ? `${set.clientId}-${field}-error`
                            : undefined
                        }
                      />
                      {fieldErrors[field] ? (
                        <span
                          className="mt-1 text-xs text-red-600"
                          id={`${set.clientId}-${field}-error`}
                        >
                          {fieldErrors[field]}
                        </span>
                      ) : null}
                    </label>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Button type="button" onClick={onAddSet} disabled={disabled}>
        Add set
      </Button>
    </div>
  );
}
