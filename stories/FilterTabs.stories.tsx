import type { Meta, StoryObj } from '@storybook/nextjs';
import FilterTabs from '../components/projects/Projects/FilterTabs';
import type { Project } from '@/lib/types';

const meta = {
  title: 'Components/FilterTabs',
  component: FilterTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof FilterTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProjects: Project[] = [
  {
    title: 'Flow',
    category: 'AI',
    image: '',
    blurb: 'AI Kanban',
    tags: ['Next.js'],
    points: [],
    live: 'https://example.com',
  },
  {
    title: 'komorebi',
    category: 'E-commerce',
    image: '',
    blurb: 'Shopify Store',
    tags: ['React'],
    points: [],
  },
  {
    title: 'data-quality-checker',
    category: 'Tooling',
    image: '',
    blurb: 'Data tool',
    tags: ['TypeScript'],
    points: [],
    live: 'https://example.com',
  },
  {
    title: 'vesper',
    category: 'AI',
    image: '',
    blurb: 'PWA journaling',
    tags: ['TypeScript'],
    points: [],
    code: 'https://github.com/example',
  },
  {
    title: 'grandma',
    category: 'Experiment',
    image: '',
    blurb: 'Experiment',
    tags: ['TypeScript'],
    points: [],
    code: 'https://github.com/example',
  },
];

export const Default: Story = {
  args: {
    projects: mockProjects,
    activeCategory: 'All',
    onChange: (category) => console.log('Selected:', category),
  },
};
