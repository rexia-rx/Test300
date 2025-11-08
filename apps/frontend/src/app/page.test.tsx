import React from 'react';
import { render, screen } from '@testing-library/react';

import HomePage from './page';

describe('HomePage', () => {
  it('renders heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /welcome to myfitness2/i })).toBeInTheDocument();
  });
});
