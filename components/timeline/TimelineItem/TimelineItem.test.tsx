import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { education, experience } from '@/content/data';
import { theme } from '../../../styles/theme';
import TimelineItem from './TimelineItem';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('TimelineItem', () => {
  it('renders role with points (Frontend Engineer)', () => {
    const props = experience.find((role) => role.role === 'Frontend Engineer') ?? experience[0];

    renderWithTheme(<TimelineItem {...props} />);

    expect(screen.getByText(props.role)).toBeInTheDocument();
    expect(screen.getByText(props.period)).toBeInTheDocument();
    expect(screen.getByText(props.org)).toBeInTheDocument();
    expect(screen.getByText(/96-component/)).toBeInTheDocument();
  });

  it('renders role with description (Intern)', () => {
    const props = experience.find((role) => role.role === 'Intern Developer') ?? experience[2];

    renderWithTheme(<TimelineItem {...props} />);

    expect(screen.getByText(props.role)).toBeInTheDocument();
    expect(screen.getByText(props.desc ?? '')).toBeInTheDocument();
  });

  it('renders education without description (BSc Biology)', () => {
    const props = education.find((item) => item.role === 'BSc Biology') ?? education[2];

    renderWithTheme(<TimelineItem {...props} />);

    expect(screen.getByText(props.role)).toBeInTheDocument();
    expect(screen.getByText(props.org)).toBeInTheDocument();
    expect(screen.getByText(props.period)).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const props = experience[0];

    const { container } = renderWithTheme(<TimelineItem {...props} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
