import { act, renderHook } from '@testing-library/react';

import type { UserProfile } from '@myfitness2/shared-types';

import { __internal, useProfileStore } from './profile.store';

describe('useProfileStore', () => {
  const profile: UserProfile = {
    id: 'user-1',
    email: 'user@example.com',
    displayName: 'Test User',
    preferredUnits: 'METRIC'
  };

  beforeEach(() => {
    __internal.reset();
  });

  it('returns null profile by default', () => {
    const { result } = renderHook(() => useProfileStore());

    expect(result.current.profile).toBeNull();
  });

  it('stores the profile when setProfile is called', () => {
    const { result } = renderHook(() => useProfileStore());

    act(() => {
      result.current.setProfile(profile);
    });

    expect(result.current.profile).toEqual(profile);
  });

  it('clears the profile when clearProfile is called', () => {
    const { result } = renderHook(() => useProfileStore());

    act(() => {
      result.current.setProfile(profile);
    });

    act(() => {
      result.current.clearProfile();
    });

    expect(result.current.profile).toBeNull();
  });
});
