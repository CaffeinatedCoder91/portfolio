import styled from 'styled-components';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.sizes);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

export const ToggleButton = styled.button`
  width: ${({ theme }) => getTheme(theme).sizes.themeToggleSize};
  height: ${({ theme }) => getTheme(theme).sizes.themeToggleSize};
  border-radius: 50%;
  background: var(--paper-2);
  border: ${({ theme }) => getTheme(theme).border};
  color: var(--ink);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  flex-shrink: 0;

  &:hover {
    background: var(--ink);
    color: var(--paper-2);
  }

  &:active {
    transform: scale(0.95);
  }

`;
