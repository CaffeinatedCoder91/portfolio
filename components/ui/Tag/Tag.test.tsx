import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import Tag from './Tag';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  );
};

describe('Tag', () => {
  it('renders a single tag', () => {
    const { container } = renderWithTheme(
      <Tag>React</Tag>
    );
    expect(container.textContent).toContain('React');
  });

  it('renders multiple tags', () => {
    const { container } = renderWithTheme(
      <div>
        <Tag>React</Tag>
        <Tag>TypeScript</Tag>
        <Tag>Next.js</Tag>
      </div>
    );
    expect(container.textContent).toContain('React');
    expect(container.textContent).toContain('TypeScript');
    expect(container.textContent).toContain('Next.js');
  });

  it('renders tag with special characters', () => {
    const { container } = renderWithTheme(
      <Tag>C++</Tag>
    );
    expect(container.textContent).toContain('C++');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(
      <Tag>Accessible tag</Tag>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
