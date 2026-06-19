'use client';
// Uses browser canvas, pointer events, ResizeObserver, and requestAnimationFrame.

import React, { useEffect, useRef } from 'react';
import { CanvasLayer } from './Hero.styles';
import { theme } from '../../../styles/theme';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  radius: number;
  color: string;
}

const hexToRgb = (hex: string) => {
  const value = hex.replace('#', '');
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `${red}, ${green}, ${blue}`;
};

const colors = theme.ink.palette.map(hexToRgb);
const sparkleColor = hexToRgb(theme.ink.sparkle);
const sparkleChance = 0.06;

const InkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Size the bitmap to the canvas element's rendered CSS dimensions, not the
    // viewport. The canvas CSS is `inset: 0; width: 100%; height: 100%` so it
    // fills the hero section, which is taller than window.innerHeight due to
    // padding-top. Using window dimensions creates a bitmap that doesn't match
    // the element size, causing coordinate drift and a visible cutoff line near
    // the hero bottom where ink can no longer be drawn.
    const resizeCanvas = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w > 0 && h > 0) {
        canvas.width = w;
        canvas.height = h;
      }
      // Drop the last recorded point so interpolation doesn't bridge across
      // a resize where coordinate space has shifted.
      lastPointRef.current = null;
    };

    resizeCanvas();

    // Watch the canvas element directly — it mirrors the hero section's size.
    // This fires after web fonts settle or the photo finishes loading and the
    // hero reaches its final height, keeping the bitmap in sync.
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(canvas);

    // Belt-and-suspenders: re-size once all fonts are ready to catch any
    // layout shift that ResizeObserver may not yet have reported.
    void document.fonts?.ready.then(resizeCanvas);

    const emitParticles = (x: number, y: number, speed: number) => {
      const particleCount = Math.min(3 + Math.floor(speed / 6), 9);

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const drift = Math.random() * 0.75 + 0.15;

        const shouldSparkle = Math.random() < sparkleChance;
        const color = shouldSparkle
          ? sparkleColor
          : colors[Math.floor(Math.random() * colors.length)];

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * drift,
          vy: Math.sin(angle) * drift,
          life: 1,
          decay: 0.014 + Math.random() * 0.02,
          radius: 6 + Math.random() * (14 + speed * 0.4),
          color,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.decay;

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        // Fade particles out over the bottom 100px so ink dissolves smoothly
        // into the section below rather than hard-clipping at the hero edge.
        const fadeZone = 100;
        const edgeFade =
          p.y > canvas.height - fadeZone
            ? Math.max(0, (canvas.height - p.y) / fadeZone)
            : 1;
        const alpha = p.life * 0.55 * edgeFade;
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );
        gradient.addColorStop(0, `rgba(${p.color}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${p.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handlePointerMove = (e: PointerEvent) => {
      // Convert viewport coordinates to canvas-local coordinates so particles
      // land exactly under the cursor regardless of scroll position or the
      // nav height offset above the hero section.
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const lastPoint = lastPointRef.current;
      const speed =
        lastPoint === null
          ? 0
          : Math.hypot(x - lastPoint.x, y - lastPoint.y);

      // On fast mouse movement pointermove fires less frequently relative to
      // distance. Interpolate along the straight-line path so the trail stays
      // dense and continuous rather than producing sparse clusters.
      if (lastPoint !== null && speed > 8) {
        const steps = Math.ceil(speed / 7);
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const ix = lastPoint.x + (x - lastPoint.x) * t;
          const iy = lastPoint.y + (y - lastPoint.y) * t;
          emitParticles(ix, iy, speed);
        }
      } else {
        emitParticles(x, y, speed);
      }

      lastPointRef.current = { x, y };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <CanvasLayer ref={canvasRef} aria-hidden="true" />;
};

export default InkCanvas;
