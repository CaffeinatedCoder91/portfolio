import styled from 'styled-components';
import type { TokenColor } from '@/lib/types';
import { theme } from '@/styles/theme';

interface CardProps {
  $color: TokenColor;
}

export const Card = styled.div<CardProps>`
  background: ${theme.colors.paper2};
  border: 1.5px solid ${theme.colors.ink};
  border-radius: ${theme.radius.lg};
  padding: ${theme.space[4]};
  box-shadow: ${theme.shadows.sm};
`;

export const IconWrapper = styled.div<CardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ $color }) => theme.colors[$color]};
  border: 1.5px solid ${theme.colors.ink};
  margin-bottom: ${theme.space[3]};
  flex-shrink: 0;
`;

export const Glyph = styled.span`
  font-family: ${theme.fonts.mono};
  font-weight: 700;
  font-size: 1rem;
  color: ${theme.colors.white};
`;

export const Label = styled.div`
  font-family: ${theme.fonts.mono};
  font-weight: 700;
  font-size: 0.75rem;
  color: ${theme.colors.ink};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: ${theme.space[2]};
  line-height: 1.4;
`;

export const Value = styled.a`
  font-family: ${theme.fonts.body};
  font-weight: 700;
  font-size: 1rem;
  color: ${theme.colors.ink};
  word-break: break-word;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.ai};
  }
`;
