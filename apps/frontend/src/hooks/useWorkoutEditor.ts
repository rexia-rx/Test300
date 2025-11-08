import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
  CardioEntryUpdatePayload,
  LoggedExerciseUpdatePayload,
  StrengthSetUpdatePayload,
  UpdateWorkoutPayload,
  WorkoutSession
} from '@myfitness2/shared-types';

import { workoutService } from '../services/workout.service';
import type { ApiErrorResponse } from '../services/auth.service';

const toLocalInputValue = (isoDate: string | null | undefined): string => {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const pad = (value: number) => value.toString().padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const normaliseMessage = (message: string | string[] | undefined): string => {
  if (!message) {
    return 'UNKNOWN_ERROR';
  }

  return Array.isArray(message) ? message.join(', ') : message;
};

const generateClientId = () => `client-${Math.random().toString(36).slice(2, 11)}`;

export interface StrengthSetDraft extends StrengthSetUpdatePayload {
  clientId: string;
}

export interface CardioEntryDraft extends CardioEntryUpdatePayload {
  clientId: string;
}

export interface LoggedExerciseDraft extends LoggedExerciseUpdatePayload {
  clientId: string;
  notes?: string;
  strengthSets?: StrengthSetDraft[];
  cardioEntry?: CardioEntryDraft;
}

const mapLoggedExercises = (
  session: WorkoutSession
): LoggedExerciseDraft[] => {
  return (session.loggedExercises ?? []).map((loggedExercise) => {
    const inferredType = loggedExercise.exercise?.type
      ? loggedExercise.exercise.type
      : loggedExercise.cardioEntry
        ? 'CARDIO'
        : 'STRENGTH';

    return {
      clientId: loggedExercise.id,
      id: loggedExercise.id,
      exerciseId: loggedExercise.exerciseId,
      notes: loggedExercise.notes ?? undefined,
      type: inferredType,
      strengthSets:
        inferredType === 'CARDIO'
          ? undefined
          : loggedExercise.strengthSets.map((set) => ({
              clientId: set.id,
              id: set.id,
              setNumber: set.setNumber,
              reps: set.reps,
              weight: set.weight
            })),
      cardioEntry:
        inferredType === 'CARDIO' && loggedExercise.cardioEntry
          ? {
              clientId: loggedExercise.cardioEntry.id,
              id: loggedExercise.cardioEntry.id,
              durationSeconds:
                loggedExercise.cardioEntry.durationSeconds ?? undefined,
              distanceMeters:
                loggedExercise.cardioEntry.distanceMeters ?? undefined
            }
          : undefined
    };
  });
};

const parseDateInput = (value: string): Date | null => {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
};

const normaliseNumber = (value: number | null | undefined): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  return value;
};

const normaliseNotes = (value: string | undefined): string | null => {
  return value === undefined ? null : value;
};

const areCardioEntriesEqual = (
  left: CardioEntryDraft | undefined,
  right: CardioEntryDraft | undefined
): boolean => {
  if (!left && !right) {
    return true;
  }

  if (!left || !right) {
    return false;
  }

  return (
    (left.id ?? null) === (right.id ?? null) &&
    normaliseNumber(left.durationSeconds) ===
      normaliseNumber(right.durationSeconds) &&
    normaliseNumber(left.distanceMeters) ===
      normaliseNumber(right.distanceMeters)
  );
};

const areStrengthSetsEqual = (
  left: StrengthSetDraft[] | undefined,
  right: StrengthSetDraft[] | undefined
): boolean => {
  const leftSets = left ?? [];
  const rightSets = right ?? [];

  if (leftSets.length !== rightSets.length) {
    return false;
  }

  return leftSets.every((set, index) => {
    const other = rightSets[index];

    if (!other) {
      return false;
    }

    return (
      (set.id ?? null) === (other.id ?? null) &&
      set.setNumber === other.setNumber &&
      set.reps === other.reps &&
      set.weight === other.weight
    );
  });
};

