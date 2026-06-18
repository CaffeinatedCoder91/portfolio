import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import ThemeToggle from './ThemeToggle';

const storage = new Map<string, string>();

const getItem = vi.fn((key: string) => storage.get(key) ?? null);
const setItem = vi.fn((key: string, value: string) => {
  storage.set(key, value);
});

const localStorageMock: Storage = {
  get length() {
    return storage.size;
  },
  clear: () => storage.clear(),
  getItem,
  key: (index: number) => Array.from(storage.keys())[index] ?? null,
  removeItem: (key: string) => {
    storage.delete(key);
  },
  setItem,
};

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('ThemeToggle', () => {
  beforeEach(() => {
    storage.clear();
    getItem.mockClear();
    setItem.mockClear();
    document.documentElement.classList.remove('dark');
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: localStorageMock,
    });
  });

  it('defaults to light mode without the dark class', () => {
    renderWithTheme(<ThemeToggle />);

    expect(document.documentElement).not.toHaveClass('dark');
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  });

  it('reads saved dark mode on mount', () => {
    storage.set('theme', 'dark');

    renderWithTheme(<ThemeToggle />);

    expect(getItem).toHaveBeenCalledWith('theme');
    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
  });

  it('toggles the html class and writes localStorage', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ThemeToggle />);

    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }));

    expect(document.documentElement).toHaveClass('dark');
    expect(setItem).toHaveBeenLastCalledWith('theme', 'dark');

    await user.click(screen.getByRole('button', { name: 'Switch to light mode' }));

    expect(document.documentElement).not.toHaveClass('dark');
    expect(setItem).toHaveBeenLastCalledWith('theme', 'light');
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<ThemeToggle />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
