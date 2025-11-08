import { useCallback, useEffect, useRef, useState } from 'react';

interface UseRestTimerOptions {
  initialDurationSeconds?: number;
  onFinish?: () => void;
  onSkip?: () => void;
}

export interface RestTimerControl {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  skipTimer: () => void;
  resetTimer: () => void;
}

type IntervalRef = ReturnType<typeof setInterval> | null;

export function useRestTimer({
  initialDurationSeconds = 60,
  onFinish,
  onSkip
}: UseRestTimerOptions = {}): RestTimerControl {
  const [timeLeft, setTimeLeft] = useState(initialDurationSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef<IntervalRef>(null);
  const durationRef = useRef(initialDurationSeconds);
  const onFinishRef = useRef(onFinish);
  const onSkipRef = useRef(onSkip);

  useEffect(() => {
    durationRef.current = initialDurationSeconds;
    setTimeLeft(initialDurationSeconds);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
  }, [initialDurationSeconds]);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    onSkipRef.current = onSkip;
  }, [onSkip]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  const startInterval = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          stopTimer();
          setIsRunning(false);
          setIsPaused(false);
          setIsFinished(true);
          onFinishRef.current?.();
          return 0;
        }

        return previous - 1;
      });
    }, 1000);
  }, [stopTimer]);

  const startTimer = useCallback(() => {
    setTimeLeft(durationRef.current);
    setIsFinished(false);
    setIsPaused(false);
    setIsRunning(true);
    startInterval();
  }, [startInterval]);

  const pauseTimer = useCallback(() => {
    if (!isRunning) {
      return;
    }

    stopTimer();
    setIsRunning(false);
    setIsPaused(true);
  }, [isRunning, stopTimer]);

  const resumeTimer = useCallback(() => {
    if (isRunning || timeLeft <= 0) {
      return;
    }

    setIsRunning(true);
    setIsPaused(false);
    startInterval();
  }, [isRunning, startInterval, timeLeft]);

  const skipTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(0);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(true);
    onSkipRef.current?.();
  }, [stopTimer]);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(durationRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
  }, [stopTimer]);

  return {
    timeLeft,
    isRunning,
    isPaused,
    isFinished,
    startTimer,
    pauseTimer,
    resumeTimer,
    skipTimer,
    resetTimer
  };
}
