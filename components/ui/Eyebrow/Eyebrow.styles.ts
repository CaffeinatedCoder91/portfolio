import styled from 'styled-components';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type EyebrowColor = keyof Theme['colors'];
type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.colors);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

export const StyledEyebrow = styled.span<{ $color?: EyebrowColor; $hasNumber?: boolean }>`
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: ${({ theme }) => getTheme(theme).colors.ink};
  display: inline-block;
  position: relative;
  padding: 0 0.15em;
  margin-bottom: ${({ theme }) => getTheme(theme).space[3]};

  ${({ $hasNumber, $color = 'kincha', theme }) =>
    !$hasNumber
      ? `
        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -0.05em;
          height: 0.15em;
          background: ${getTheme(theme).colors[$color]};
          z-index: -1;
        }
      `
      : ''}
`;
