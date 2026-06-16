'use client';

import React from 'react';
import Chip from '../../ui/Chip';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { MarqueeContainer, MarqueeRow, HiddenScreenReaderList } from './Skills.styles';

interface SkillItem {
  label: string;
  style: 'hot' | 'cool' | 'default';
}

interface Props {
  skills: SkillItem[];
}

const SkillsMarquee = ({ skills }: Props) => {
  const prefersReduced = useReducedMotion();

  const row1 = skills.slice(0, Math.ceil(skills.length / 2));
  const row2 = skills.slice(Math.ceil(skills.length / 2));

  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

  return (
    <MarqueeContainer
      $prefersReduced={prefersReduced}
      role="region"
      aria-label="Technical skills marquee"
    >
      <MarqueeRow
        $duration={40}
        $prefersReduced={prefersReduced}
        aria-hidden="true"
      >
        {duplicatedRow1.map((skill, index) => (
          <Chip key={`${skill.label}-${index}`} $style={skill.style}>
            {skill.label}
          </Chip>
        ))}
      </MarqueeRow>

      <MarqueeRow
        $reverse
        $duration={50}
        $prefersReduced={prefersReduced}
        aria-hidden="true"
      >
        {duplicatedRow2.map((skill, index) => (
          <Chip key={`${skill.label}-${index}`} $style={skill.style}>
            {skill.label}
          </Chip>
        ))}
      </MarqueeRow>

      {/* Hidden static list for screen readers */}
      <HiddenScreenReaderList>
        <h3>All Skills:</h3>
        <ul>
          {skills.map((skill) => (
            <li key={skill.label}>{skill.label}</li>
          ))}
        </ul>
      </HiddenScreenReaderList>
    </MarqueeContainer>
  );
};

export default SkillsMarquee;
