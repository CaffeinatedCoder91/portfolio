'use client';

// Client component: owns filtering, modal state, and focus restoration.
import React, { useState, useCallback, useRef } from 'react';
import type { Project } from '@/lib/types';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectModal from '../ProjectModal/ProjectModal';
import FilterTabs from './FilterTabs';
import { Grid } from './Projects.styles';

const palette = ['ai', 'shu', 'mizu', 'fuji', 'matcha', 'kincha'] as const;

interface Props {
  projects: Project[];
}

const ProjectGrid = ({ projects }: Props) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLElement | null)[]>([]);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleOpenProject = useCallback((index: number) => {
    triggerRef.current = triggerRefs.current[index] ?? null;
    setSelectedIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedIndex(null);
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
              ref={(el) => {
                triggerRefs.current[originalIndex] = el;
              }}
              project={project}
              color={color}
              index={originalIndex}
              onOpen={handleOpenProject}
              priority={displayIndex === 0}
            />
          );
        })}
      </Grid>
      <ProjectModal
        project={selectedIndex !== null ? projects[selectedIndex] : null}
        color={selectedIndex !== null ? palette[selectedIndex % palette.length] : 'ai'}
        onClose={handleCloseModal}
        triggerRef={triggerRef}
      />
    </>
  );
};

export default ProjectGrid;
