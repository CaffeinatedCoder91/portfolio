import type { Meta, StoryObj } from '@storybook/nextjs';
import { CTA } from '@/components/cta';

const meta: Meta<typeof CTA> = {
  title: 'Sections/CTA',
  component: CTA,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CTA>;

export const Default: Story = {};
