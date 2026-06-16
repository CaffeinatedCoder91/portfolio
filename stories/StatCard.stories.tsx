import type { Meta, StoryObj } from '@storybook/nextjs';
import StatCard from '../components/ui/StatCard';
import { StatGrid } from './StoryPrimitives.styles';

const meta = {
  title: 'UI/StatCard',
  component: StatCard,
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Experience: Story = {
  args: {
    num: '5+',
    label: 'Years of coding',
  },
};

export const Projects: Story = {
  args: {
    num: '20+',
    label: 'Projects shipped',
  },
};

export const Performance: Story = {
  args: {
    num: '95+',
    label: 'Lighthouse score',
  },
};

export const Grid: Story = {
  args: { num: '5+', label: 'Years' },
  render: () => (
    <StatGrid>
      <StatCard num="5+" label="Years of coding" />
      <StatCard num="20+" label="Projects shipped" />
      <StatCard num="100%" label="Accessibility" />
      <StatCard num="95+" label="Lighthouse score" />
    </StatGrid>
  ),
};
