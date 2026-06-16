import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import NavInner from './NavInner';

const mockUsePathname = vi.fn(() => '/');

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Nav', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders the supplied name', () => {
    renderWithTheme(<NavInner name="Joanna Joseph" />);

    expect(screen.getByText('Joanna Joseph')).toBeInTheDocument();
  });

  it('renders three navigation links', () => {
    renderWithTheme(<NavInner name="Joanna Joseph" />);

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contacts' })).toBeInTheDocument();
  });

  it('marks the current page link active', () => {
    const { rerender } = renderWithTheme(<NavInner name="Joanna Joseph" />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'page',
    );

    mockUsePathname.mockReturnValue('/contacts');
    rerender(
      <ThemeProvider theme={theme}>
        <NavInner name="Joanna Joseph" />
      </ThemeProvider>,
    );

    expect(screen.getByRole('link', { name: 'Contacts' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });


  it('toggles the mobile menu button state', async () => {
    const user = userEvent.setup();
    renderWithTheme(<NavInner name="Joanna Joseph" />);
    const toggle = screen.getByLabelText('Menu');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('link', { name: 'Contacts' }));

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu on outside click', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <>
        <NavInner name="Joanna Joseph" />
        <main>Page content</main>
      </>,
    );
    const toggle = screen.getByLabelText('Menu');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByText('Page content'));

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<NavInner name="Joanna Joseph" />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
