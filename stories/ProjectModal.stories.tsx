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
  title: 'Komorebi: Plant & Terrarium Shop',
  category: 'E-commerce',
  image: '/images/komorebi/komorebi-listing.webp',
  images: [
    '/images/komorebi/komorebi-listing.webp',
    '/images/komorebi/komorebi.webp',
    '/images/komorebi/komorebi-product.webp',
    '/images/komorebi/komorebi-custom-2.webp',
    '/images/komorebi/komorebi-custom-3.webp',
  ],
  blurb: 'An e-commerce platform for rare plants and terrariums, with a full storefront, product catalogue and checkout flow.',
  tags: ['Next.js', 'React', 'TypeScript', 'Shopify API'],
  note: 'Private build · not yet deployed',
  points: [
    'Built a complete Next.js storefront for rare plants and terrariums: product catalogue, product detail pages, cart and checkout flow.',
    'Reusable component system: ProductCard, SpecimenTable, Accordion, AcquireButton, designed around plant/terrarium product attributes.',
    'Mobile-first responsive design; integrated Shopify and payment systems.',
    'Security audit and hardening: environment variables, HTTP headers, form security, validation and error messaging.',
  ],
};

const triggerRef = React.createRef<HTMLElement>();
const handleClose = () => {};

export const Open: Story = {
  args: {
    project: mockProject,
    color: 'shu',
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
    project: mockProject,
    color: 'shu',
    onClose: handleClose,
    triggerRef,
  },
};

export const SingleImage: Story = {
  args: {
    project: {
      title: 'Dataground',
      category: 'AI',
      image: '/images/dataground/dataground.webp',
      blurb: 'Geospatial AI build for assessing address and location risk from natural-language prompts.',
      tags: ['Next.js', 'TypeScript', 'Claude API', 'Mapbox', 'Geospatial'],
      live: 'https://dataground-drab.vercel.app/',
      code: 'https://github.com/CaffeinatedCoder91/dataground',
      points: [
        'Built a geocoding workflow that turns address input into structured location data.',
        'Integrated the Claude API to interpret user prompts and generate risk assessment summaries.',
        'Combined geospatial signals with AI-assisted assessment logic to surface location risk clearly.',
      ],
    },
    color: 'ai',
    onClose: handleClose,
    triggerRef,
  },
};
