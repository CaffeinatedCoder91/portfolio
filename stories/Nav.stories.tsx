import type { Meta, StoryObj } from '@storybook/nextjs';
import NavInner from '../components/nav/Nav/NavInner';

const meta = {
  title: 'Navigation/Nav',
  component: NavInner,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
} satisfies Meta<typeof NavInner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Joanna Joseph',
  },
};

export const ContactsActive: Story = {
  args: {
    name: 'Joanna Joseph',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/contacts',
      },
    },
  },
};
