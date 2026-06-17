import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { projects } from '@/content/data';
import { theme } from '@/styles/theme';
import ProjectCard from './ProjectCard';

const projectWithLinks = projects.find((project) => project.live && project.code) ?? projects[0];
const projectWithNote = projects.find((project) => project.note && !project.live && !project.code) ?? projects[1];

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
      <ProjectCard project={projectWithLinks} color="ai" index={0} onOpen={mockOnOpen} />
    );
    expect(screen.getByText(projectWithLinks.title)).toBeInTheDocument();
  });

  it('renders the project blurb', () => {
    renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={0} onOpen={mockOnOpen} />
    );
    expect(screen.getByText(projectWithLinks.blurb)).toBeInTheDocument();
  });

  it('renders the project category tag', () => {
    renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={0} onOpen={mockOnOpen} />
    );
    const tags = screen.getAllByText(projectWithLinks.category);
    expect(tags.length).toBeGreaterThan(0);
  });

  it('renders tech tags', () => {
    renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={0} onOpen={mockOnOpen} />
    );
    projectWithLinks.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders live and code links', () => {
    renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={0} onOpen={mockOnOpen} />
    );
    const liveLink = screen.getByRole('link', { name: /Live/ });
    const codeLink = screen.getByRole('link', { name: /Code/ });
    expect(liveLink).toHaveAttribute('href', projectWithLinks.live);
    expect(codeLink).toHaveAttribute('href', projectWithLinks.code);
  });

  it('renders status note when no links available', () => {
    renderWithTheme(
      <ProjectCard project={projectWithNote} color="ai" index={0} onOpen={mockOnOpen} />
    );
    expect(screen.getByText(projectWithNote.note ?? '')).toBeInTheDocument();
  });

  it('calls onOpen when clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={2} onOpen={mockOnOpen} />
    );
    const card = container.querySelector(`[aria-label="Open ${projectWithLinks.title}"]`);
    expect(card).toBeInTheDocument();

    await user.click(card as Element);
    expect(mockOnOpen).toHaveBeenCalledWith(2);
  });

  it('calls onOpen when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={1} onOpen={mockOnOpen} />
    );
    const card = container.querySelector(`[aria-label="Open ${projectWithLinks.title}"]`) as HTMLElement;
    card.focus();
    await user.keyboard('{Enter}');
    expect(mockOnOpen).toHaveBeenCalledWith(1);
  });

  it('calls onOpen when Space key is pressed', async () => {
    const user = userEvent.setup();
    const { container } = renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={3} onOpen={mockOnOpen} />
    );
    const card = container.querySelector(`[aria-label="Open ${projectWithLinks.title}"]`) as HTMLElement;
    card.focus();
    await user.keyboard(' ');
    expect(mockOnOpen).toHaveBeenCalledWith(3);
  });

  it('links stop propagation and do not call onOpen', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={0} onOpen={mockOnOpen} />
    );

    await user.click(screen.getByRole('link', { name: /Live/ }));
    await user.click(screen.getByRole('link', { name: /Code/ }));

    expect(mockOnOpen).not.toHaveBeenCalled();
  });

  it('has accessible label and is keyboard focusable', () => {
    const { container } = renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={0} onOpen={mockOnOpen} />
    );
    const card = container.querySelector(`[aria-label="Open ${projectWithLinks.title}"]`);
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('has no axe violations', async () => {
    const { container } = renderWithTheme(
      <ProjectCard project={projectWithLinks} color="ai" index={0} onOpen={mockOnOpen} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
