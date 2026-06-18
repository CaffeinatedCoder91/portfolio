import type { Meta, StoryObj } from '@storybook/nextjs';
import ScrollCue from '../components/hero/Hero/ScrollCue';
import { CuePreview } from './StoryPrimitives.styles';

const meta = {
  title: 'Hero/ScrollCue',
  component: ScrollCue,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <CuePreview>
        <Story />
      </CuePreview>
    ),
  ],
} satisfies Meta<typeof ScrollCue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
