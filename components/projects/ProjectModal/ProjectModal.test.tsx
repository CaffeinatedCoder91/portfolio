import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import ProjectModal from './ProjectModal';
import { projects } from '@/content/data';
import { theme } from '@/styles/theme';

const projectWithLinks = projects.find((project) => project.live && project.code) ?? projects[0];
const projectWithGallery =
  projects.find((project) => project.images && project.images.length > 1) ?? projects[0];

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
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.style.overscrollBehavior = '';
    document.documentElement.style.overscrollBehavior = '';
    delete document.body.dataset.projectModalOpen;
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.getByText(projectWithLinks.title)).toBeInTheDocument();
  });

  it('renders category tag', () => {
    renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.getAllByText(projectWithLinks.category)).toHaveLength(1);
  });

  it('renders bullet points', () => {
    renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    projectWithLinks.points.forEach((point) => {
      expect(screen.getByText(point)).toBeInTheDocument();
    });
  });

  it('renders tech tags', () => {
    renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    projectWithLinks.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders action links', () => {
    renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', projectWithLinks.live);
    expect(links[1]).toHaveAttribute('href', projectWithLinks.code);
  });

  it('renders gallery controls when multiple images are available', () => {
    renderWithTheme(
      <ProjectModal
        project={projectWithGallery}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.getByRole('button', { name: 'Previous screenshot' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next screenshot' })).toBeInTheDocument();
    expect(screen.getByText(`1 / ${projectWithGallery.images?.length ?? 1}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show screenshot 1' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('moves through gallery images with next and previous controls', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ProjectModal
        project={projectWithGallery}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Next screenshot' }));
    expect(screen.getByText(`2 / ${projectWithGallery.images?.length ?? 1}`)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Previous screenshot' }));
    expect(screen.getByText(`1 / ${projectWithGallery.images?.length ?? 1}`)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Previous screenshot' }));
    expect(
      screen.getByText(
        `${projectWithGallery.images?.length ?? 1} / ${projectWithGallery.images?.length ?? 1}`,
      ),
    ).toBeInTheDocument();
  });

  it('selects a gallery image from thumbnails', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <ProjectModal
        project={projectWithGallery}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Show screenshot 3' }));

    expect(screen.getByText(`3 / ${projectWithGallery.images?.length ?? 1}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show screenshot 3' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('does not render gallery controls when only one image is available', () => {
    renderWithTheme(
      <ProjectModal
        project={{ ...projectWithLinks, image: '/images/example.webp', images: undefined }}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.queryByRole('button', { name: 'Previous screenshot' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next screenshot' })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
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
        project={projectWithLinks}
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
        project={projectWithLinks}
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
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const title = screen.getByText(projectWithLinks.title);
    fireEvent.click(title);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('locks document scrolling when open', () => {
    renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.overscrollBehavior).toBe('none');
    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.width).toBe('100%');
    expect(document.documentElement.style.overscrollBehavior).toBe('none');
    expect(document.body.dataset.projectModalOpen).toBe('true');
  });

  it('restores document scroll styles when closed', () => {
    const { rerender } = renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.position).toBe('fixed');

    rerender(
      <ThemeProvider theme={theme}>
        <ProjectModal
          project={null}
          onClose={mockOnClose}
          triggerRef={mockTriggerRef}
        />
      </ThemeProvider>,
    );

    expect(document.body.style.position).toBe('');
    expect(document.body.style.top).toBe('');
    expect(document.body.style.width).toBe('');
    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.overscrollBehavior).toBe('');
    expect(document.documentElement.style.overscrollBehavior).toBe('');
    expect(document.body.dataset.projectModalOpen).toBeUndefined();
  });

  it('holds the current page position and restores it on close', () => {
    const scrollToSpy = vi.mocked(window.scrollTo);
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 2400,
    });

    const { rerender } = renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(document.body.style.top).toBe('-2400px');
    expect(scrollToSpy).not.toHaveBeenCalled();

    rerender(
      <ThemeProvider theme={theme}>
        <ProjectModal
          project={null}
          onClose={mockOnClose}
          triggerRef={mockTriggerRef}
        />
      </ThemeProvider>,
    );

    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 2400);
  });

  it('focuses close button on open', () => {
    renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(
      <ProjectModal
        project={projectWithLinks}
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
        project={projectWithLinks}
        onClose={mockOnClose}
        triggerRef={mockTriggerRef}
      />,
    );

    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });

  it('traps Tab and Shift+Tab within modal controls', async () => {
    const user = userEvent.setup();
    // Use a no-gallery fixture so the focus order is predictable: Close → Live → Code
    const noGalleryProject = { ...projectWithLinks, image: '/images/example.webp', images: undefined };
    renderWithTheme(
      <ProjectModal
        project={noGalleryProject}
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
        project={projectWithLinks}
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
