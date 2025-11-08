'use client';

import { useEffect, useState } from 'react';

import type { CreateExerciseDto, Exercise } from '@myfitness2/shared-types';

import type { ApiErrorResponse } from '../../services/auth.service';
import { exercisesService } from '../../services/exercises.service';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { TextInput } from '../common/TextInput';

interface CreateCustomExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (exercise: Exercise) => void;
}

const mapErrorMessage = (message: string | string[] | undefined) => {
  if (!message) {
    return 'FAILED_TO_CREATE_EXERCISE';
  }

  return Array.isArray(message) ? message.join(', ') : message;
};

export function CreateCustomExerciseModal({
  isOpen,
  onClose,
  onCreated
}: CreateCustomExerciseModalProps): JSX.Element | null {
  const [formValues, setFormValues] = useState<CreateExerciseDto>({
    name: '',
    type: 'STRENGTH'
  });
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormValues({ name: '', type: 'STRENGTH' });
      setFieldError(null);
      setApiError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (formValues.name.trim() === '') {
      setFieldError('Exercise name is required');
      return;
    }

    setFieldError(null);
    setApiError(null);
    setIsSubmitting(true);

    try {
      const createdExercise = await exercisesService.createCustomExercise({
        name: formValues.name.trim(),
        type: formValues.type
      });

      onCreated(createdExercise);
    } catch (error) {
      const apiResponse = error as ApiErrorResponse | undefined;
      setApiError(mapErrorMessage(apiResponse?.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create custom exercise">
      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <TextInput
          label="Exercise name"
          placeholder="e.g. Tempo push-up"
          value={formValues.name}
          onChange={(event) =>
            setFormValues((previous) => ({
              ...previous,
              name: event.target.value
            }))
          }
          errorMessage={fieldError}
          disabled={isSubmitting}
        />

        <fieldset className="space-y-2" disabled={isSubmitting}>
          <legend className="text-sm font-medium text-gray-700">
            Exercise type
          </legend>
          <div className="flex gap-4">
            {(['STRENGTH', 'CARDIO'] as const).map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  checked={formValues.type === type}
                  name="exercise-type"
                  onChange={() =>
                    setFormValues((previous) => ({
                      ...previous,
                      type
                    }))
                  }
                  type="radio"
                  value={type}
                />
                {type === 'STRENGTH' ? 'Strength' : 'Cardio'}
              </label>
            ))}
          </div>
        </fieldset>

        {apiError ? (
          <p className="text-sm text-red-600" role="alert">
            {apiError}
          </p>
        ) : null}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            className="bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting} loadingText="Saving…">
            Save exercise
          </Button>
        </div>
      </form>
    </Modal>
  );
}
