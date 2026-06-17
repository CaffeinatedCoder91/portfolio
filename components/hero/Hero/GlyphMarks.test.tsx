import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import GlyphMarks from './GlyphMarks';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('GlyphMarks', () => {
  it('renders decorative code glyphs', () => {
    renderWithTheme(<GlyphMarks />);

    expect(screen.getByText('{ }')).toBeInTheDocument();
    expect(screen.getByText('</>')).toBeInTheDocument();
    expect(screen.getByText('=>')).toBeInTheDocument();
    expect(screen.getByText('//')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('[ ]')).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<GlyphMarks />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
