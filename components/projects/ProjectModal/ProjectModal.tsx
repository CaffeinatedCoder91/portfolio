'use client';

// Client component: manages modal focus, keyboard listeners, and body scroll lock.
import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import type { Project, TokenColor } from '@/lib/types';
import {
  ModalBackdrop,
  ModalPanel,
  ModalImageHeader,
  ModalCloseButton,
  ModalContent,
  ModalCategoryTag,
  ModalTitle,
  ModalBulletList,
  ModalChips,
  ModalLinks,
  StatusNote,
} from '../Projects/Projects.styles';

interface Props {
  project: Project | null;
  color?: TokenColor;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const focusableSelector = 'button, a, [tabindex]:not([tabindex="-1"])';

const ProjectModal = ({ project, color = 'ai', onClose, triggerRef }: Props) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isOpen = project !== null;

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const handlePanelClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const triggerElement = triggerRef.current;

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = panelRef.current?.querySelectorAll(focusableSelector);

        if (!focusableElements || focusableElements.length === 0) return;

        const focusArray = Array.from(focusableElements);
        const currentIndex = focusArray.indexOf(document.activeElement as Element);

        if (e.shiftKey) {
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? focusArray.length - 1 : currentIndex - 1;
          (focusArray[prevIndex] as HTMLElement).focus();
          return;
        }

        e.preventDefault();
        const nextIndex = currentIndex === focusArray.length - 1 ? 0 : currentIndex + 1;
        (focusArray[nextIndex] as HTMLElement).focus();
      }
    };

    document.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      document.removeEventListener('keydown', handleWindowKeyDown);
      document.body.style.overflow = originalOverflow;

      triggerElement?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!project || typeof document === 'undefined') return null;

  return createPortal(
    <ModalBackdrop $isOpen={isOpen} onClick={handleBackdropClick}>
      <ModalPanel
        ref={panelRef}
        $isOpen={isOpen}
        onClick={handlePanelClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <ModalImageHeader $color={color} $hasImage={Boolean(project.image)}>
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              priority
            />
          ) : (
            <span>{project.category}</span>
          )}
        </ModalImageHeader>

        <ModalCloseButton
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          ✕
        </ModalCloseButton>

        <ModalContent>
          <ModalCategoryTag $color={color}>{project.category}</ModalCategoryTag>

          <ModalTitle id="modal-title">{project.title}</ModalTitle>

          <ModalBulletList $color={color}>
            {project.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ModalBulletList>

          <ModalChips>
            {project.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </ModalChips>

          <ModalLinks>
            {project.live && (
              <Button
                href={project.live}
                $variant="primary"
                $color={color}
                target="_blank"
                rel="noopener noreferrer"
              >
                View live ↗
              </Button>
            )}
            {project.code && (
              <Button
                href={project.code}
                $variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                View code ↗
              </Button>
            )}
            {!project.live && !project.code && project.note && (
              <StatusNote>{project.note}</StatusNote>
            )}
          </ModalLinks>
        </ModalContent>
      </ModalPanel>
    </ModalBackdrop>,
    document.body,
  );
};

export default ProjectModal;
