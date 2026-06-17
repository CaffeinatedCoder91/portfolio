import React from 'react';
import { projects } from '@/content/data';
import Eyebrow from '@/components/ui/Eyebrow';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProjectGrid from './ProjectGrid';
import { Section, Wrapper, Title } from './Projects.styles';

const Projects = () => {
  return (
    <Section id="projects" aria-labelledby="projects-title">
      <Wrapper>
        <ScrollReveal>
          <Eyebrow $color="shu">my work</Eyebrow>
          <Title id="projects-title">Selected projects</Title>
          <ProjectGrid projects={projects} />
        </ScrollReveal>
      </Wrapper>
    </Section>
  );
};

export default Projects;
