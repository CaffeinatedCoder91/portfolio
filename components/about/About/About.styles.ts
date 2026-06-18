import styled from 'styled-components';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.colors);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

export const Section = styled.section`
  padding: clamp(70px, 11vw, 140px) 0;
  position: relative;
`;

export const Wrapper = styled.div`
  width: min(1120px, 90vw);
  margin-inline: auto;
`;

export const Statement = styled.h2`
  font-family: ${({ theme }) => getTheme(theme).fonts.display};
  font-weight: 800;
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1;
  margin-bottom: ${({ theme }) => getTheme(theme).space[6]};
  letter-spacing: 0;
  max-width: 16ch;
  color: ${({ theme }) => getTheme(theme).colors.ink};
`;

export const SupportingText = styled.div`
  p {
    font-family: ${({ theme }) => getTheme(theme).fonts.body};
    font-size: 1.125rem;
    font-weight: 400;
    color: ${({ theme }) => getTheme(theme).colors.inkSoft};
    margin-bottom: 1.1rem;
    max-width: 52ch;
    line-height: 1.6;
  }

  p:last-child {
    margin-bottom: ${({ theme }) => getTheme(theme).space[6]};
  }
`;

export const MetadataRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => getTheme(theme).space[6]};
  margin-bottom: ${({ theme }) => getTheme(theme).space[6]};

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => getTheme(theme).space[5]};
  }
`;

export const MetadataCol = styled.div``;

export const MetadataLabel = styled.span`
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  display: block;
  margin-bottom: 0.375rem;
`;

export const MetadataValue = styled.span`
  font-family: ${({ theme }) => getTheme(theme).fonts.body};
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => getTheme(theme).colors.ink};
  display: block;
  line-height: 1.4;
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => getTheme(theme).space[2]};

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StatItem = styled.div``;
