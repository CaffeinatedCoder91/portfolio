import styled, { keyframes, css } from 'styled-components';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.colors);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

const scroll40 = keyframes`
  to {
    transform: translateX(-50%);
  }
`;

export const Section = styled.section``;

export const SectionContent = styled.div`
  width: min(${({ theme }) => getTheme(theme).sizes.contentMaxWidth}, 90vw);
  margin-inline: auto;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => getTheme(theme).fonts.display};
  font-weight: 800;
  font-size: clamp(2rem, 5.5vw, 3.4rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => getTheme(theme).space[7]};
  max-width: 18ch;

  em {
    font-style: italic;
    color: ${({ theme }) => getTheme(theme).colors.shu};
  }
`;

export const MarqueeContainer = styled.div<{ $prefersReduced: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => getTheme(theme).space[3]};
  ${({ $prefersReduced }) =>
    !$prefersReduced &&
    css`
      -webkit-mask-image: linear-gradient(
        90deg,
        transparent,
        var(--ink) 10%,
        var(--ink) 90%,
        transparent
      );
      mask-image: linear-gradient(
        90deg,
        transparent,
        var(--ink) 10%,
        var(--ink) 90%,
        transparent
      );
    `}
`;

export const MarqueeRow = styled.div<{ $reverse?: boolean; $duration: number; $prefersReduced: boolean }>`
  display: flex;
  flex-wrap: ${({ $prefersReduced }) => ($prefersReduced ? 'wrap' : 'nowrap')};
  gap: ${({ theme }) => getTheme(theme).space[3]};
  width: ${({ $prefersReduced }) => ($prefersReduced ? 'auto' : 'max-content')};

  ${({ $prefersReduced, $reverse, $duration }) => {
    if ($prefersReduced) {
      return css``;
    }

    return css`
      animation: ${scroll40} ${$duration}s linear infinite;
      animation-direction: ${$reverse ? 'reverse' : 'normal'};

      &:hover {
        animation-play-state: paused;
      }
    `;
  }}

  @media (prefers-reduced-motion: reduce) {
    flex-wrap: wrap;
    width: auto;
    animation: none;
  }
`;

export const HiddenScreenReaderList = styled.div`
  display: none;
`;
