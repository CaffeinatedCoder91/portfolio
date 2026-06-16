import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'ghost' | 'cv';

const variantStyles = css<{ $variant?: ButtonVariant }>`
  background: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return theme.colors.ai;
      case 'cv':
        return theme.colors.paper;
      default:
        return theme.colors.paper2;
    }
  }};
  color: ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return theme.colors.paper2;
      default:
        return theme.colors.ink;
    }
  }};

  ${({ $variant, theme }) =>
    $variant === 'cv' &&
    css`
      font-family: ${theme.fonts.mono};
      font-size: 0.88rem;
    `}
`;

const buttonBase = css<{ $variant?: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.6;
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  border: ${({ theme }) => theme.border};
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  ${variantStyles}

  &:hover {
    transform: translateY(-0.125rem);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const StyledButton = styled.button<{ $variant?: ButtonVariant }>`
  ${buttonBase}
`;

export const StyledLink = styled.a<{ $variant?: ButtonVariant }>`
  ${buttonBase}
`;
