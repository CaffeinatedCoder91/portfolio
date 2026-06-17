import styled, { css } from 'styled-components';
import type { TokenColor } from '@/lib/types';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type ButtonVariant = 'primary' | 'ghost' | 'cv';
type ButtonStyleProps = {
  $variant?: ButtonVariant;
  $color?: TokenColor;
};
type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.colors);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

const variantStyles = css<ButtonStyleProps>`
  background: ${({ $variant, $color, theme }) => {
    const currentTheme = getTheme(theme);

    switch ($variant) {
      case 'primary':
        return currentTheme.colors[$color ?? 'ai'];
      case 'cv':
        return currentTheme.colors.paper;
      default:
        return currentTheme.colors.paper2;
    }
  }};
  color: ${({ $variant, theme }) => {
    const currentTheme = getTheme(theme);

    switch ($variant) {
      case 'primary':
        return currentTheme.colors.paper2;
      default:
        return currentTheme.colors.ink;
    }
  }};

  ${({ $variant, theme }) =>
    $variant === 'cv' &&
    css`
      font-family: ${getTheme(theme).fonts.mono};
      font-size: 0.88rem;
    `}
`;

const buttonBase = css<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => getTheme(theme).space[2]};
  font-family: ${({ theme }) => getTheme(theme).fonts.body};
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.6;
  padding: ${({ theme }) => `${getTheme(theme).space[3]} ${getTheme(theme).space[4]}`};
  border-radius: ${({ theme }) => getTheme(theme).radius.md};
  border: ${({ theme }) => getTheme(theme).border};
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: ${({ theme }) => getTheme(theme).shadows.sm};
  ${variantStyles}

  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: ${({ theme }) => getTheme(theme).shadows.lg};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => getTheme(theme).shadows.sm};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const StyledButton = styled.button<ButtonStyleProps>`
  ${buttonBase}
`;

export const StyledLink = styled.a<ButtonStyleProps>`
  ${buttonBase}
`;
