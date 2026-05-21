import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Loader } from './App.jsx';

describe('Loader', () => {
  it('uses route-specific loading copy', () => {
    render(
      <MemoryRouter>
        <Loader label="policy dashboard" />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toHaveTextContent('Loading policy dashboard');
  });

  it('does not describe every lazy route as cinematic', () => {
    render(
      <MemoryRouter>
        <Loader label="research explorer" />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).not.toHaveTextContent('cinematic');
  });
});
