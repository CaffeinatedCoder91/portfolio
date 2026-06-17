import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { ThemeProvider } from 'styled-components';
import { projects } from '@/content/data';
import { theme } from '@/styles/theme';
import FilterTabs from './FilterTabs';

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe('FilterTabs', () => {
  it('renders all categories from project data', () => {
    renderWithTheme(<FilterTabs projects={projects} activeCategory="All" onChange={vi.fn()} />);

    const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
    categories.forEach((category) => {
      expect(screen.getByRole('tab', { name: category })).toBeInTheDocument();
    });
  });

  it('calls onChange with the clicked category', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const category = projects[0].category;

    renderWithTheme(<FilterTabs projects={projects} activeCategory="All" onChange={onChange} />);

    await user.click(screen.getByRole('tab', { name: category }));
    expect(onChange).toHaveBeenCalledWith(category);
  });

  it('passes axe accessibility check', async () => {
    const { container } = renderWithTheme(
      <>
        <FilterTabs projects={projects} activeCategory="All" onChange={vi.fn()} />
        <div id="project-grid" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
