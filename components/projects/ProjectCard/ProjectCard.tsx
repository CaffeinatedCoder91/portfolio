'use client';

// Client component: card opens on click/keyboard and links stop propagation.
import React from 'react';
import Image from 'next/image';
import Tag from '@/components/ui/Tag';
import type { Project, TokenColor } from '@/lib/types';
import {
  CardArticle,
  CardImage,
  CardImagePlaceholder,
  CategoryTag,
  CardTitle,
  CardBlurb,
  Tags,
  CardFooter,
  CardLinks,
  CardLink,
  StatusNote,
  DetailsArrow,
} from '../Projects/Projects.styles';

interface Props {
  project: Project;
  color: TokenColor;
  index: number;
  onOpen: (index: number) => void;
  priority?: boolean;
}

const ProjectCard = ({ project, color, index, onOpen, priority = false }: Props) => {
  const handleClick = () => {
    onOpen(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(index);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const showStatusNote = !project.live && !project.code && project.note;

  return (
    <CardArticle
      $color={color}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${project.title}`}
      tabIndex={0}
    >
      <CardImage $hasImage={Boolean(project.image)}>
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            priority={priority}
          />
        ) : (
          <CardImagePlaceholder $color={color}>
            <span>{project.category}</span>
          </CardImagePlaceholder>
        )}
      </CardImage>

      <CategoryTag $color={color}>{project.category}</CategoryTag>

      <CardTitle>{project.title}</CardTitle>

      <CardBlurb>{project.blurb}</CardBlurb>

      <Tags>
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>

      <CardFooter>
        <CardLinks>
          {project.live && (
            <CardLink
              as="a"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              $variant="live"
              $color={color}
              onClick={handleLinkClick}
            >
              Live ↗
            </CardLink>
          )}
          {project.code && (
            <CardLink
              as="a"
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              $variant="code"
              onClick={handleLinkClick}
            >
              Code ↗
            </CardLink>
          )}
          {showStatusNote && <StatusNote>{project.note}</StatusNote>}
        </CardLinks>
        <DetailsArrow>details →</DetailsArrow>
      </CardFooter>
    </CardArticle>
  );
};

export default ProjectCard;
