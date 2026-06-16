import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import Chip from './Chip';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  );
};

describe('Chip', () => {
  it('renders with default style', () => {
    const { container } = renderWithTheme(
      <Chip>React</Chip>
    );
    expect(container.textContent).toContain('React');
  });

  it('renders default style variant', () => {
    const { container } = renderWithTheme(
      <Chip $style="default">TypeScript</Chip>
    );
    expect(container.textContent).toContain('TypeScript');
  });

  it('renders hot style variant', () => {
    const { container } = renderWithTheme(
      <Chip $style="hot">Featured</Chip>
    );
    expect(container.textContent).toContain('Featured');
  });

  it('renders cool style variant', () => {
    const { container } = renderWithTheme(
      <Chip $style="cool">New</Chip>
    );
    expect(container.textContent).toContain('New');
  });

  it('renders multiple chips together', () => {
    const { container } = renderWithTheme(
      <div>
        <Chip>Next.js</Chip>
        <Chip $style="hot">Hot</Chip>
        <Chip $style="cool">Cool</Chip>
      </div>
    );
    expect(container.textContent).toContain('Next.js');
    expect(container.textContent).toContain('Hot');
    expect(container.textContent).toContain('Cool');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(
      <Chip $style="hot">React</Chip>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
