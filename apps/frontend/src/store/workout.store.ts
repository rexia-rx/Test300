'use client';

import { useMemo, useSyncExternalStore } from 'react';

import type {
  CardioEntry,
  StrengthSet,
  WorkoutSession
} from '@myfitness2/shared-types';

type WorkoutState = {
  activeSession: WorkoutSession | null;
};

type WorkoutStoreApi = WorkoutState & {
  setActiveSession: (session: WorkoutSession) => void;
  clearActiveSession: () => void;
  appendStrengthSet: (
    loggedExerciseId: string,
    strengthSet: StrengthSet
  ) => void;
  upsertCardioEntry: (
    loggedExerciseId: string,
    cardioEntry: CardioEntry
  ) => void;
};

type Listener = () => void;

const store = {
  state: { activeSession: null } as WorkoutState,
  listeners: new Set<Listener>()
};

const subscribe = (listener: Listener) => {
  store.listeners.add(listener);
  return () => {
    store.listeners.delete(listener);
  };
};

const getSnapshot = () => store.state;

const setState = (partial: Partial<WorkoutState>) => {
  store.state = { ...store.state, ...partial };
  store.listeners.forEach((listener) => listener());
};

const setActiveSession = (session: WorkoutSession) => {
  setState({ activeSession: session });
};

const clearActiveSession = () => {
  setState({ activeSession: null });
};

const appendStrengthSet = (
  loggedExerciseId: string,
  strengthSet: StrengthSet
) => {
  const current = store.state.activeSession;

  if (!current) {
    return;
  }

  const loggedExercises = current.loggedExercises ?? [];

  const updatedLoggedExercises = loggedExercises.map((exercise) => {
    if (exercise.id !== loggedExerciseId) {
      return exercise;
    }

    return {
      ...exercise,
      strengthSets: [...exercise.strengthSets, strengthSet]
    };
  });

  setState({
    activeSession: {
      ...current,
      loggedExercises: updatedLoggedExercises
    }
  });
};

const upsertCardioEntry = (
  loggedExerciseId: string,
  cardioEntry: CardioEntry
) => {
  const current = store.state.activeSession;

  if (!current) {
    return;
  }

  const loggedExercises = current.loggedExercises ?? [];

  const updatedLoggedExercises = loggedExercises.map((exercise) => {
    if (exercise.id !== loggedExerciseId) {
      return exercise;
    }

    return {
      ...exercise,
      cardioEntry
    };
  });

  setState({
    activeSession: {
      ...current,
      loggedExercises: updatedLoggedExercises
    }
  });
};

export function useWorkoutStore(): WorkoutStoreApi {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return useMemo(
    () => ({
      ...snapshot,
      setActiveSession,
      clearActiveSession,
      appendStrengthSet,
      upsertCardioEntry
    }),
    [snapshot]
  );
}

export const __internal = {
  reset: () => {
    store.state = { activeSession: null };
    store.listeners.clear();
  }
};
