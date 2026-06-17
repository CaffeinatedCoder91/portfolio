'use client';

// Client component: owns project filtering state before the modal session is added.
import React, { useState, useCallback } from 'react';
import type { Project } from '@/lib/types';
import ProjectCard from '../ProjectCard/ProjectCard';
import FilterTabs from './FilterTabs';
import { Grid } from './Projects.styles';

const palette = ['ai', 'shu', 'mizu', 'fuji', 'matcha', 'kincha'] as const;

interface Props {
  projects: Project[];
}

const ProjectGrid = ({ projects }: Props) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const handleOpenProject = useCallback((index: number) => {
    // TODO: Open modal in Session 9
    console.log('Opening project:', index);
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <FilterTabs projects={projects} activeCategory={activeCategory} onChange={setActiveCategory} />
      <Grid id="project-grid" role="region" aria-label="Projects grid">
        {filteredProjects.map((project, displayIndex) => {
          const originalIndex = projects.indexOf(project);
          const colorIndex = originalIndex % palette.length;
          const color = palette[colorIndex];

          return (
            <ProjectCard
              key={`${project.title}-${originalIndex}`}
              project={project}
              color={color}
              index={originalIndex}
              onOpen={handleOpenProject}
              priority={displayIndex === 0}
            />
          );
        })}
      </Grid>
      {/* Render null for modal for now (Session 9) */}
    </>
  );
};

export default ProjectGrid;
