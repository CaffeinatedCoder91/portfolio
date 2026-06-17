import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { projects } from '@/content/data';
import { theme } from '@/styles/theme';
import Projects from './Projects';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('Projects', () => {
  beforeEach(() => {
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it('renders the selected projects section', () => {
    renderWithTheme(<Projects />);

    expect(screen.getByRole('heading', { name: 'Selected projects' })).toBeInTheDocument();
    expect(screen.getByText(projects[0].title)).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<Projects />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
