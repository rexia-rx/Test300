'use client';

export function LoadingSpinner({
  label = 'Loading…'
}: {
  label?: string;
}): JSX.Element {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="flex items-center justify-center gap-2 text-indigo-600"
      role="status"
    >
      <span className="h-3 w-3 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
