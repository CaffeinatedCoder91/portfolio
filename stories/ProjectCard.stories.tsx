import type { Meta, StoryObj } from '@storybook/nextjs';
import ProjectCard from '../components/projects/ProjectCard';
import type { Project } from '@/lib/types';

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleOpen = () => {};

const mockProject: Project = {
  title: 'Flow — AI-Powered Kanban',
  category: 'AI',
  image: '',
  blurb: 'Full-stack kanban platform with an AI assistant that reads and mutates your board from plain English.',
  tags: ['Next.js', 'TypeScript', 'Claude API', 'PostgreSQL', 'Docker'],
  points: [
    'Built end to end: React frontend, Node serverless API (15+ endpoints), Postgres via Supabase with row-level security.',
    'AI assistant built on Claude tool-use API — autonomously creates, updates and reorders tasks from natural language.',
  ],
  live: 'https://flow-kanban-coral.vercel.app/',
  code: 'https://github.com/CaffeinatedCoder91/Flow-Kanban',
};

export const WithLiveAndCode: Story = {
  args: {
    project: mockProject,
    color: 'ai',
    index: 0,
    onOpen: handleOpen,
  },
};

export const WithoutLinks: Story = {
  args: {
    project: {
      title: 'komorebi — Shopify Store',
      category: 'E-commerce',
      image: '',
      blurb: 'Full-stack e-commerce platform showcasing React architecture and UX thinking, end to end.',
      tags: ['Next.js', 'React', 'TypeScript', 'Shopify API'],
      note: 'Private build · not yet deployed',
      points: [
        'Complete Next.js storefront: product catalogue, product detail pages, cart and checkout flow.',
      ],
    } as Project,
    color: 'shu',
    index: 1,
    onOpen: handleOpen,
  },
};

export const WithPlaceholder: Story = {
  args: {
    project: {
      title: 'vesper',
      category: 'AI',
      image: '',
      blurb: 'A personal PWA where you speak your thoughts freely and an AI companion responds warmly.',
      tags: ['TypeScript', 'PWA', 'AI'],
      points: ['Progressive web app for voice-first journaling.'],
      code: 'https://github.com/CaffeinatedCoder91/vesper',
    } as Project,
    color: 'mizu',
    index: 3,
    onOpen: handleOpen,
  },
};
