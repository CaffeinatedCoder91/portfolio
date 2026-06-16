import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '../components/ui/Button';
import { InlineRow } from './StoryPrimitives.styles';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    $variant: 'primary',
    children: 'See my projects →',
  },
};

export const Ghost: Story = {
  args: {
    $variant: 'ghost',
    children: 'Get in touch',
  },
};

export const CV: Story = {
  args: {
    $variant: 'cv',
    children: 'CV ↓',
  },
};

export const AsLink: Story = {
  args: {
    $variant: 'primary',
    href: '#projects',
    children: 'View Projects',
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <InlineRow>
      <Button $variant="primary">Primary Button</Button>
      <Button $variant="ghost">Ghost Button</Button>
      <Button $variant="cv">CV Button</Button>
    </InlineRow>
  ),
};
