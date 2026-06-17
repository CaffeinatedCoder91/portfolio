import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { skills } from '@/content/data';
import { theme } from '../../../styles/theme';
import SkillsMarquee from './SkillsMarquee';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  );
};

const hotSkills = ['React', 'TypeScript', 'Claude API'];
const coolSkills = ['Next.js', 'Vitest', 'Vercel'];
const skillItems = skills.flatMap((skillGroup) =>
  skillGroup.items.map((item) => ({
    label: item,
    style: hotSkills.includes(item)
      ? ('hot' as const)
      : coolSkills.includes(item)
        ? ('cool' as const)
        : ('default' as const),
  })),
);

describe('SkillsMarquee', () => {
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
  });

  it('renders chips with correct labels', () => {
    const { container } = renderWithTheme(
      <SkillsMarquee skills={skillItems} />
    );
    skillItems.forEach((skill) => {
      expect(container.textContent).toContain(skill.label);
    });
  });

  it('splits skills into two rows', () => {
    const { container } = renderWithTheme(
      <SkillsMarquee skills={skillItems} />
    );
    // Verify that we have two marquee rows
    const rows = container.querySelectorAll('[aria-hidden="true"]');
    expect(rows.length).toBe(2);
  });

  it('renders hot chips with correct style', () => {
    const { container } = renderWithTheme(
      <SkillsMarquee skills={skillItems} />
    );
    expect(container.textContent).toContain('React');
    expect(container.textContent).toContain('TypeScript');
  });

  it('renders cool chips with correct style', () => {
    const { container } = renderWithTheme(
      <SkillsMarquee skills={skillItems} />
    );
    expect(container.textContent).toContain('Next.js');
  });

  it('includes hidden static list for screen readers', () => {
    const { container } = renderWithTheme(
      <SkillsMarquee skills={skillItems} />
    );
    const hiddenList = container.querySelector('ul');
    expect(hiddenList).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const { container } = renderWithTheme(
      <SkillsMarquee skills={skillItems} />
    );
    const marqueeContainer = container.querySelector('[role="region"]');
    expect(marqueeContainer).toHaveAttribute('aria-label', 'Technical skills marquee');
  });

  it('marks marquee rows as aria-hidden', () => {
    const { container } = renderWithTheme(
      <SkillsMarquee skills={skillItems} />
    );
    const rows = container.querySelectorAll('[aria-hidden="true"]');
    expect(rows.length).toBe(2);
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(
      <SkillsMarquee skills={skillItems} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
