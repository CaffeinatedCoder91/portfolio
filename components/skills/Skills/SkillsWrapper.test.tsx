import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { skills } from '@/content/data';
import SkillsWrapper from './SkillsWrapper';

vi.mock('next/dynamic', () => ({
  default: () => {
    const DynamicSkillsMarquee = ({ skills: skillItems }: { skills: { label: string }[] }) => (
      <div role="region" aria-label="Technical skills marquee">
        {skillItems.map((skill) => (
          <span key={skill.label}>{skill.label}</span>
        ))}
      </div>
    );

    return DynamicSkillsMarquee;
  },
}));

vi.mock('./SkillsMarquee', () => ({
  default: ({ skills: skillItems }: { skills: { label: string }[] }) => (
    <div role="region" aria-label="Technical skills marquee">
      {skillItems.map((skill) => (
        <span key={skill.label}>{skill.label}</span>
      ))}
    </div>
  ),
}));

const skillItems = skills.flatMap((skillGroup) =>
  skillGroup.items.map((item) => ({
    label: item,
    style: 'default' as const,
  })),
);

describe('SkillsWrapper', () => {
  it('renders the marquee with skills from content data', () => {
    render(<SkillsWrapper skills={skillItems} />);

    expect(screen.getByRole('region', { name: 'Technical skills marquee' })).toBeInTheDocument();
    expect(screen.getByText(skills[0].items[0])).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<SkillsWrapper skills={skillItems} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
