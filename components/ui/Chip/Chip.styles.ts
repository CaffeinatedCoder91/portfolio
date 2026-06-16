import styled from 'styled-components';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.colors);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

export const StyledChip = styled.div<{ $style?: 'default' | 'hot' | 'cool' }>`
  display: inline-block;
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.6;
  padding: 0.55rem 1.1rem;
  border-radius: ${({ theme }) => getTheme(theme).radius.full};
  border: ${({ theme }) => getTheme(theme).border};
  border-color: ${({ $style, theme }) => {
    const currentTheme = getTheme(theme);

    switch ($style) {
      case 'hot':
        return currentTheme.colors.shu;
      case 'cool':
        return currentTheme.colors.ai;
      default:
        return currentTheme.colors.ink;
    }
  }};
  background: ${({ $style, theme }) => {
    const currentTheme = getTheme(theme);

    switch ($style) {
      case 'hot':
        return currentTheme.colors.shu;
      case 'cool':
        return currentTheme.colors.ai;
      default:
        return currentTheme.colors.paper2;
    }
  }};
  color: ${({ $style, theme }) => {
    const currentTheme = getTheme(theme);

    switch ($style) {
      case 'hot':
        return currentTheme.colors.paper2;
      case 'cool':
        return currentTheme.colors.paper2;
      default:
        return currentTheme.colors.ink;
    }
  }};
  transition: transform 0.15s;

  &:hover {
    transform: translateY(-0.1875rem);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
