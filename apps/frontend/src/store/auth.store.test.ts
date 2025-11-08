import { act, renderHook } from '@testing-library/react';

import {
  AUTH_TOKEN_STORAGE_KEY,
  __internal,
  useAuthStore
} from './auth.store';

describe('useAuthStore', () => {
  beforeEach(() => {
    window.localStorage.clear();
    __internal.reset();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.accessToken).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });

  it('stores token and updates state when setAccessToken is called', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAccessToken('token');
    });

    expect(result.current.accessToken).toBe('token');
    expect(result.current.isLoggedIn).toBe(true);
    expect(window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBe('token');
  });

  it('clears token and updates state when logout is called', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAccessToken('token');
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.accessToken).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
    expect(window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)).toBeNull();
  });

  it('rehydrates from localStorage when available', () => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, 'persisted-token');

    const { result } = renderHook(() => useAuthStore());

    expect(result.current.accessToken).toBe('persisted-token');
    expect(result.current.isLoggedIn).toBe(true);
  });
});
