'use client';

import { useEffect } from 'react';

import { Button } from './Button';
import { Modal } from './Modal';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isConfirming?: boolean;
  errorMessage?: string | null;
  workoutId?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = 'Delete',
  cancelButtonText = 'Cancel',
  isConfirming = false,
  errorMessage = null,
  workoutId
}: DeleteConfirmationModalProps): JSX.Element | null {
  useEffect(() => {
    if (isOpen) {
      console.info('ui_event_modal_delete_workout_shown', { workoutId });
    }
  }, [isOpen, workoutId]);

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    console.info('ui_event_modal_delete_workout_confirmed', { workoutId });
    onConfirm();
  };

  const handleCancel = () => {
    console.info('ui_event_modal_delete_workout_cancelled', { workoutId });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={title}>
      <p className="text-sm text-gray-600" data-testid="delete-confirmation-message">
        {message}
      </p>
      {errorMessage ? (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {cancelButtonText}
        </button>
        <Button
          type="button"
          className="bg-red-600 hover:bg-red-500 focus:ring-red-500"
          onClick={handleConfirm}
          isLoading={isConfirming}
          loadingText="Deleting…"
          disabled={isConfirming}
        >
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
}
