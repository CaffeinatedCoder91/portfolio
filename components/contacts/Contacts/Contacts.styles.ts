import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Main = styled.main`
  position: relative;
`;

export const TitleScreen = styled.section`
  text-align: center;
  padding-top: clamp(150px, 20vh, 230px);
  padding-bottom: ${theme.space[2]};
`;

export const TitleWrapper = styled.h1`
  font-family: ${theme.fonts.mono};
  font-weight: 700;
  letter-spacing: 0.01em;
  font-size: clamp(2.3rem, 8vw, 4.8rem);
  line-height: 1;
  position: relative;
  display: inline-block;
  margin-bottom: ${theme.space[2]};
  color: ${theme.colors.ink};

  .ghost {
    position: absolute;
    left: 4px;
    top: 5px;
    color: ${theme.colors.ai};
    z-index: -1;
    opacity: 0.32;
  }
`;

export const Breadcrumb = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 0.95rem;
  color: ${theme.colors.ink};
  margin-top: ${theme.space[2]};

  strong {
    color: ${theme.colors.ink};
  }
`;

export const ContentSection = styled.section`
  width: min(1120px, 90vw);
  margin-inline: auto;
  padding: ${theme.sizes.sectionPadding} 0;
`;

export const Title = styled.h2`
  font-family: ${theme.fonts.display};
  font-weight: 800;
  font-size: clamp(2rem, 5.5vw, 3.4rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
  margin-bottom: ${theme.space[4]};
  color: ${theme.colors.ink};
`;

export const Subtitle = styled.p`
  font-size: 1.15rem;
  color: ${theme.colors.ink};
  margin-bottom: ${theme.space[6]};
  max-width: 56ch;
  line-height: 1.6;
`;

export const ContactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${theme.space[4]};
  margin-bottom: ${theme.space[6]};
`;

export const CVButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.space[2]};
  font-weight: 700;
  font-size: 1rem;
  padding: ${theme.space[3]} ${theme.space[4]};
  border-radius: ${theme.radius.md};
  border: 1.5px solid ${theme.colors.ink};
  background: ${theme.colors.paper2};
  color: ${theme.colors.ink};
  text-decoration: none;
  cursor: pointer;
  box-shadow: ${theme.shadows.sm};
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadows.sm};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
