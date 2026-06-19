import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.colors);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

const swipe = keyframes`
  to {
    transform: scaleX(1);
  }
`;

const growLine = keyframes`
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
`;

export const HeroSection = styled.section`
  padding-top: ${({ theme }) => getTheme(theme).sizes.heroPaddingTop};
  min-height: 88vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => getTheme(theme).sizes.heroMobilePaddingBreakpoint}) {
    padding-bottom: ${({ theme }) => getTheme(theme).space[7]};
  }
`;

export const GlyphsLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

export const CanvasLayer = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  -webkit-mask-image: linear-gradient(
    to bottom,
    black calc(100% - ${({ theme }) => getTheme(theme).space[8]}),
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    black calc(100% - ${({ theme }) => getTheme(theme).space[8]}),
    transparent 100%
  );
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: min(${({ theme }) => getTheme(theme).sizes.heroContentMaxWidth}, 90vw);
  pointer-events: none;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: ${({ theme }) => getTheme(theme).sizes.heroGridGap};
  align-items: center;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => getTheme(theme).sizes.heroBreakpoint}) {
    grid-template-columns: 1fr;
  }

  a,
  button {
    pointer-events: auto;
  }
`;

export const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => getTheme(theme).sizes.heroTextGap};
`;

export const HeroName = styled.h1`
  font-family: ${({ theme }) => getTheme(theme).fonts.name};
  font-weight: 700;
  font-size: clamp(2.8rem, 9vw, 6rem);
  line-height: 1;
  letter-spacing: -0.01em;
  margin: 0;
  margin-bottom: ${({ theme }) => getTheme(theme).space[4]};
  color: ${({ theme }) => getTheme(theme).colors.ink};
`;

export const RoleLine = styled.p`
  font-size: clamp(1.1rem, 2.6vw, 1.55rem);
  font-weight: 600;
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
  margin: 0;
  margin-bottom: ${({ theme }) => getTheme(theme).space[4]};
  max-width: 24ch;

  @media (min-width: ${({ theme }) => getTheme(theme).sizes.heroRoleBreakpoint}) {
    max-width: 38ch;
  }
`;

export const Mark = styled.mark`
  position: relative;
  background: transparent;
  color: ${({ theme }) => getTheme(theme).colors.ink};
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    left: ${({ theme }) => getTheme(theme).sizes.heroMarkInset};
    right: ${({ theme }) => getTheme(theme).sizes.heroMarkInset};
    bottom: 0.06em;
    height: 0.4em;
    background: ${({ theme }) => getTheme(theme).colors.shuHighlight};
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
    animation: ${swipe} 0.7s 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      transform: scaleX(1);
    }
  }
`;

export const LocationLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
  margin-bottom: ${({ theme }) => getTheme(theme).space[3]};
`;

export const LocationDot = styled.span`
  width: ${({ theme }) => getTheme(theme).sizes.heroLocationDot};
  height: ${({ theme }) => getTheme(theme).sizes.heroLocationDot};
  border-radius: 50%;
  background: ${({ theme }) => getTheme(theme).colors.matcha};
  flex-shrink: 0;
`;

export const LocationSeparator = styled.span`
  opacity: 0.4;
`;

export const Tagline = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
  max-width: 46ch;
  margin: 0;
  margin-bottom: ${({ theme }) => getTheme(theme).space[6]};
  line-height: 1.6;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => getTheme(theme).space[3]};
  margin-bottom: ${({ theme }) => getTheme(theme).space[6]};
`;

export const PhotoColumn = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  @media (max-width: ${({ theme }) => getTheme(theme).sizes.heroBreakpoint}) {
    display: none;
  }
`;

export const PhotoAccent = styled.div`
  position: absolute;
  width: 96%;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => getTheme(theme).radius.lg};
  background: ${({ theme }) => getTheme(theme).colors.shu};
  opacity: 0.18;
  transform: translate(
    ${({ theme }) => getTheme(theme).sizes.heroPhotoOffset},
    ${({ theme }) => getTheme(theme).sizes.heroPhotoOffset}
  );
`;

export const PhotoWrapper = styled.div`
  position: relative;
  width: 96%;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => getTheme(theme).radius.lg};
  border: ${({ theme }) => getTheme(theme).border};
  overflow: hidden;
  box-shadow: ${({ theme }) => getTheme(theme).shadows.md};
`;

export const PhotoImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

interface GlyphProps {
  $left?: string;
  $right?: string;
  $top: string;
  $rotation: number;
  $size: keyof Theme['sizes'];
  $color: keyof Theme['colors'];
  $opacity: number;
}

export const Glyph = styled.span<GlyphProps>`
  position: absolute;
  left: ${({ $left }) => $left};
  right: ${({ $right }) => $right};
  top: ${({ $top }) => $top};
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-weight: 700;
  font-size: ${({ $size, theme }) => getTheme(theme).sizes[$size]};
  line-height: 1;
  transform: rotate(${({ $rotation }) => $rotation}deg);
  opacity: ${({ $opacity }) => $opacity};
  color: ${({ $color, theme }) => getTheme(theme).colors[$color]};
  white-space: nowrap;
`;

export const ScrollCueContainer = styled.div`
  position: absolute;
  bottom: ${({ theme }) => getTheme(theme).space[1]};
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => getTheme(theme).space[2]};
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
  pointer-events: none;

  @media (max-width: ${({ theme }) => getTheme(theme).sizes.heroScrollCueHideBreakpoint}) {
    display: none;
  }
`;

export const ScrollText = styled.span`
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-size: ${({ theme }) => getTheme(theme).sizes.scrollCueFont};
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
`;

export const ScrollLine = styled.div`
  width: ${({ theme }) => getTheme(theme).sizes.scrollCueLineWidth};
  height: ${({ theme }) => getTheme(theme).sizes.scrollCueLineHeight};
  background: ${({ theme }) => getTheme(theme).colors.inkSoft};
  transform-origin: top;
  animation: ${growLine} 1.8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    height: ${({ theme }) => getTheme(theme).sizes.scrollCueLineHeight};
  }
`;
