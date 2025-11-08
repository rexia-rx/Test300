'use client';

import { useMemo, useSyncExternalStore } from 'react';

import type { UserProfile } from '@myfitness2/shared-types';

type ProfileState = {
  profile: UserProfile | null;
};

type ProfileStoreApi = ProfileState & {
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
};

type Listener = () => void;

const store = {
  state: { profile: null } as ProfileState,
  listeners: new Set<Listener>()
};

const subscribe = (listener: Listener) => {
  store.listeners.add(listener);
  return () => {
    store.listeners.delete(listener);
  };
};

const getSnapshot = () => store.state;

const setState = (partial: Partial<ProfileState>) => {
  store.state = { ...store.state, ...partial };
  store.listeners.forEach((listener) => listener());
};

const setProfile = (profile: UserProfile) => {
  setState({ profile });
};

const clearProfile = () => {
  setState({ profile: null });
};

export function useProfileStore(): ProfileStoreApi {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return useMemo(
    () => ({
      ...snapshot,
      setProfile,
      clearProfile
    }),
    [snapshot]
  );
}

export const __internal = {
  reset: () => {
    store.state = { profile: null };
    store.listeners.clear();
  }
};
