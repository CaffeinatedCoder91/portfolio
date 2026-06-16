import styled from 'styled-components';

export const StyledChip = styled.div<{ $style?: 'default' | 'hot' | 'cool' }>`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.6;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
  border-radius: ${({ theme }) => theme.radius.full};
  border: ${({ theme }) => theme.border};
  border-color: ${({ $style, theme }) => {
    switch ($style) {
      case 'hot':
        return theme.colors.shu;
      case 'cool':
        return theme.colors.ai;
      default:
        return theme.colors.ink;
    }
  }};
  background: ${({ $style, theme }) => {
    switch ($style) {
      case 'hot':
        return theme.colors.shu;
      case 'cool':
        return theme.colors.ai;
      default:
        return theme.colors.paper2;
    }
  }};
  color: ${({ $style, theme }) => {
    switch ($style) {
      case 'hot':
        return theme.colors.paper2;
      case 'cool':
        return theme.colors.paper2;
      default:
        return theme.colors.ink;
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
