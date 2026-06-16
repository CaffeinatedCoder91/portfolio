import styled from 'styled-components';

export const StyledCard = styled.div`
  background: ${({ theme }) => theme.colors.paper2};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
`;

export const Number = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.ink};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

export const Label = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 400;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.inkSoft};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;
