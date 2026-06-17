import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { timezone } from '@/content/data';
import HeroClient from './HeroClient';

describe('HeroClient', () => {
  it('renders live local time for the configured timezone', async () => {
    render(<HeroClient timezone={timezone} />);

    const time = await screen.findByText(/\d{2}:\d{2}:\d{2}/);
    await waitFor(() => {
      expect(time).toHaveAttribute('dateTime', expect.stringMatching(/\d{2}:\d{2}:\d{2}/));
    });
  });

  it('passes axe accessibility check', async () => {
    const { container } = render(<HeroClient timezone={timezone} />);
    await screen.findByText(/\d{2}:\d{2}:\d{2}/);
    expect(await axe(container)).toHaveNoViolations();
  });
});
