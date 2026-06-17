import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import ProjectModal from './ProjectModal';
import { theme } from '@/styles/theme';
import type { Project } from '@/lib/types';

const mockProject: Project = {
  title: 'Test Project',
  category: 'AI',
  blurb: 'Test blurb',
  tags: ['React', 'TypeScript'],
  points: [
    'First point about the project',
    'Second point about the project',
  ],
  live: 'https://example.com',
  code: 'https://github.com/example/project',
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>,
  );
};

describe('ProjectModal', () => {
  const mockOnClose = vi.fn();
  const mockTriggerRef = React.createRef<HTMLElement>();

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  it('returns null when project is null', () => {
    renderWithTheme(
      <ProjectModal
        project={null}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders project title', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders category tag', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.getAllByText('AI')).toHaveLength(2);
  });

  it('renders bullet points', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.getByText('First point about the project')).toBeInTheDocument();
    expect(screen.getByText('Second point about the project')).toBeInTheDocument();
  });

  it('renders tech tags', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders action links', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', mockProject.live);
    expect(links[1]).toHaveAttribute('href', mockProject.code);
  });

  it('calls onClose when close button is clicked', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const backdrop = document.querySelector('[role="dialog"]')?.parentElement as HTMLElement;
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not close when panel content is clicked', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const title = screen.getByText('Test Project');
    fireEvent.click(title);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('hides body overflow when open', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow when closed', () => {
    const { rerender } = renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <ThemeProvider theme={theme}>
        <ProjectModal
          project={null}
          onClose={mockOnClose}
          triggerRef={mockTriggerRef}
        />
      </ThemeProvider>,
    );

    expect(document.body.style.overflow).toBe('');
  });

  it('focuses close button on open', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('has no accessibility violations', async () => {
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });

  it('traps Tab and Shift+Tab within modal controls', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    const liveLink = screen.getByRole('link', { name: 'View live ↗' });
    const codeLink = screen.getByRole('link', { name: 'View code ↗' });

    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(liveLink).toHaveFocus();

    await user.tab();
    expect(codeLink).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(codeLink).toHaveFocus();
  });

  it('returns focus to the trigger when closed', () => {
    const trigger = document.createElement('article');
    trigger.tabIndex = 0;
    document.body.appendChild(trigger);
    const triggerRef: React.RefObject<HTMLElement | null> = { current: trigger };

    const { rerender } = renderWithTheme(
      <ProjectModal
        project={mockProject}
        onClose={mockOnClose}
        triggerRef={triggerRef}
      />,
    );

    rerender(
      <ThemeProvider theme={theme}>
        <ProjectModal
          project={null}
          onClose={mockOnClose}
          triggerRef={triggerRef}
        />
      </ThemeProvider>,
    );

    expect(trigger).toHaveFocus();
    trigger.remove();
  });
});
