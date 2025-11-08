'use client';

import type {
  LoggedExercise,
  StrengthSet,
  WorkoutSession
} from '@myfitness2/shared-types';

type WorkoutSummaryProps = {
  session: WorkoutSession;
};

const formatExerciseType = (type: string | undefined): string => {
  if (!type) {
    return 'Unknown';
  }

  return type.charAt(0) + type.slice(1).toLowerCase();
};

const formatDuration = (seconds: number | null): string | null => {
  if (seconds === null || seconds === undefined) {
    return null;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${seconds} sec`;
  }

  if (remainingSeconds === 0) {
    return `${minutes} min`;
  }

  return `${minutes} min ${remainingSeconds} sec`;
};

const formatDistance = (meters: number | null): string | null => {
  if (meters === null || meters === undefined) {
    return null;
  }

  if (meters >= 1000) {
    const kilometers = meters / 1000;
    return `${kilometers.toFixed(2)} km`;
  }

  return `${meters} m`;
};

export function WorkoutSummary({ session }: WorkoutSummaryProps): JSX.Element {
  const loggedExercises: LoggedExercise[] = session.loggedExercises ?? [];
  const hasExercises = loggedExercises.length > 0;

  return (
    <section aria-labelledby="workout-summary-heading" className="mt-10">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
          <h2
            className="text-xl font-semibold text-gray-900"
            id="workout-summary-heading"
          >
            Workout summary
          </h2>
          <p className="text-sm text-gray-600">
            Started on {new Date(session.startTime).toLocaleString()}
            {session.endTime
              ? ` · Completed on ${new Date(session.endTime).toLocaleString()}`
              : ''}
          </p>
        </div>

        {!hasExercises ? (
          <p className="mt-4 rounded-md bg-gray-50 p-4 text-sm text-gray-600">
            No exercises logged yet.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {loggedExercises.map((exercise) => (
              <li
                className="rounded-md border border-gray-100 bg-gray-50 p-4"
                key={exercise.id}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-gray-900">
                      {exercise.exercise?.name ?? 'Exercise'}
                    </p>
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      {formatExerciseType(exercise.exercise?.type)}
                    </span>
                  </div>
                  {exercise.notes ? (
                    <p className="text-sm text-gray-600">Notes: {exercise.notes}</p>
                  ) : null}
                </div>

                {exercise.strengthSets && exercise.strengthSets.length > 0 ? (
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-800">Strength sets</h3>
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
                      {exercise.strengthSets.map((set: StrengthSet) => (
                        <li key={set.id}>
                          Set {set.setNumber}: {set.reps} reps @ {set.weight} kg
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {exercise.cardioEntry ? (
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-800">Cardio entry</h3>
                    <dl className="mt-1 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
                      {formatDuration(exercise.cardioEntry.durationSeconds) ? (
                        <div>
                          <dt className="font-medium text-gray-600">Duration</dt>
                          <dd>
                            {formatDuration(exercise.cardioEntry.durationSeconds)}
                          </dd>
                        </div>
                      ) : null}
                      {formatDistance(exercise.cardioEntry.distanceMeters) ? (
                        <div>
                          <dt className="font-medium text-gray-600">Distance</dt>
                          <dd>
                            {formatDistance(exercise.cardioEntry.distanceMeters)}
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
