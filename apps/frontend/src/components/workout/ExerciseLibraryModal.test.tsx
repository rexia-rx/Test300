import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Exercise } from '@myfitness2/shared-types';

import { ExerciseLibraryModal } from './ExerciseLibraryModal';

const exercises: Exercise[] = [
  {
    id: 'exercise-1',
    name: 'Bench Press',
    type: 'STRENGTH',
    createdById: null,
    createdAt: new Date('2024-01-01T10:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-01-02T10:00:00.000Z').toISOString()
  }
];

describe('ExerciseLibraryModal', () => {
  it('does not render when closed', () => {
    render(
      <ExerciseLibraryModal
        isOpen={false}
        onClose={jest.fn()}
        onSelectExercise={jest.fn()}
        exercises={exercises}
        isLoading={false}
        onSearch={jest.fn()}
        currentSearchQuery=""
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders exercises when open', () => {
    render(
      <ExerciseLibraryModal
        isOpen
        onClose={jest.fn()}
        onSelectExercise={jest.fn()}
        exercises={exercises}
        isLoading={false}
        onSearch={jest.fn()}
        currentSearchQuery=""
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Search exercises')).toBeInTheDocument();
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
  });

  it('invokes onSearch when the query changes', async () => {
    const onSearch = jest.fn();
    const user = userEvent.setup();

    function Wrapper(): JSX.Element {
      const [query, setQuery] = React.useState('');

      const handleSearch = React.useCallback(
        (nextQuery: string) => {
          setQuery(nextQuery);
          onSearch(nextQuery);
        },
        []
      );

      return (
        <ExerciseLibraryModal
          isOpen
          onClose={jest.fn()}
          onSelectExercise={jest.fn()}
          exercises={exercises}
          isLoading={false}
          onSearch={handleSearch}
          currentSearchQuery={query}
        />
      );
    }

    render(<Wrapper />);

    await user.type(screen.getByLabelText('Search exercises'), 'squat');

    expect(onSearch).toHaveBeenLastCalledWith('squat');
  });

  it('shows a loading spinner when loading', () => {
    render(
      <ExerciseLibraryModal
        isOpen
        onClose={jest.fn()}
        onSelectExercise={jest.fn()}
        exercises={[]}
        isLoading
        onSearch={jest.fn()}
        currentSearchQuery=""
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows an error message when provided', () => {
    render(
      <ExerciseLibraryModal
        isOpen
        onClose={jest.fn()}
        onSelectExercise={jest.fn()}
        exercises={[]}
        isLoading={false}
        onSearch={jest.fn()}
        errorMessage="Failed to load exercises."
        currentSearchQuery=""
      />
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Failed to load exercises.'
    );
  });

  it('shows an empty state when there are no exercises for a query', () => {
    render(
      <ExerciseLibraryModal
        isOpen
        onClose={jest.fn()}
        onSelectExercise={jest.fn()}
        exercises={[]}
        isLoading={false}
        onSearch={jest.fn()}
        currentSearchQuery="press"
      />
    );

    expect(
      screen.getByText('No exercises found for "press".')
    ).toBeInTheDocument();
  });

  it('calls onSelectExercise when an exercise is clicked', async () => {
    const onSelect = jest.fn();
    const user = userEvent.setup();

    render(
      <ExerciseLibraryModal
        isOpen
        onClose={jest.fn()}
        onSelectExercise={onSelect}
        exercises={exercises}
        isLoading={false}
        onSearch={jest.fn()}
        currentSearchQuery=""
      />
    );

    await user.click(screen.getByTestId('exercise-card-exercise-1'));

    expect(onSelect).toHaveBeenCalledWith(exercises[0]);
  });

  it('calls onClose when the close button is pressed', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();

    render(
      <ExerciseLibraryModal
        isOpen
        onClose={onClose}
        onSelectExercise={jest.fn()}
        exercises={exercises}
        isLoading={false}
        onSearch={jest.fn()}
        currentSearchQuery=""
      />
    );

    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(onClose).toHaveBeenCalled();
  });
  it('calls onOpenCreateCustomExercise when create button clicked', async () => {
    const onOpenCreate = jest.fn();
    const user = userEvent.setup();

    render(
      <ExerciseLibraryModal
        isOpen
        onClose={jest.fn()}
        onSelectExercise={jest.fn()}
        exercises={exercises}
        isLoading={false}
        onSearch={jest.fn()}
        currentSearchQuery=""
        onOpenCreateCustomExercise={onOpenCreate}
      />
    );

    await user.click(
      screen.getByRole('button', { name: /create custom exercise/i })
    );

    expect(onOpenCreate).toHaveBeenCalled();
  });
});
