export type Units = 'METRIC' | 'IMPERIAL';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  preferredUnits: Units;
}

export interface UpdateProfilePayload {
  displayName?: string | null;
  preferredUnits?: Units;
}
