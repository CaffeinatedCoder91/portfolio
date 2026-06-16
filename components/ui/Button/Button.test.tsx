import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import Button from './Button';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  );
};

describe('Button', () => {
  it('renders with ghost variant by default', () => {
    const { container } = renderWithTheme(
      <Button>Click me</Button>
    );
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('button')).toHaveTextContent('Click me');
  });

  it('renders primary variant', () => {
    const { container } = renderWithTheme(
      <Button $variant="primary">See my projects →</Button>
    );
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('button')).toHaveTextContent('See my projects →');
  });

  it('renders ghost variant', () => {
    const { container } = renderWithTheme(
      <Button $variant="ghost">Get in touch</Button>
    );
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('button')).toHaveTextContent('Get in touch');
  });

  it('renders cv variant', () => {
    const { container } = renderWithTheme(
      <Button $variant="cv">CV ↓</Button>
    );
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('button')).toHaveTextContent('CV ↓');
  });

  it('renders as a link when href is provided', () => {
    const { container } = renderWithTheme(
      <Button href="/contact">Contact me</Button>
    );
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
    expect(link).toHaveTextContent('Contact me');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { container } = renderWithTheme(
      <Button onClick={handleClick}>Click me</Button>
    );
    const button = container.querySelector('button');
    button?.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(
      <Button $variant="primary">Accessible button</Button>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
