import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Section = styled.section`
  padding: ${theme.sizes.sectionPadding} 0;
  position: relative;
`;

export const Wrapper = styled.div`
  width: min(1120px, 90vw);
  margin-inline: auto;
  text-align: center;
`;

export const Title = styled.h2`
  font-family: ${theme.fonts.display};
  font-weight: 800;
  font-size: clamp(2rem, 5.5vw, 3.4rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  margin-bottom: ${theme.space[6]};
  max-width: 20ch;
  margin-left: auto;
  margin-right: auto;
  color: ${theme.colors.ink};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.space[3]};
  justify-content: center;
  flex-wrap: wrap;
`;
