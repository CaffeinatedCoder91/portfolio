import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import ScrollCue from './ScrollCue';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('ScrollCue', () => {
  it('renders decorative scroll cue text', () => {
    renderWithTheme(<ScrollCue />);

    expect(screen.getByText('scroll')).toBeInTheDocument();
  });

  it('is hidden from assistive technology', () => {
    const { container } = renderWithTheme(<ScrollCue />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<ScrollCue />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