const areLoggedExerciseDraftsEqual = (
  left: LoggedExerciseDraft[],
  right: LoggedExerciseDraft[]
): boolean => {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((item, index) => {
    const other = right[index];

    if (!other) {
      return false;
    }

    return (
      (item.id ?? null) === (other.id ?? null) &&
      item.exerciseId === other.exerciseId &&
      item.type === other.type &&
      normaliseNotes(item.notes) === normaliseNotes(other.notes) &&
      areStrengthSetsEqual(item.strengthSets, other.strengthSets) &&
      areCardioEntriesEqual(item.cardioEntry, other.cardioEntry)
    );
  });
};

interface UseWorkoutEditorArgs {
  session: WorkoutSession | null;
  onUpdated?: (session: WorkoutSession) => void;
}

interface UseWorkoutEditorResult {
  startTimeInput: string;
  endTimeInput: string;
  setStartTimeInput: (value: string) => void;
  setEndTimeInput: (value: string) => void;
  isSaving: boolean;
  errorMessage: string | null;
  wasSaved: boolean;
  loggedExercises: LoggedExerciseDraft[];
  updateLoggedExerciseNotes: (loggedExerciseClientId: string, notes: string) => void;
  addStrengthSet: (loggedExerciseClientId: string) => void;
  updateStrengthSet: (
    loggedExerciseClientId: string,
    strengthSetClientId: string,
    updates: Partial<Pick<StrengthSetUpdatePayload, 'setNumber' | 'reps' | 'weight'>>
  ) => void;
  removeStrengthSet: (loggedExerciseClientId: string, strengthSetClientId: string) => void;
  updateCardioEntry: (
    loggedExerciseClientId: string,
    updates: Partial<CardioEntryUpdatePayload>
  ) => void;
  clearCardioEntry: (loggedExerciseClientId: string) => void;
  saveChanges: () => Promise<void>;
}

