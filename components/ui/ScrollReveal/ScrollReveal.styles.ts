import styled, { keyframes, css } from 'styled-components';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.space);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div<{ $isVisible: boolean }>`
  opacity: 0;
  transform: translateY(${({ theme }) => getTheme(theme).space[4]});

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeUp} 0.55s ease forwards;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;
