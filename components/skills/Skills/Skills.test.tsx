import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { skills } from '@/content/data';
import { theme } from '@/styles/theme';
import Skills from './Skills';

vi.mock('./SkillsWrapper', () => ({
  default: ({ skills: skillItems }: { skills: { label: string }[] }) => (
    <ul aria-label="skills">
      {skillItems.map((skill) => (
        <li key={skill.label}>{skill.label}</li>
      ))}
    </ul>
  ),
}));

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('Skills', () => {
  beforeEach(() => {
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it('renders the skills section with flattened content data', () => {
    renderWithTheme(<Skills />);

    expect(screen.getByText('002 / SKILLS')).toBeInTheDocument();
    skills.flatMap((skillGroup) => skillGroup.items).forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<Skills />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
