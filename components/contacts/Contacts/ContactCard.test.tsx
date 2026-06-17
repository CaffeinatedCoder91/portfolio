import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { contact } from '@/content/data';
import { theme } from '@/styles/theme';
import ContactCard from './ContactCard';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('ContactCard', () => {
  it('renders contact kind, glyph and value from content data', () => {
    const email = contact.items.find((item) => item.kind === 'Email');
    expect(email).toBeDefined();

    renderWithTheme(<ContactCard item={email ?? contact.items[0]} />);

    expect(screen.getByText(email?.kind ?? contact.items[0].kind)).toBeInTheDocument();
    expect(screen.getByText(email?.glyph ?? contact.items[0].glyph)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: email?.value ?? contact.items[0].value })).toHaveAttribute(
      'href',
      email?.href ?? contact.items[0].href,
    );
  });

  it('adds external link safety attributes for web profiles', () => {
    const github = contact.items.find((item) => item.kind === 'GitHub');
    expect(github).toBeDefined();

    renderWithTheme(<ContactCard item={github ?? contact.items[0]} />);

    const link = screen.getByRole('link', { name: github?.value ?? contact.items[0].value });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<ContactCard item={contact.items[0]} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
