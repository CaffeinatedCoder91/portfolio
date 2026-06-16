import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import ScrollReveal from './ScrollReveal';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  );
};

describe('ScrollReveal', () => {
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

    // Mock IntersectionObserver
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it('renders children', () => {
    const { container } = renderWithTheme(
      <ScrollReveal>
        <div>Revealed content</div>
      </ScrollReveal>
    );
    expect(container.textContent).toContain('Revealed content');
  });

  it('renders with delay prop', () => {
    const { container } = renderWithTheme(
      <ScrollReveal $delay={100}>
        <div>Delayed reveal</div>
      </ScrollReveal>
    );
    expect(container.textContent).toContain('Delayed reveal');
  });

  it('renders multiple children', () => {
    const { container } = renderWithTheme(
      <ScrollReveal>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </ScrollReveal>
    );
    expect(container.textContent).toContain('First');
    expect(container.textContent).toContain('Second');
    expect(container.textContent).toContain('Third');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(
      <ScrollReveal>
        <div>Accessible reveal</div>
      </ScrollReveal>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