export function useWorkoutEditor({
  session,
  onUpdated
}: UseWorkoutEditorArgs): UseWorkoutEditorResult {
  const [startTimeInput, setStartTimeInput] = useState(
    toLocalInputValue(session?.startTime)
  );
  const [endTimeInput, setEndTimeInput] = useState(
    toLocalInputValue(session?.endTime ?? null)
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [wasSaved, setWasSaved] = useState(false);
  const [loggedExercises, setLoggedExercises] = useState<LoggedExerciseDraft[]>(
    () => (session ? mapLoggedExercises(session) : [])
  );

  useEffect(() => {
    setStartTimeInput(toLocalInputValue(session?.startTime));
    setEndTimeInput(toLocalInputValue(session?.endTime ?? null));
  }, [session?.endTime, session?.id, session?.startTime]);

  useEffect(() => {
    if (!session) {
      setLoggedExercises([]);
      return;
    }

    setLoggedExercises(mapLoggedExercises(session));
  }, [session?.id, session?.updatedAt]);

  const baselineLoggedExercises = useMemo(
    () => (session ? mapLoggedExercises(session) : []),
    [session?.id, session?.updatedAt]
  );

  const payload = useMemo<UpdateWorkoutPayload | null>(() => {
    if (!session) {
      return null;
    }

    const base: UpdateWorkoutPayload = {};

    if (loggedExercises.length > 0) {
      base.loggedExercises = loggedExercises.map((loggedExercise) => ({
        id:
          loggedExercise.id && !loggedExercise.id.startsWith('client-')
            ? loggedExercise.id
            : undefined,
        exerciseId: loggedExercise.exerciseId,
        notes: loggedExercise.notes ?? undefined,
        type: loggedExercise.type,
        strengthSets:
          loggedExercise.type === 'CARDIO'
            ? undefined
            : (loggedExercise.strengthSets ?? []).map((set) => ({
                id:
                  set.id && !set.id.startsWith('client-')
                    ? set.id
                    : undefined,
                setNumber: set.setNumber,
                reps: set.reps,
                weight: set.weight
              })),
        cardioEntry:
          loggedExercise.type === 'CARDIO' && loggedExercise.cardioEntry
            ? {
                id:
                  loggedExercise.cardioEntry.id &&
                  !loggedExercise.cardioEntry.id.startsWith('client-')
                    ? loggedExercise.cardioEntry.id
                    : undefined,
                durationSeconds: loggedExercise.cardioEntry.durationSeconds,
                distanceMeters: loggedExercise.cardioEntry.distanceMeters
              }
            : undefined
      }));
    }

    if (startTimeInput) {
      const startDate = new Date(startTimeInput);
      if (!Number.isNaN(startDate.getTime())) {
        base.startTime = startDate.toISOString();
      }
    }

    if (endTimeInput) {
      const endDate = new Date(endTimeInput);
      if (!Number.isNaN(endDate.getTime())) {
        base.endTime = endDate.toISOString();
      }
    }

    return base;
  }, [endTimeInput, loggedExercises, session, startTimeInput]);

  const hasChanges = useMemo(() => {
    if (!session) {
      return false;
    }

    const startDate = parseDateInput(startTimeInput);
    const sessionStartDate = new Date(session.startTime);

    const startChanged =
      !!startDate && startDate.getTime() !== sessionStartDate.getTime();

    const endDate = parseDateInput(endTimeInput);
    const sessionEndDate = session.endTime ? new Date(session.endTime) : null;

    const endChanged =
      (endDate ? endDate.getTime() : null) !==
      (sessionEndDate ? sessionEndDate.getTime() : null);

    const exercisesChanged = !areLoggedExerciseDraftsEqual(
      loggedExercises,
      baselineLoggedExercises
    );

    return startChanged || endChanged || exercisesChanged;
  }, [
    baselineLoggedExercises,
    endTimeInput,
    loggedExercises,
    session,
    startTimeInput
  ]);

  const validate = useCallback((): string | null => {
    if (!startTimeInput) {
      return 'START_TIME_REQUIRED';
    }

    const startDate = new Date(startTimeInput);

    if (Number.isNaN(startDate.getTime())) {
      return 'INVALID_START_TIME';
    }

    if (!endTimeInput) {
      return null;
    }

    const endDate = new Date(endTimeInput);

    if (Number.isNaN(endDate.getTime())) {
      return 'INVALID_END_TIME';
    }

    if (startDate > endDate) {
      return 'START_AFTER_END';
    }

    for (const loggedExercise of loggedExercises) {
      if (loggedExercise.type === 'STRENGTH') {
        const sets = loggedExercise.strengthSets ?? [];

        for (const set of sets) {
          if (set.setNumber < 1 || set.reps < 0 || set.weight < 0) {
            return 'INVALID_STRENGTH_SET';
          }
        }
      } else {
        const cardio = loggedExercise.cardioEntry;

        if (cardio) {
          const hasDuration =
            cardio.durationSeconds !== undefined && cardio.durationSeconds !== null;
          const hasDistance =
            cardio.distanceMeters !== undefined && cardio.distanceMeters !== null;

          if (!hasDuration && !hasDistance) {
            return 'CARDIO_ENTRY_REQUIRED';
          }

          if (
            (cardio.durationSeconds ?? 0) < 0 ||
            (cardio.distanceMeters ?? 0) < 0
          ) {
            return 'INVALID_CARDIO_ENTRY';
          }
        }
      }
    }

    return null;
  }, [endTimeInput, loggedExercises, startTimeInput]);

  const saveChanges = useCallback(async () => {
    if (!session || !payload) {
      return;
    }

    const validationError = validate();

    if (validationError) {
      setErrorMessage(validationError);
      setWasSaved(false);
      return;
    }

    if (!hasChanges) {
      console.info('frontend.workout.edit.noop', { sessionId: session.id });
      setErrorMessage(null);
      setWasSaved(true);
      return;
    }

    console.info('frontend.workout.edit.attempt', { sessionId: session.id });
    setIsSaving(true);
    setErrorMessage(null);
    setWasSaved(false);

    try {
      const updated = await workoutService.updateSession(session.id, payload);
      console.info('frontend.workout.edit.success', { sessionId: session.id });
      onUpdated?.(updated);
      setWasSaved(true);
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      const message = normaliseMessage(apiError?.message);
      console.error('frontend.workout.edit.failure', {
        sessionId: session.id,
        message
      });
      setErrorMessage(message);
    } finally {
      setIsSaving(false);
    }
  }, [hasChanges, onUpdated, payload, session, validate]);

  const updateLoggedExerciseNotes = useCallback(
    (loggedExerciseClientId: string, notes: string) => {
      setLoggedExercises((current) =>
        current.map((item) =>
          item.clientId === loggedExerciseClientId ? { ...item, notes } : item
        )
      );
    },
    []
  );

  const addStrengthSet = useCallback((loggedExerciseClientId: string) => {
    setLoggedExercises((current) =>
      current.map((item) => {
        if (item.clientId !== loggedExerciseClientId || item.type !== 'STRENGTH') {
          return item;
        }

        const nextNumber =
          Math.max(0, ...(item.strengthSets ?? []).map((set) => set.setNumber)) + 1;

        const draftSet: StrengthSetDraft = {
          clientId: generateClientId(),
          setNumber: nextNumber,
          reps: 0,
          weight: 0
        };

        return {
          ...item,
          strengthSets: [...(item.strengthSets ?? []), draftSet]
        };
      })
    );
  }, []);

  const updateStrengthSet = useCallback(
    (
      loggedExerciseClientId: string,
      strengthSetClientId: string,
      updates: Partial<Pick<StrengthSetUpdatePayload, 'setNumber' | 'reps' | 'weight'>>
    ) => {
      setLoggedExercises((current) =>
        current.map((item) => {
          if (item.clientId !== loggedExerciseClientId || item.type !== 'STRENGTH') {
            return item;
          }

          const sets = item.strengthSets ?? [];
          return {
            ...item,
            strengthSets: sets.map((set) =>
              set.clientId === strengthSetClientId ? { ...set, ...updates } : set
            )
          };
        })
      );
    },
    []
  );

  const removeStrengthSet = useCallback(
    (loggedExerciseClientId: string, strengthSetClientId: string) => {
      setLoggedExercises((current) =>
        current.map((item) => {
          if (item.clientId !== loggedExerciseClientId || item.type !== 'STRENGTH') {
            return item;
          }

          return {
            ...item,
            strengthSets: (item.strengthSets ?? []).filter(
              (set) => set.clientId !== strengthSetClientId
            )
          };
        })
      );
    },
    []
  );

  const updateCardioEntry = useCallback(
    (loggedExerciseClientId: string, updates: Partial<CardioEntryUpdatePayload>) => {
      setLoggedExercises((current) =>
        current.map((item) => {
          if (item.clientId !== loggedExerciseClientId || item.type !== 'CARDIO') {
            return item;
          }

          const nextEntry: CardioEntryDraft = {
            clientId: item.cardioEntry?.clientId ?? generateClientId(),
            id: item.cardioEntry?.id,
            durationSeconds:
              Object.prototype.hasOwnProperty.call(updates, 'durationSeconds')
                ? updates.durationSeconds
                : item.cardioEntry?.durationSeconds,
            distanceMeters:
              Object.prototype.hasOwnProperty.call(updates, 'distanceMeters')
                ? updates.distanceMeters
                : item.cardioEntry?.distanceMeters
          };

          return {
            ...item,
            cardioEntry: nextEntry
          };
        })
      );
    },
    []
  );

  const clearCardioEntry = useCallback((loggedExerciseClientId: string) => {
    setLoggedExercises((current) =>
      current.map((item) =>
        item.clientId === loggedExerciseClientId && item.type === 'CARDIO'
          ? { ...item, cardioEntry: undefined }
          : item
      )
    );
  }, []);

  return {
    startTimeInput,
    endTimeInput,
    setStartTimeInput,
    setEndTimeInput,
    isSaving,
    errorMessage,
    wasSaved,
    loggedExercises,
    updateLoggedExerciseNotes,
    addStrengthSet,
    updateStrengthSet,
    removeStrengthSet,
    updateCardioEntry,
    clearCardioEntry,
    saveChanges
  };
}
