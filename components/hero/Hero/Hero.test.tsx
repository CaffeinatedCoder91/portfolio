import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import Hero from './Hero';
import { theme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Hero', () => {
  it('renders the name heading', () => {
    const { container } = renderWithTheme(<Hero />);
    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toBe('Joanna Joseph');
  });

  it('renders the location text', () => {
    const { getByText } = renderWithTheme(<Hero />);
    expect(getByText(/London, UK/)).toBeInTheDocument();
  });

  it('renders the three CTA links', () => {
    const { getByRole } = renderWithTheme(<Hero />);
    expect(getByRole('link', { name: /See my projects/ })).toBeInTheDocument();
    expect(getByRole('link', { name: /Get in touch/ })).toBeInTheDocument();
    expect(getByRole('link', { name: /CV/ })).toBeInTheDocument();
  });

  it('renders the photo image', () => {
    const { getByAltText } = renderWithTheme(<Hero />);
    const photo = getByAltText('Joanna Joseph');
    expect(photo).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<Hero />);
    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });
});
