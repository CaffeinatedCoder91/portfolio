import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { experience, education } from '../../../content/data';
import { theme } from '../../../styles/theme';
import Timeline from './Timeline';

vi.mock('../../ui/ScrollReveal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Timeline', () => {
  it('renders the section with correct title', () => {
    renderWithTheme(<Timeline />);

    expect(screen.getByText('Experience & education')).toBeInTheDocument();
  });

  it('renders Experience heading', () => {
    renderWithTheme(<Timeline />);

    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders Education heading', () => {
    renderWithTheme(<Timeline />);

    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  it('renders all experience items', () => {
    renderWithTheme(<Timeline />);

    experience.forEach((role) => {
      expect(screen.getByText(role.role)).toBeInTheDocument();
    });
  });

  it('renders all education items', () => {
    renderWithTheme(<Timeline />);

    education.forEach((edu) => {
      expect(screen.getByText(edu.role)).toBeInTheDocument();
    });
  });

  it('renders experience with bullets', () => {
    renderWithTheme(<Timeline />);

    const feRole = experience.find((r) => r.role === 'Frontend Engineer');
    if (feRole?.points) {
      const [firstPoint] = feRole.points;
      expect(screen.getByText(new RegExp(firstPoint.slice(0, 20)))).toBeInTheDocument();
    }
  });

  it('renders intern description without bullets', () => {
    renderWithTheme(<Timeline />);

    const internRole = experience.find((r) => r.role === 'Intern Developer');
    if (internRole?.desc) {
      expect(screen.getByText(new RegExp(internRole.desc.slice(0, 30)))).toBeInTheDocument();
    }
  });

  it('renders BSc Biology education', () => {
    renderWithTheme(<Timeline />);

    expect(screen.getByText('BSc Biology')).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<Timeline />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
