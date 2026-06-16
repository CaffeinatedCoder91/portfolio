import type { Meta, StoryObj } from '@storybook/nextjs';
import ScrollReveal from '../components/ui/ScrollReveal';
import { RevealCard, Stack } from './StoryPrimitives.styles';

const meta = {
  title: 'UI/ScrollReveal',
  component: ScrollReveal,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <RevealCard>Scroll down to see reveal animation</RevealCard>,
  },
};

export const WithDelay: Story = {
  args: {
    $delay: 200,
    children: <RevealCard>This element has a 200ms delay</RevealCard>,
  },
};

export const MultipleElements: Story = {
  render: () => (
    <Stack>
      <ScrollReveal>
        <RevealCard>First element</RevealCard>
      </ScrollReveal>
      <ScrollReveal $delay={100}>
        <RevealCard>Second element (100ms delay)</RevealCard>
      </ScrollReveal>
      <ScrollReveal $delay={200}>
        <RevealCard>Third element (200ms delay)</RevealCard>
      </ScrollReveal>
    </Stack>
  ),
  args: {
    children: 'Multiple reveals',
  },
};
