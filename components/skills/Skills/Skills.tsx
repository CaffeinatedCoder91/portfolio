import React from 'react';
import ScrollReveal from '../../ui/ScrollReveal';
import Eyebrow from '../../ui/Eyebrow';
import { skills as skillsData } from '../../../content/data';
import { Section, SectionContent, Title } from './Skills.styles';
import SkillsWrapper from './SkillsWrapper';

const Skills = () => {
  // Flatten skills and determine chip styles
  const hotSkills = ['React', 'TypeScript', 'Claude API'];
  const coolSkills = ['Next.js', 'Vitest', 'Vercel'];

  const flattenedSkills = skillsData.flatMap((skillGroup) =>
    skillGroup.items.map((item) => ({
      label: item,
      style: hotSkills.includes(item)
        ? ('hot' as const)
        : coolSkills.includes(item)
          ? ('cool' as const)
          : ('default' as const),
    }))
  );

  return (
    <ScrollReveal>
      <Section id="skills">
        <SectionContent>
          <Eyebrow $number="002">SKILLS</Eyebrow>
          <Title>
            Things I reach for,{' '}
            <em>first.</em>
          </Title>
          <SkillsWrapper skills={flattenedSkills} />
        </SectionContent>
      </Section>
    </ScrollReveal>
  );
};

export default Skills;
