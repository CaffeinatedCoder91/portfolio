import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import TimelineItem from './TimelineItem';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('TimelineItem', () => {
  it('renders role with points (Frontend Engineer)', () => {
    const props = {
      period: 'Nov 2022 – Present',
      role: 'Frontend Engineer',
      org: 'Future Plc · London (Remote)',
      color: 'ai' as const,
      points: [
        'Designed and maintained a 96-component shared React library serving 6+ storefronts',
        'Owned e-commerce features end to end',
        'Reduced API calls by 80–90% through debouncing and caching',
        'Built a complex campaign management system',
        'Implemented WCAG 2.1 AA accessibility standards',
      ],
    };

    renderWithTheme(<TimelineItem {...props} />);

    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Nov 2022 – Present')).toBeInTheDocument();
    expect(screen.getByText('Future Plc · London (Remote)')).toBeInTheDocument();
    expect(screen.getByText(/96-component/)).toBeInTheDocument();
  });

  it('renders role with description (Intern)', () => {
    const props = {
      period: 'Jul 2021 – Oct 2021',
      role: 'Intern Developer',
      org: 'Future Plc',
      color: 'mizu' as const,
      desc: 'Built interactive React features for high-traffic sites; improved test coverage and learned debugging best practices.',
    };

    renderWithTheme(<TimelineItem {...props} />);

    expect(screen.getByText('Intern Developer')).toBeInTheDocument();
    expect(screen.getByText(/interactive React features/)).toBeInTheDocument();
  });

  it('renders education without description (BSc Biology)', () => {
    const props = {
      period: '2012',
      role: 'BSc Biology',
      org: 'Kingston University',
      color: 'mizu' as const,
    };

    renderWithTheme(<TimelineItem {...props} />);

    expect(screen.getByText('BSc Biology')).toBeInTheDocument();
    expect(screen.getByText('Kingston University')).toBeInTheDocument();
    expect(screen.getByText('2012')).toBeInTheDocument();
  });

  it('passes axe accessibility check', async () => {
    const props = {
      period: 'Nov 2022 – Present',
      role: 'Frontend Engineer',
      org: 'Future Plc',
      color: 'ai' as const,
      points: ['Point 1', 'Point 2', 'Point 3'],
    };

    const { container } = renderWithTheme(<TimelineItem {...props} />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
