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

export const Title = styled.h2`
  font-family: ${({ theme }) => getTheme(theme).fonts.display};
  font-weight: 800;
  font-size: clamp(2.1rem, 5vw, 4rem);
  line-height: 1;
  margin-bottom: ${({ theme }) => getTheme(theme).space[6]};
  letter-spacing: 0;
`;

export const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: ${({ theme }) => getTheme(theme).space[6]};

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const Copy = styled.div`
  p {
    font-size: 1.15rem;
    margin-bottom: 1.1rem;
    max-width: 56ch;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

export const Facts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => getTheme(theme).space[2]};
  align-content: start;
`;

export const FactItem = styled.div``;
