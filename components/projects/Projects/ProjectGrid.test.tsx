import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { projects } from '@/content/data';
import { theme } from '@/styles/theme';
import ProjectGrid from './ProjectGrid';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('ProjectGrid', () => {
  it('renders project cards from content data', () => {
    renderWithTheme(<ProjectGrid projects={projects} />);

    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('filters cards by project category', async () => {
    const user = userEvent.setup();
    const category = projects.find((project) => project.category !== projects[0].category)?.category ?? projects[0].category;
    const expectedProjects = projects.filter((project) => project.category === category);
    const hiddenProjects = projects.filter((project) => project.category !== category);

    renderWithTheme(<ProjectGrid projects={projects} />);

    await user.click(screen.getByRole('tab', { name: category }));

    expectedProjects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
    hiddenProjects.forEach((project) => {
      expect(screen.queryByText(project.title)).not.toBeInTheDocument();
    });
  });

  it('opens a modal for the selected project', async () => {
    const user = userEvent.setup();
    renderWithTheme(<ProjectGrid projects={projects} />);

    await user.click(screen.getByLabelText(`Open ${projects[0].title}`));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText(projects[0].title)).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(<ProjectGrid projects={projects} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
