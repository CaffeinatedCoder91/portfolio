import styled from 'styled-components';
import { theme as defaultTheme, type Theme } from '@/styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.colors);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

export const StyledTag = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-weight: 700;
  font-size: 0.72rem;
  line-height: 1.6;
  padding: ${({ theme }) => `calc(${getTheme(theme).space[1]} / 2) ${getTheme(theme).space[2]}`};
  border-radius: ${({ theme }) => getTheme(theme).sizes.projectTagRadius};
  background: ${({ theme }) => getTheme(theme).colors.paper};
  color: ${({ theme }) => getTheme(theme).colors.ink};
  border: ${({ theme }) => getTheme(theme).borderSubtle};
`;
