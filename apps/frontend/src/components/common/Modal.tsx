'use client';

import type { PropsWithChildren } from 'react';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children
}: ModalProps): JSX.Element | null {
  if (!isOpen) {
    return null;
  }

  const titleId = `${title.replace(/\s+/g, '-').toLowerCase()}-title`;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
    >
      <div
        aria-labelledby={titleId}
        className="mx-4 w-full max-w-2xl rounded-lg bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900" id={titleId}>
            {title}
          </h2>
          <button
            aria-label="Close"
            className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
