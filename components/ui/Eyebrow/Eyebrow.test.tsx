import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import Eyebrow from './Eyebrow';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  );
};

describe('Eyebrow', () => {
  it('renders with default kincha color', () => {
    const { container } = renderWithTheme(
      <Eyebrow>Section label</Eyebrow>
    );
    expect(container.textContent).toContain('Section label');
  });

  it('renders with custom color', () => {
    const { container } = renderWithTheme(
      <Eyebrow $color="shu">Accent label</Eyebrow>
    );
    expect(container.textContent).toContain('Accent label');
  });

  it('renders with different colors', () => {
    const { container } = renderWithTheme(
      <div>
        <Eyebrow $color="ai">Blue</Eyebrow>
        <Eyebrow $color="matcha">Green</Eyebrow>
        <Eyebrow $color="kincha">Ochre</Eyebrow>
      </div>
    );
    expect(container.textContent).toContain('Blue');
    expect(container.textContent).toContain('Green');
    expect(container.textContent).toContain('Ochre');
  });

  it('renders text as uppercase via CSS', () => {
    const { container } = renderWithTheme(
      <Eyebrow>about</Eyebrow>
    );
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(
      <Eyebrow>Accessible eyebrow</Eyebrow>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
