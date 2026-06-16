import type { Meta, StoryObj } from '@storybook/nextjs';
import About from '../components/about/About';

const meta = {
  title: 'Sections/About',
  component: About,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
