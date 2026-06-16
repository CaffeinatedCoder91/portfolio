import styled from 'styled-components';
import type { Theme } from '../../../styles/theme';

type EyebrowColor = keyof Theme['colors'];

export const StyledEyebrow = styled.span<{ $color?: EyebrowColor }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 700;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.colors.ink};
  display: inline-block;
  position: relative;
  padding: 0 0.15em;
  margin-bottom: ${({ theme }) => theme.space[3]};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.05em;
    height: 0.15em;
    background: ${({ $color = 'kincha', theme }) => theme.colors[$color]};
    z-index: -1;
  }
`;
