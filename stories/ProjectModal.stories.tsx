import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import ProjectModal from '../components/projects/ProjectModal/ProjectModal';
import type { Project } from '@/lib/types';

const meta = {
  title: 'Components/ProjectModal',
  component: ProjectModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockProject: Project = {
  title: 'Flow: AI-Powered Kanban',
  category: 'AI',
  blurb: 'Full-stack kanban platform with an AI assistant that reads and mutates your board from plain English.',
  tags: ['Next.js', 'TypeScript', 'Claude API', 'PostgreSQL', 'Docker'],
  points: [
    'Built end to end: React frontend, Node serverless API (15+ endpoints), Postgres via Supabase with row-level security.',
    'AI assistant built on Claude tool-use API, autonomously creating, updating and reordering tasks from natural language.',
    'Discrete AI agents: standup narrative generator, deadline risk scanner, task splitter, smart reschedule, duplicate detector.',
    'AI pipeline parses free text and uploaded files (.txt/.pdf/.docx) into structured task objects.',
    'Shipped with full test coverage, Supabase Auth, Redis rate limiting and Sentry observability.',
  ],
  live: 'https://flow-kanban-coral.vercel.app/',
  code: 'https://github.com/CaffeinatedCoder91/Flow-Kanban',
};

const triggerRef = React.createRef<HTMLElement>();
const handleClose = () => {};

export const Open: Story = {
  args: {
    project: mockProject,
    color: 'ai',
    onClose: handleClose,
    triggerRef,
  },
};

export const Closed: Story = {
  args: {
    project: null,
    color: 'ai',
    onClose: handleClose,
    triggerRef,
  },
};

export const WithoutLinks: Story = {
  args: {
    project: {
      title: 'komorebi: Shopify Store',
      category: 'E-commerce',
      blurb: 'Full-stack e-commerce platform showcasing React architecture and UX thinking, end to end.',
      tags: ['Next.js', 'React', 'TypeScript', 'Shopify API'],
      note: 'Private build · not yet deployed',
      points: [
        'Complete Next.js storefront: product catalogue, product detail pages, cart and checkout flow.',
        'Reusable component system: ProductCard, SpecimenTable, Accordion, AcquireButton.',
        'Mobile-first responsive design; integrated Shopify and payment systems.',
      ],
    } as Project,
    color: 'shu',
    onClose: handleClose,
    triggerRef,
  },
};
