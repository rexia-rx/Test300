'use client';

import type { Exercise } from '@myfitness2/shared-types';

import type {
  CardioEntryDraft,
  LoggedExerciseDraft,
  StrengthSetDraft
} from '../../hooks/useWorkoutEditor';
import { CardioEntryLogger } from './CardioEntryLogger';
import { StrengthSetLogger } from './StrengthSetLogger';

interface LoggedExerciseEditorProps {
  exercise: Exercise;
  draft: LoggedExerciseDraft;
  onNotesChange: (notes: string) => void;
  onAddStrengthSet: () => void;
  onChangeStrengthSet: (
    setClientId: string,
    updates: Partial<Pick<StrengthSetDraft, 'setNumber' | 'reps' | 'weight'>>
  ) => void;
  onRemoveStrengthSet: (setClientId: string) => void;
  onUpdateCardioEntry: (updates: Partial<CardioEntryDraft>) => void;
  onClearCardioEntry: () => void;
  disabled?: boolean;
}

const formatExerciseType = (type: Exercise['type']) => {
  switch (type) {
    case 'STRENGTH':
      return 'Strength';
    case 'CARDIO':
      return 'Cardio';
    default:
      return type;
  }
};

export function LoggedExerciseEditor({
  exercise,
  draft,
  onNotesChange,
  onAddStrengthSet,
  onChangeStrengthSet,
  onRemoveStrengthSet,
  onUpdateCardioEntry,
  onClearCardioEntry,
  disabled = false
}: LoggedExerciseEditorProps): JSX.Element {
  return (
    <article className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <header>
        <h3 className="text-lg font-semibold text-gray-900">{exercise.name}</h3>
        <p className="text-sm text-gray-500">{formatExerciseType(exercise.type)}</p>
      </header>

      <label className="flex flex-col text-sm font-medium text-gray-700">
        Notes
        <textarea
          className="mt-1 min-h-[80px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={draft.notes ?? ''}
          onChange={(event) => onNotesChange(event.target.value)}
          disabled={disabled}
        />
      </label>

      {draft.type === 'STRENGTH' ? (
        <StrengthSetLogger
          sets={draft.strengthSets ?? []}
          onAddSet={onAddStrengthSet}
          onChangeSet={onChangeStrengthSet}
          onRemoveSet={onRemoveStrengthSet}
          disabled={disabled}
        />
      ) : (
        <CardioEntryLogger
          entry={draft.cardioEntry}
          onChange={onUpdateCardioEntry}
          onClear={onClearCardioEntry}
          disabled={disabled}
        />
      )}
    </article>
  );
}
