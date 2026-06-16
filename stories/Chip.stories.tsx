import type { Meta, StoryObj } from '@storybook/nextjs';
import Chip from '../components/ui/Chip';
import { InlineRow } from './StoryPrimitives.styles';

const meta = {
  title: 'UI/Chip',
  component: Chip,
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    $style: 'default',
    children: 'React',
  },
};

export const Hot: Story = {
  args: {
    $style: 'hot',
    children: 'Featured',
  },
};

export const Cool: Story = {
  args: {
    $style: 'cool',
    children: 'New',
  },
};

export const AllVariants: Story = {
  args: { children: 'Chip' },
  render: () => (
    <InlineRow>
      <Chip $style="default">Default Chip</Chip>
      <Chip $style="hot">Hot Chip</Chip>
      <Chip $style="cool">Cool Chip</Chip>
    </InlineRow>
  ),
};

export const TechStack: Story = {
  args: { children: 'Chip' },
  render: () => (
    <InlineRow>
      <Chip>React</Chip>
      <Chip>TypeScript</Chip>
      <Chip>Next.js</Chip>
      <Chip>Styled Components</Chip>
      <Chip>Vitest</Chip>
    </InlineRow>
  ),
};
