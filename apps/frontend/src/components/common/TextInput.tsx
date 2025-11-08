'use client';

import { useId } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string | null;
}

export function TextInput({
  id,
  label,
  onChange,
  errorMessage = null,
  className = '',
  ...rest
}: TextInputProps): JSX.Element {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label className="text-sm font-medium text-gray-700" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        className={[
          'w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
          className
        ]
          .filter(Boolean)
          .join(' ')}
        id={inputId}
        onChange={onChange}
        aria-invalid={errorMessage ? 'true' : 'false'}
        aria-describedby={errorMessage ? errorId : undefined}
        {...rest}
      />
      {errorMessage ? (
        <p className="text-xs text-red-600" id={errorId}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
