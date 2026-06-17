import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import InkCanvasErrorBoundary from './InkCanvasErrorBoundary';

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}));

const BrokenChild = () => {
  throw new Error('Canvas failed');
};

describe('InkCanvasErrorBoundary', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when no error is thrown', () => {
    render(
      <InkCanvasErrorBoundary>
        <span>Ink ready</span>
      </InkCanvasErrorBoundary>,
    );

    expect(screen.getByText('Ink ready')).toBeInTheDocument();
  });

  it('renders null when a child throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <InkCanvasErrorBoundary>
        <BrokenChild />
      </InkCanvasErrorBoundary>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(
      <InkCanvasErrorBoundary>
        <span>Ink ready</span>
      </InkCanvasErrorBoundary>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
