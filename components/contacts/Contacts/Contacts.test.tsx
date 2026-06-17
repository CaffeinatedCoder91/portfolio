import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import Contacts from './Contacts';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('Contacts', () => {
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

  it('renders title screen with contacts heading', () => {
    const { container } = renderWithTheme(<Contacts />);
    const heading = container.querySelector('h1');
    expect(heading?.textContent).toContain('CONTACTS');
  });

  it('renders breadcrumb navigation', () => {
    const { container } = renderWithTheme(<Contacts />);
    expect(container.textContent).toContain('Home');
    expect(container.textContent).toContain('Contacts');
  });

  it('renders contact section heading', () => {
    const { getByText } = renderWithTheme(<Contacts />);
    expect(getByText("Let's build something")).toBeInTheDocument();
  });

  it('renders contact section subtitle', () => {
    const { getByText } = renderWithTheme(<Contacts />);
    expect(
      getByText("Got a role, a project, or just want to say hi? My inbox is open.")
    ).toBeInTheDocument();
  });

  it('renders all four contact cards', () => {
    const { getAllByRole } = renderWithTheme(<Contacts />);
    const links = getAllByRole('link');
    const contactLinks = links.filter(
      (link) =>
        link.getAttribute('href')?.includes('mailto:') ||
        link.getAttribute('href')?.includes('tel:') ||
        link.getAttribute('href')?.includes('linkedin') ||
        link.getAttribute('href')?.includes('github')
    );
    expect(contactLinks).toHaveLength(4);
  });

  it('renders email with mailto link', () => {
    const { getByRole } = renderWithTheme(<Contacts />);
    const emailLink = getByRole('link', { name: /joannamjosep@gmail.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:joannamjosep@gmail.com');
  });

  it('renders phone with tel link', () => {
    const { getByRole } = renderWithTheme(<Contacts />);
    const phoneLink = getByRole('link', { name: /07388 039256/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+447388039256');
  });

  it('renders linkedin with target blank', () => {
    const { getByRole } = renderWithTheme(<Contacts />);
    const linkedinLink = getByRole('link', { name: /joannamjoseph/i });
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders github with target blank', () => {
    const { getByRole } = renderWithTheme(<Contacts />);
    const githubLink = getByRole('link', { name: /CaffeinatedCoder91/i });
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders cv download link', () => {
    const { getByRole } = renderWithTheme(<Contacts />);
    const cvLink = getByRole('link', { name: /Download CV/i });
    expect(cvLink).toHaveAttribute('href', '/cv.pdf');
    expect(cvLink).toHaveAttribute('target', '_blank');
    expect(cvLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<Contacts />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
