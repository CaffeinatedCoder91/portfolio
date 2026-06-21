import type { Meta, StoryObj } from '@storybook/nextjs';
import Eyebrow from '../components/ui/Eyebrow';
import { Stack } from './StoryPrimitives.styles';

const meta = {
  title: 'UI/Eyebrow',
  component: Eyebrow,
  tags: ['autodocs'],
} satisfies Meta<typeof Eyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    $color: 'kincha',
    children: 'About me',
  },
};

export const Numbered: Story = {
  args: {
    $number: '001',
    children: 'ABOUT',
  },
};

export const Ai: Story = {
  args: {
    $color: 'ai',
    children: 'Projects',
  },
};

export const Shu: Story = {
  args: {
    $color: 'shu',
    children: 'Featured',
  },
};

export const Matcha: Story = {
  args: {
    $color: 'matcha',
    children: 'Skills',
  },
};

export const AllColors: Story = {
  args: { children: 'Eyebrow' },
  render: () => (
    <Stack>
      <Eyebrow $color="kincha">Kincha: Ochre</Eyebrow>
      <Eyebrow $color="ai">AI: Indigo</Eyebrow>
      <Eyebrow $color="shu">Shu: Vermilion</Eyebrow>
      <Eyebrow $color="matcha">Matcha: Moss</Eyebrow>
      <Eyebrow $color="mizu">Mizu: Water Blue</Eyebrow>
      <Eyebrow $color="fuji">Fuji: Wisteria</Eyebrow>
      <Eyebrow $number="001">ABOUT</Eyebrow>
    </Stack>
  ),
};
