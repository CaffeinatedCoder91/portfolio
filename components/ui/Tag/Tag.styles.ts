import styled from 'styled-components';

export const StyledTag = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: 700;
  font-size: 0.72rem;
  line-height: 1.6;
  padding: ${({ theme }) => `calc(${theme.space[1]} / 2) ${theme.space[2]}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.ink};
  border: ${({ theme }) => theme.border};
`;
