import styled from 'styled-components';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.colors);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

export const StyledCard = styled.div`
  background: ${({ theme }) => getTheme(theme).colors.paper2};
  border: ${({ theme }) => getTheme(theme).border};
  border-radius: ${({ theme }) => getTheme(theme).radius.md};
  box-shadow: ${({ theme }) => getTheme(theme).shadows.sm};
  padding: ${({ theme }) => `${getTheme(theme).space[3]} ${getTheme(theme).space[4]}`};
`;

export const Number = styled.div`
  font-family: ${({ theme }) => getTheme(theme).fonts.display};
  font-weight: 800;
  font-size: 1.5rem;
  color: ${({ theme }) => getTheme(theme).colors.ink};
  line-height: 1;
  margin-bottom: ${({ theme }) => getTheme(theme).space[2]};
`;

export const Label = styled.div`
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-weight: 400;
  font-size: 0.72rem;
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;
