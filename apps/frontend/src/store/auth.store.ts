'use client';

import { useMemo, useSyncExternalStore } from 'react';

type AuthState = {
  accessToken: string | null;
  isLoggedIn: boolean;
};

type AuthStoreApi = AuthState & {
  setAccessToken: (token: string) => void;
  logout: () => void;
};

const AUTH_TOKEN_STORAGE_KEY = 'myfitness2.authToken';

type Listener = () => void;

const store = {
  state: { accessToken: null, isLoggedIn: false } as AuthState,
  listeners: new Set<Listener>()
};

const getSnapshot = () => store.state;

const subscribe = (listener: Listener) => {
  store.listeners.add(listener);
  return () => {
    store.listeners.delete(listener);
  };
};

const setState = (partial: Partial<AuthState>) => {
  store.state = { ...store.state, ...partial };
  store.listeners.forEach((listener) => listener());
};

const persistToken = (token: string | null) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
};

let hasHydrated = false;

const rehydrateFromStorage = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const storedToken = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  if (storedToken) {
    store.state = {
      accessToken: storedToken,
      isLoggedIn: true
    };
  } else {
    store.state = { accessToken: null, isLoggedIn: false };
  }
  hasHydrated = true;
};

const ensureHydrated = () => {
  if (!hasHydrated) {
    rehydrateFromStorage();
  }
};

const setAccessToken = (token: string) => {
  setState({ accessToken: token, isLoggedIn: true });
  persistToken(token);
};

const logout = () => {
  setState({ accessToken: null, isLoggedIn: false });
  persistToken(null);
};

export function useAuthStore(): AuthStoreApi {
  ensureHydrated();
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return useMemo(
    () => ({
      ...snapshot,
      setAccessToken,
      logout
    }),
    [snapshot]
  );
}

export { AUTH_TOKEN_STORAGE_KEY };

export const __internal = {
  reset: () => {
    store.state = { accessToken: null, isLoggedIn: false };
    hasHydrated = false;
  }
};
