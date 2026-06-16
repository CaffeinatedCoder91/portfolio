import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { about } from '../../../content/data';
import { theme } from '../../../styles/theme';
import About from './About';

vi.mock('../../ui/ScrollReveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('About', () => {
  it('renders four about paragraphs', () => {
    renderWithTheme(<About />);

    expect(screen.getAllByText((_, element) => element?.tagName === 'P')).toHaveLength(4);
    about.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('renders four stat cards', () => {
    renderWithTheme(<About />);

    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });

  it('renders the 5+ fact', () => {
    renderWithTheme(<About />);

    expect(screen.getByText('5+')).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<About />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
