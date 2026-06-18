import type { Meta, StoryObj } from '@storybook/nextjs';
import ThemeToggle from '../components/nav/Nav/ThemeToggle';

const meta = {
  title: 'Navigation/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
