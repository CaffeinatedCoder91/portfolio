'use client';

import dynamic from 'next/dynamic';

const SkillsMarquee = dynamic(() => import('./SkillsMarquee'), { ssr: false });

interface SkillItem {
  label: string;
  style: 'hot' | 'cool' | 'default';
}

interface Props {
  skills: SkillItem[];
}

const SkillsWrapper = ({ skills }: Props) => (
  <SkillsMarquee skills={skills} />
);

export default SkillsWrapper;
