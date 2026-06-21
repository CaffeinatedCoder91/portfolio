'use client';

// Client component: manages modal focus, keyboard listeners, and body scroll lock.
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import type { Project, TokenColor } from '@/lib/types';
import {
  ModalBackdrop,
  ModalPanel,
  ModalImageHeader,
  ModalImageControl,
  ModalImageCount,
  ModalThumbnailButton,
  ModalThumbnailList,
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

interface ImageState {
  projectTitle: string | null;
  index: number;
}

const focusableSelector = 'button, a, [tabindex]:not([tabindex="-1"])';
const modalOpenDataKey = 'projectModalOpen';

const ProjectModal = ({ project, color = 'ai', onClose, triggerRef }: Props) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [imageState, setImageState] = useState<ImageState>({
    projectTitle: null,
    index: 0,
  });

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

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalOverscrollBehavior = document.body.style.overscrollBehavior;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalHtmlOverscrollBehavior =
      document.documentElement.style.overscrollBehavior;
    const originalModalOpen = document.body.dataset[modalOpenDataKey];

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.dataset[modalOpenDataKey] = 'true';

    closeButtonRef.current?.focus({ preventScroll: true });

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
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscrollBehavior;
      document.documentElement.style.overscrollBehavior =
        originalHtmlOverscrollBehavior;

      if (originalModalOpen === undefined) {
        delete document.body.dataset[modalOpenDataKey];
      } else {
        document.body.dataset[modalOpenDataKey] = originalModalOpen;
      }

      triggerElement?.focus({ preventScroll: true });
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!project || typeof document === 'undefined') return null;

  const imageSources =
    project.images && project.images.length > 0
      ? project.images
      : project.image
        ? [project.image]
        : [];
  const activeImageIndex = imageState.projectTitle === project.title ? imageState.index : 0;
  const safeActiveImageIndex =
    imageSources.length > 0 ? Math.min(activeImageIndex, imageSources.length - 1) : 0;
  const activeImage = imageSources[safeActiveImageIndex];
  const hasImages = imageSources.length > 0;
  const hasGallery = imageSources.length > 1;

  const showPreviousImage = () => {
    setImageState((current) => {
      const currentIndex = current.projectTitle === project.title ? current.index : 0;
      return {
        projectTitle: project.title,
        index: currentIndex === 0 ? imageSources.length - 1 : currentIndex - 1,
      };
    });
  };

  const showNextImage = () => {
    setImageState((current) => {
      const currentIndex = current.projectTitle === project.title ? current.index : 0;
      return {
        projectTitle: project.title,
        index: currentIndex === imageSources.length - 1 ? 0 : currentIndex + 1,
      };
    });
  };

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
        <ModalImageHeader $color={color} $hasImage={hasImages}>
          {activeImage ? (
            <Image
              src={activeImage}
              alt={`${project.title} screenshot ${safeActiveImageIndex + 1}`}
              fill
              sizes="(max-width: 820px) 90vw, 640px"
              priority
            />
          ) : (
            <span>{project.category}</span>
          )}
          {hasGallery && (
            <>
              <ModalImageControl
                type="button"
                $side="left"
                onClick={showPreviousImage}
                aria-label="Previous screenshot"
              >
                &lt;
              </ModalImageControl>
              <ModalImageControl
                type="button"
                $side="right"
                onClick={showNextImage}
                aria-label="Next screenshot"
              >
                &gt;
              </ModalImageControl>
              <ModalImageCount aria-live="polite">
                {safeActiveImageIndex + 1} / {imageSources.length}
              </ModalImageCount>
            </>
          )}
        </ModalImageHeader>

        {hasGallery && (
          <ModalThumbnailList aria-label={`${project.title} screenshots`}>
            {imageSources.map((image, index) => (
              <ModalThumbnailButton
                key={image}
                type="button"
                $active={safeActiveImageIndex === index}
                onClick={() => setImageState({ projectTitle: project.title, index })}
                aria-label={`Show screenshot ${index + 1}`}
                aria-pressed={safeActiveImageIndex === index}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="56px"
                  aria-hidden="true"
                />
              </ModalThumbnailButton>
            ))}
          </ModalThumbnailList>
        )}

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
