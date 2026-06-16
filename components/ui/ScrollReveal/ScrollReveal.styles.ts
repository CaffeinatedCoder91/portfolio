import styled, { keyframes, css } from 'styled-components';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.75rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div<{ $isVisible: boolean }>`
  opacity: 0;
  transform: translateY(${({ theme }) => theme.space[4]});

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      animation: ${fadeUp} 0.55s ease forwards;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`;
