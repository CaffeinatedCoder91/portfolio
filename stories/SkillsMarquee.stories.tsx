import type { Meta, StoryObj } from '@storybook/nextjs';
import SkillsMarquee from '../components/skills/Skills/SkillsMarquee';

const meta = {
  title: 'Sections/SkillsMarquee',
  component: SkillsMarquee,
  tags: ['autodocs'],
} satisfies Meta<typeof SkillsMarquee>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSkills = [
  { label: 'React', style: 'hot' as const },
  { label: 'TypeScript', style: 'hot' as const },
  { label: 'Claude API', style: 'hot' as const },
  { label: 'Next.js', style: 'cool' as const },
  { label: 'Vitest', style: 'cool' as const },
  { label: 'Vercel', style: 'cool' as const },
  { label: 'JavaScript', style: 'default' as const },
  { label: 'HTML5', style: 'default' as const },
  { label: 'CSS3', style: 'default' as const },
  { label: 'Storybook', style: 'default' as const },
];

export const Default: Story = {
  args: {
    skills: mockSkills,
  },
};

export const Paused: Story = {
  args: {
    skills: mockSkills,
  },
  parameters: {
    docs: {
      description: {
        story: 'Animation is paused in Storybook to show static layout',
      },
    },
  },
};

export const WithManySkills: Story = {
  args: {
    skills: [
      ...mockSkills,
      { label: 'Docker', style: 'default' as const },
      { label: 'PostgreSQL', style: 'default' as const },
      { label: 'GraphQL', style: 'default' as const },
      { label: 'Redux', style: 'default' as const },
    ],
  },
};
