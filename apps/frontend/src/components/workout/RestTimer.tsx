'use client';

import { useEffect, useMemo, useRef } from 'react';

import { Button } from '../common/Button';

export interface RestTimerProps {
  timeLeft: number;
  isRunning: boolean;
  isPaused?: boolean;
  isFinished?: boolean;
  initialDurationSeconds?: number;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

const padTime = (value: number) => value.toString().padStart(2, '0');

export function RestTimer({
  timeLeft,
  isRunning,
  isPaused = false,
  isFinished = false,
  initialDurationSeconds = 60,
  onStart,
  onPause,
  onResume,
  onSkip,
  onFinish
}: RestTimerProps): JSX.Element {
  const hasNotifiedFinishRef = useRef(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!hasNotifiedFinishRef.current) {
        hasNotifiedFinishRef.current = true;
        onFinish();
      }
    } else {
      hasNotifiedFinishRef.current = false;
    }
  }, [onFinish, timeLeft]);

  const displayTime = useMemo(() => {
    const safeTimeLeft = Math.max(0, timeLeft);
    const minutes = Math.floor(safeTimeLeft / 60);
    const seconds = safeTimeLeft % 60;

    return `${padTime(minutes)}:${padTime(seconds)}`;
  }, [timeLeft]);

  const { primaryLabel, primaryAction } = useMemo(() => {
    if (isRunning) {
      return { primaryLabel: 'Pause', primaryAction: onPause };
    }

    if (isFinished || timeLeft <= 0) {
      return { primaryLabel: 'Restart', primaryAction: onStart };
    }

    if (isPaused || timeLeft < initialDurationSeconds) {
      return { primaryLabel: 'Resume', primaryAction: onResume };
    }

    return { primaryLabel: 'Start Rest', primaryAction: onStart };
  }, [
    initialDurationSeconds,
    isFinished,
    isPaused,
    isRunning,
    onPause,
    onResume,
    onStart,
    timeLeft
  ]);

  return (
    <div
      className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      data-testid="rest-timer"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Rest Timer</p>
          <p
            className="text-3xl font-semibold text-gray-900"
            data-testid="rest-timer-display"
          >
            {displayTime}
          </p>
          {isFinished && (
            <p className="mt-2 text-sm text-green-600" data-testid="rest-timer-finished">
              Rest complete
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button onClick={primaryAction} aria-label={`${primaryLabel} button`}>
            {primaryLabel}
          </Button>
          <button
            type="button"
            onClick={onSkip}
            className="text-sm font-medium text-indigo-600 transition hover:text-indigo-500"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
