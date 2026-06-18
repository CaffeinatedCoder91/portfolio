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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(document.documentElement);

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

        const alpha = p.life * 0.55;
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
      const lastPoint = lastPointRef.current;
      const speed =
        lastPoint === null
          ? 0
          : Math.hypot(e.clientX - lastPoint.x, e.clientY - lastPoint.y);

      lastPointRef.current = { x: e.clientX, y: e.clientY };
      emitParticles(e.clientX, e.clientY, speed);
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
