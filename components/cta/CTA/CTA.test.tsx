import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import CTA from './CTA';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('CTA', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it('renders heading with correct text', () => {
    const { getByRole } = renderWithTheme(<CTA />);
    const heading = getByRole('heading', {
      name: /like what you see\? let's build something\./i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders browse projects link', () => {
    const { getByRole } = renderWithTheme(<CTA />);
    const link = getByRole('link', { name: /browse projects/i });
    expect(link).toHaveAttribute('href', '/#projects');
  });

  it('renders say hello link', () => {
    const { getByRole } = renderWithTheme(<CTA />);
    const link = getByRole('link', { name: /say hello/i });
    expect(link).toHaveAttribute('href', '/contacts');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<CTA />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
