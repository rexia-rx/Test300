import { act, renderHook } from '@testing-library/react';

import { useRestTimer } from './useRestTimer';

describe('useRestTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('starts timer at the configured duration and decrements', () => {
    const { result } = renderHook(() => useRestTimer());

    expect(result.current.timeLeft).toBe(60);

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(59);
    expect(result.current.isRunning).toBe(true);
  });

  it('pauses and resumes the timer', () => {
    const { result } = renderHook(() => useRestTimer());

    act(() => {
      result.current.startTimer();
      jest.advanceTimersByTime(3000);
    });

    act(() => {
      result.current.pauseTimer();
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.timeLeft).toBe(57);

    act(() => {
      result.current.resumeTimer();
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft).toBe(56);
  });

  it('skips the timer and triggers callback', () => {
    const onSkip = jest.fn();
    const { result } = renderHook(() => useRestTimer({ onSkip }));

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      result.current.skipTimer();
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isFinished).toBe(true);
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('invokes finish callback when countdown completes', () => {
    const onFinish = jest.fn();
    const { result } = renderHook(() =>
      useRestTimer({ initialDurationSeconds: 2, onFinish })
    );

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isFinished).toBe(true);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('resets timer to initial duration', () => {
    const { result } = renderHook(() =>
      useRestTimer({ initialDurationSeconds: 10 })
    );

    act(() => {
      result.current.startTimer();
      jest.advanceTimersByTime(4000);
    });

    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.timeLeft).toBe(10);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isFinished).toBe(false);
  });
});
