import styled from 'styled-components';

export const InlineRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
`;

export const TightInlineRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.375rem, 1fr));
  gap: ${({ theme }) => theme.space[3]};
`;

export const RevealCard = styled.div`
  padding: ${({ theme }) => theme.space[3]};
  background: ${({ theme }) => theme.colors.paper2};
  border-radius: ${({ theme }) => theme.radius.sm};
`;
