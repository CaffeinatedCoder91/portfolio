import type { Meta, StoryObj } from '@storybook/nextjs';
import Hero from '../components/hero/Hero/Hero';

const meta = {
  title: 'Sections/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    inkCanvas: null,
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InkCanvasMocked: Story = {};
