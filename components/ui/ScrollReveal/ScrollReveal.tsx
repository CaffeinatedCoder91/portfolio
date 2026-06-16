'use client';
// Uses IntersectionObserver, timers, and the reduced-motion media query.

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Container } from './ScrollReveal.styles';

interface Props {
  children: React.ReactNode;
  $delay?: number;
}

const ScrollReveal = ({ children, $delay = 0 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if ($delay > 0) {
              timeoutRef.current = setTimeout(() => setIsVisible(true), $delay);
            } else {
              setIsVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      observer.disconnect();
    };
  }, [prefersReduced, $delay]);

  return (
    <Container ref={ref} $isVisible={isVisible || prefersReduced}>
      {children}
    </Container>
  );
};

export default ScrollReveal;
