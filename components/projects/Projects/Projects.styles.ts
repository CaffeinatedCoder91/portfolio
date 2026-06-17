import styled, { css } from 'styled-components';
import type { TokenColor } from '@/lib/types';
import { theme as defaultTheme, type Theme } from '@/styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.colors);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

export const Section = styled.section`
  padding: ${({ theme }) => getTheme(theme).sizes.sectionPadding} 0;
  position: relative;
`;

export const Wrapper = styled.div`
  width: min(${({ theme }) => getTheme(theme).sizes.contentMaxWidth}, 90vw);
  margin-inline: auto;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => getTheme(theme).fonts.display};
  font-weight: 800;
  font-size: clamp(2.1rem, 5vw, 4rem);
  line-height: 1;
  margin-bottom: ${({ theme }) => getTheme(theme).space[5]};
  letter-spacing: 0;
  max-width: 18ch;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${({ theme }) => getTheme(theme).sizes.projectCardMin}, 1fr));
  gap: ${({ theme }) => getTheme(theme).sizes.projectGridGap};
`;

export const CardArticle = styled.article<{ $color: TokenColor }>`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${({ theme }) => getTheme(theme).colors.paper2};
  border: ${({ theme }) => getTheme(theme).border};
  border-radius: ${({ theme }) => getTheme(theme).radius.md};
  padding: ${({ theme }) => getTheme(theme).sizes.projectCardPadding};
  box-shadow: ${({ theme }) => getTheme(theme).shadows.md};
  cursor: pointer;
  transition: transform 0.12s ease-out;
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: ${({ theme }) => getTheme(theme).sizes.projectAccentLine};
    background: ${({ $color, theme }) => getTheme(theme).colors[$color]};
    z-index: 2;
  }

  &:hover {
    transform: translateY(${({ theme }) => getTheme(theme).sizes.projectHoverOffset});
  }

  @media (max-width: ${({ theme }) => getTheme(theme).sizes.timelineBreakpoint}) {
    &:hover {
      transform: translateY(0);
    }
  }
`;

export const CardImage = styled.div<{ $hasImage: boolean }>`
  display: block;
  margin: ${({ theme }) => getTheme(theme).sizes.projectCardImageMargin};
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: ${({ theme }) => getTheme(theme).colors.paper};
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
`;

export const CardImagePlaceholder = styled.div<{ $color: TokenColor }>`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ $color, theme }) => getTheme(theme).colors[$color]};
    opacity: 0.09;
  }

  span {
    position: relative;
    font-family: ${({ theme }) => getTheme(theme).fonts.mono};
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ $color, theme }) => getTheme(theme).colors[$color]};
    opacity: 0.8;
  }
`;

export const CategoryTag = styled.span<{ $color: TokenColor }>`
  display: inline-block;
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-size: ${({ theme }) => getTheme(theme).sizes.projectCategoryFont};
  font-weight: 700;
  color: ${({ theme }) => getTheme(theme).colors.white};
  background: ${({ $color, theme }) => getTheme(theme).colors[$color]};
  border: ${({ theme }) => getTheme(theme).border};
  border-radius: ${({ theme }) => getTheme(theme).sizes.projectCategoryRadius};
  padding: ${({ theme }) => getTheme(theme).sizes.projectCategoryPadding};
  margin-bottom: ${({ theme }) => getTheme(theme).sizes.projectCategoryMarginBottom};
  width: fit-content;
`;

export const CardTitle = styled.h3`
  font-family: ${({ theme }) => getTheme(theme).fonts.display};
  font-size: ${({ theme }) => getTheme(theme).sizes.projectTitleFont};
  font-weight: 800;
  margin: 0 0 ${({ theme }) => getTheme(theme).sizes.projectTitleMarginBottom};
  line-height: 1.05;
  color: ${({ theme }) => getTheme(theme).colors.ink};
`;

export const CardBlurb = styled.p`
  font-family: ${({ theme }) => getTheme(theme).fonts.body};
  font-size: 0.98rem;
  font-weight: 400;
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
  margin: 0 0 ${({ theme }) => getTheme(theme).sizes.projectBlurbMarginBottom};
  line-height: 1.6;
  flex-grow: 1;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => getTheme(theme).sizes.projectTagGap};
  margin-bottom: ${({ theme }) => getTheme(theme).sizes.projectTagMarginBottom};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => getTheme(theme).sizes.projectFooterGap};
  margin-top: auto;
`;

export const CardLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => getTheme(theme).sizes.projectLinkGap};
`;

export const CardLink = styled.a<{ $variant: 'live' | 'code'; $color?: TokenColor }>`
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-weight: 700;
  font-size: 0.88rem;
  padding: ${({ theme }) => getTheme(theme).sizes.projectLinkPadding};
  border-radius: ${({ theme }) => getTheme(theme).sizes.projectLinkRadius};
  border: ${({ theme }) => getTheme(theme).border};
  transition: background 0.15s ease, color 0.15s ease;
  cursor: pointer;
  text-decoration: none;

  ${({ $variant, $color, theme }) => {
    if ($variant === 'live' && $color) {
      return `
        background: ${getTheme(theme).colors[$color]};
        color: ${getTheme(theme).colors.white};
        border-color: ${getTheme(theme).colors[$color]};
      `;
    }
    return `
      background: transparent;
      color: ${getTheme(theme).colors.ink};
      border-color: ${getTheme(theme).colors.ink};

      &:hover {
        background: ${getTheme(theme).colors.ink};
        color: ${getTheme(theme).colors.white};
      }
    `;
  }}
`;

export const StatusNote = styled.span`
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-weight: 700;
  font-size: ${({ theme }) => getTheme(theme).sizes.projectStatusFont};
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
  border: ${({ theme }) => getTheme(theme).borderDashedSubtle};
  border-radius: ${({ theme }) => getTheme(theme).radius.sm};
  padding: ${({ theme }) => getTheme(theme).sizes.projectStatusPadding};
  display: inline-block;
`;

export const DetailsArrow = styled.span`
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-size: 0.78rem;
  font-weight: 700;
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => getTheme(theme).sizes.projectFilterGap};
  margin-bottom: ${({ theme }) => getTheme(theme).sizes.projectFilterMarginBottom};
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-weight: 700;
  font-size: ${({ theme }) => getTheme(theme).sizes.projectFilterFont};
  padding: ${({ theme }) => getTheme(theme).sizes.projectFilterPadding};
  border-radius: ${({ theme }) => getTheme(theme).radius.full};
  border: ${({ theme }) => getTheme(theme).border};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  ${({ $active, theme }) => {
    const t = getTheme(theme);
    return css`
      background: ${$active ? t.colors.ink : t.colors.paper2};
      color: ${$active ? t.colors.white : t.colors.ink};
    `;
  }}
`;
