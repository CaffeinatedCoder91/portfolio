import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import StatCard from './StatCard';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  );
};

describe('StatCard', () => {
  it('renders with num and label', () => {
    const { container } = renderWithTheme(
      <StatCard num="5+" label="Years experience" />
    );
    expect(container.textContent).toContain('5+');
    expect(container.textContent).toContain('Years experience');
  });

  it('renders numeric stat', () => {
    const { container } = renderWithTheme(
      <StatCard num="20+" label="Projects completed" />
    );
    expect(container.textContent).toContain('20+');
    expect(container.textContent).toContain('Projects completed');
  });

  it('renders with different stats', () => {
    const { container } = renderWithTheme(
      <div>
        <StatCard num="100%" label="Accessibility" />
        <StatCard num="95+" label="Performance" />
      </div>
    );
    expect(container.textContent).toContain('100%');
    expect(container.textContent).toContain('Accessibility');
    expect(container.textContent).toContain('95+');
    expect(container.textContent).toContain('Performance');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(
      <StatCard num="10+" label="Years of coding" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
