'use client';

// Client component: filter tabs need click handlers from ProjectGrid state.
import React from 'react';
import type { Project } from '@/lib/types';
import { FilterButton, FilterContainer } from './Projects.styles';

interface Props {
  projects: Project[];
  activeCategory: string;
  onChange: (category: string) => void;
}

const FilterTabs = ({ projects, activeCategory, onChange }: Props) => {
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  return (
    <FilterContainer role="tablist" aria-label="Filter projects by category">
      {categories.map((category) => (
        <FilterButton
          key={category}
          $active={activeCategory === category}
          onClick={() => onChange(category)}
          role="tab"
          aria-selected={activeCategory === category}
          aria-controls="project-grid"
        >
          {category}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default FilterTabs;
