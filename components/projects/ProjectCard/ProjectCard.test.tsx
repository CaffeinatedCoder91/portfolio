import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import ProjectCard from './ProjectCard';
import type { Project } from '@/lib/types';

const mockProject: Project = {
  title: 'Test Project',
  category: 'AI',
  blurb: 'This is a test project blurb.',
  tags: ['React', 'TypeScript', 'Next.js'],
  points: ['Point 1', 'Point 2'],
  live: 'https://example.com',
  code: 'https://github.com/example',
};

const mockOnOpen = vi.fn();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ProjectCard', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the project title', () => {
    renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={0} onOpen={mockOnOpen} />
    );
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the project blurb', () => {
    renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={0} onOpen={mockOnOpen} />
    );
    expect(screen.getByText('This is a test project blurb.')).toBeInTheDocument();
  });

  it('renders the project category tag', () => {
    renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={0} onOpen={mockOnOpen} />
    );
    const tags = screen.getAllByText('AI');
    expect(tags.length).toBeGreaterThan(0);
  });

  it('renders tech tags', () => {
    renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={0} onOpen={mockOnOpen} />
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('renders live and code links', () => {
    renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={0} onOpen={mockOnOpen} />
    );
    const liveLink = screen.getByRole('link', { name: /Live/ });
    const codeLink = screen.getByRole('link', { name: /Code/ });
    expect(liveLink).toHaveAttribute('href', 'https://example.com');
    expect(codeLink).toHaveAttribute('href', 'https://github.com/example');
  });

  it('renders status note when no links available', () => {
    const projectWithNote: Project = {
      ...mockProject,
      live: undefined,
      code: undefined,
      note: 'Work in progress',
    };
    renderWithTheme(
      <ProjectCard project={projectWithNote} color="ai" index={0} onOpen={mockOnOpen} />
    );
    expect(screen.getByText('Work in progress')).toBeInTheDocument();
  });

  it('calls onOpen when clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={2} onOpen={mockOnOpen} />
    );
    const card = container.querySelector('[aria-label="Open Test Project"]');
    expect(card).toBeInTheDocument();

    await user.click(card as Element);
    expect(mockOnOpen).toHaveBeenCalledWith(2);
  });

  it('calls onOpen when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={1} onOpen={mockOnOpen} />
    );
    const card = container.querySelector('[aria-label="Open Test Project"]') as HTMLElement;
    card.focus();
    await user.keyboard('{Enter}');
    expect(mockOnOpen).toHaveBeenCalledWith(1);
  });

  it('calls onOpen when Space key is pressed', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={3} onOpen={mockOnOpen} />
    );
    const card = container.querySelector('[aria-label="Open Test Project"]') as HTMLElement;
    card.focus();
    await user.keyboard(' ');
    expect(mockOnOpen).toHaveBeenCalledWith(3);
  });

  it('links stop propagation and do not call onOpen', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={0} onOpen={mockOnOpen} />
    );

    await user.click(screen.getByRole('link', { name: /Live/ }));
    await user.click(screen.getByRole('link', { name: /Code/ }));

    expect(mockOnOpen).not.toHaveBeenCalled();
  });

  it('has accessible label and is keyboard focusable', () => {
    const { container } = renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={0} onOpen={mockOnOpen} />
    );
    const card = container.querySelector('[aria-label="Open Test Project"]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <ProjectCard project={mockProject} color="ai" index={0} onOpen={mockOnOpen} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
