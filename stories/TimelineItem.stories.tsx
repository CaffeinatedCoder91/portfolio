import type { Meta, StoryObj } from '@storybook/nextjs';
import TimelineItem from '../components/timeline/TimelineItem';

const meta = {
  title: 'Components/TimelineItem',
  component: TimelineItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TimelineItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPoints: Story = {
  args: {
    period: 'Nov 2022 – Present',
    role: 'Frontend Engineer',
    org: 'Future Plc · London (Remote)',
    color: 'ai',
    points: [
      'Designed and maintained a 96-component shared React library serving 6+ storefronts',
      'Owned e-commerce features end to end: product discovery, shopping cart, checkout flows',
      'Reduced API calls by 80–90% through debouncing and intelligent caching',
      'Built a complex campaign management system with dynamic forms and real-time preview',
      'Implemented WCAG 2.1 AA accessibility standards across all components',
      'Conducted code reviews emphasising quality, accessibility, and maintainability',
    ],
  },
};

export const WithDescription: Story = {
  args: {
    period: 'Jul 2021 – Oct 2021',
    role: 'Intern Developer',
    org: 'Future Plc',
    color: 'mizu',
    desc: 'Built interactive React features for high-traffic sites; improved test coverage and learned debugging best practices across real production codebases.',
  },
};

export const EducationItem: Story = {
  args: {
    period: '2012',
    role: 'BSc Biology',
    org: 'Kingston University',
    color: 'mizu',
  },
};
