import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { name } from '@/content/data';
import { theme } from '@/styles/theme';
import NavInner from './NavInner';

const mockUsePathname = vi.fn(() => '/');

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('NavInner', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders the configured name and primary links', () => {
    renderWithTheme(<NavInner name={name} />);

    expect(screen.getByRole('link', { name })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects');
    expect(screen.getByRole('link', { name: 'Contacts' })).toHaveAttribute('href', '/contacts');
  });

  it('marks contacts active on the contacts route', () => {
    mockUsePathname.mockReturnValue('/contacts');

    renderWithTheme(<NavInner name={name} />);

    expect(screen.getByRole('link', { name: 'Contacts' })).toHaveAttribute('aria-current', 'page');
  });

  it('toggles the mobile menu button expanded state', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(<NavInner name={name} />);

    const button = container.querySelector('button[aria-label="Menu"]');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button as HTMLElement);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<NavInner name={name} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
