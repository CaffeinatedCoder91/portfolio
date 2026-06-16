import type { Meta, StoryObj } from '@storybook/nextjs';
import Tag from '../components/ui/Tag';
import { TightInlineRow } from './StoryPrimitives.styles';

const meta = {
  title: 'UI/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    children: 'React',
  },
};

export const TechStack: Story = {
  args: { children: 'Tag' },
  render: () => (
    <TightInlineRow>
      <Tag>React</Tag>
      <Tag>TypeScript</Tag>
      <Tag>Next.js</Tag>
      <Tag>Styled Components</Tag>
      <Tag>Node.js</Tag>
      <Tag>GraphQL</Tag>
    </TightInlineRow>
  ),
};

export const WithSpecialChars: Story = {
  args: { children: 'Tag' },
  render: () => (
    <TightInlineRow>
      <Tag>C++</Tag>
      <Tag>C#</Tag>
      <Tag>Node.js</Tag>
      <Tag>Vue.js</Tag>
    </TightInlineRow>
  ),
};
