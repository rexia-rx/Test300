'use client';

import { useCallback, useEffect, useState } from 'react';

import type {
  Units,
  UserProfile
} from '@myfitness2/shared-types';

import { ProfileForm } from '../../../components/profile/ProfileForm';
import type { ApiErrorResponse } from '../../../services/auth.service';
import { profileService } from '../../../services/profile.service';
import { useProfileStore } from '../../../store/profile.store';

const mapLoadError = (error: ApiErrorResponse | undefined) => {
  if (!error) {
    return 'We were unable to load your profile. Please try again.';
  }

  if (error.statusCode === 401 || error.message === 'UNAUTHORIZED') {
    return 'Your session has expired. Please log in again.';
  }

  if (error.statusCode === 404 || error.message === 'PROFILE_NOT_FOUND') {
    return "We couldn't find your profile details.";
  }

  if (error.message === 'NETWORK_ERROR') {
    return 'Unable to connect to the server. Check your connection and try again.';
  }

  return 'We were unable to load your profile. Please try again.';
};

const mapUpdateError = (error: ApiErrorResponse | undefined) => {
  if (!error) {
    return 'We could not update your profile. Please try again.';
  }

  if (error.statusCode === 401 || error.message === 'UNAUTHORIZED') {
    return 'Your session has expired. Please log in again.';
  }

  if (error.statusCode === 400 || error.message === 'INVALID_INPUT') {
    return 'Please check your details and try again.';
  }

  if (error.message === 'NETWORK_ERROR') {
    return 'Cannot connect to the server. Please try again later.';
  }

  return 'We could not update your profile. Please try again.';
};

const toFormValues = (profile: UserProfile | null) => ({
  displayName: profile?.displayName ?? '',
  preferredUnits: (profile?.preferredUnits ?? 'METRIC') as Units
});

export default function ProfilePage(): JSX.Element {
  const { profile, setProfile } = useProfileStore();
  const [profileSnapshot, setProfileSnapshot] = useState<UserProfile | null>(
    profile
  );
  const [isLoading, setIsLoading] = useState(() => profileSnapshot === null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (profile) {
      setProfileSnapshot(profile);
      return;
    }

    setProfileSnapshot(null);
  }, [profile]);

  useEffect(() => {
    let isMounted = true;

    if (profileSnapshot) {
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const result = await profileService.getProfile();
        if (isMounted) {
          setProfile(result);
          setProfileSnapshot(result);
          setIsLoading(false);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }
        const mappedError = mapLoadError(error as ApiErrorResponse | undefined);
        setLoadError(mappedError);
        setIsLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [profileSnapshot, setProfile]);

  const handleSubmit = useCallback(
    async ({ displayName, preferredUnits }: { displayName: string; preferredUnits: Units }) => {
      setUpdateError(null);
      setSuccessMessage(null);
      setIsSubmitting(true);

      try {
        const updatedProfile = await profileService.updateProfile({
          displayName,
          preferredUnits
        });
        setProfile(updatedProfile);
        setProfileSnapshot(updatedProfile);
        setSuccessMessage('Profile updated successfully.');
      } catch (error) {
        const mappedError = mapUpdateError(error as ApiErrorResponse | undefined);
        setUpdateError(mappedError);
      } finally {
        setIsSubmitting(false);
      }
    },
    [setProfile]
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-4 text-gray-600">Loading your profile…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12" role="alert">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-4 text-gray-600">{loadError}</p>
      </div>
    );
  }

  if (!profileSnapshot) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
        <p className="mt-4 text-gray-600">
          We could not retrieve your profile details right now. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
      <p className="mt-2 text-gray-600">
        Manage your personal details and preferred measurement units.
      </p>

      <div className="mt-8">
        <ProfileForm
          initialValues={toFormValues(profileSnapshot)}
          email={profileSnapshot.email}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errorMessage={updateError}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
}
