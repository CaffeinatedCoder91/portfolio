import styled from 'styled-components';
import type { TokenColor } from '../../../lib/types';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

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
  margin-bottom: ${({ theme }) => getTheme(theme).space[6]};
  letter-spacing: 0;
`;

export const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => getTheme(theme).space[6]};

  @media (max-width: ${({ theme }) => getTheme(theme).sizes.timelineBreakpoint}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => getTheme(theme).sizes.timelineMobileGap};
  }
`;

export const Column = styled.div``;

export const ColumnHead = styled.h3<{ $color: TokenColor }>`
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  display: inline-block;
  position: relative;
  z-index: 1;
  margin-bottom: ${({ theme }) => getTheme(theme).sizes.timelineHeadMarginBottom};
  padding: ${({ theme }) => getTheme(theme).sizes.timelineHeadPadding};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: ${({ theme }) => getTheme(theme).sizes.timelineHeadUnderlineBottom};
    height: ${({ theme }) => getTheme(theme).sizes.timelineHeadUnderlineHeight};
    background: ${({ $color, theme }) => getTheme(theme).colors[$color]};
    z-index: -1;
  }
`;

export const TimelineList = styled.div`
  position: relative;
  padding-left: ${({ theme }) => getTheme(theme).sizes.timelineIndent};

  &::before {
    content: '';
    position: absolute;
    left: ${({ theme }) => getTheme(theme).sizes.timelineLineLeft};
    top: ${({ theme }) => getTheme(theme).sizes.timelineLineInset};
    bottom: ${({ theme }) => getTheme(theme).sizes.timelineLineInset};
    width: ${({ theme }) => getTheme(theme).sizes.timelineLineWidth};
    background: ${({ theme }) => getTheme(theme).colors.line};
    border-radius: ${({ theme }) => getTheme(theme).sizes.timelineLineRadius};
  }
`;

export const TimelineItemWrapper = styled.article<{ $color: TokenColor }>`
  position: relative;
  padding-bottom: ${({ theme }) => getTheme(theme).sizes.timelineItemPaddingBottom};

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: calc(-1 * ${({ theme }) => getTheme(theme).sizes.timelineIndent});
    top: ${({ theme }) => getTheme(theme).sizes.timelineDotTop};
    width: ${({ theme }) => getTheme(theme).sizes.timelineDotSize};
    height: ${({ theme }) => getTheme(theme).sizes.timelineDotSize};
    border-radius: ${({ theme }) => getTheme(theme).sizes.timelineDotRadius};
    background: ${({ $color, theme }) => getTheme(theme).colors[$color]};
    border: ${({ theme }) => getTheme(theme).border};
    transform: ${({ theme }) => getTheme(theme).sizes.timelineDotRotate};
  }
`;

export const DatePill = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => getTheme(theme).fonts.mono};
  font-weight: 700;
  font-size: ${({ theme }) => getTheme(theme).sizes.timelineDateFont};
  background: ${({ theme }) => getTheme(theme).colors.paper2};
  border: ${({ theme }) => getTheme(theme).border};
  border-radius: ${({ theme }) => getTheme(theme).radius.sm};
  padding: ${({ theme }) => getTheme(theme).sizes.timelineDatePadding};
  margin-bottom: ${({ theme }) => getTheme(theme).sizes.timelineDateMarginBottom};
`;

export const Role = styled.h4`
  font-family: ${({ theme }) => getTheme(theme).fonts.display};
  font-weight: 800;
  font-size: ${({ theme }) => getTheme(theme).sizes.timelineRoleFont};
  color: ${({ theme }) => getTheme(theme).colors.ink};
  line-height: 1.1;
  margin: 0;
`;

export const Org = styled.div`
  font-family: ${({ theme }) => getTheme(theme).fonts.body};
  font-weight: 700;
  font-size: ${({ theme }) => getTheme(theme).space[3]};
  color: ${({ theme }) => getTheme(theme).colors.ai};
  margin: ${({ theme }) => getTheme(theme).sizes.timelineOrgMargin};
`;

export const Description = styled.p`
  font-family: ${({ theme }) => getTheme(theme).fonts.body};
  font-size: ${({ theme }) => getTheme(theme).sizes.timelineBodyFont};
  color: ${({ theme }) => getTheme(theme).colors.inkSoft};
  margin: 0;
  line-height: 1.6;
  max-width: ${({ theme }) => getTheme(theme).sizes.timelineDescMaxWidth};
`;

export const PointsList = styled.ul<{ $color: TokenColor }>`
  list-style: none;
  margin-top: ${({ theme }) => getTheme(theme).sizes.timelineBulletMarginTop};
  padding: 0;

  li {
    position: relative;
    padding-left: ${({ theme }) => getTheme(theme).sizes.timelineBulletPaddingLeft};
    color: ${({ theme }) => getTheme(theme).colors.inkSoft};
    font-size: ${({ theme }) => getTheme(theme).sizes.timelineBulletFont};
    line-height: ${({ theme }) => getTheme(theme).sizes.timelineBulletLineHeight};
    margin-bottom: ${({ theme }) => getTheme(theme).sizes.timelineBulletMarginBottom};
    max-width: ${({ theme }) => getTheme(theme).sizes.timelineBulletMaxWidth};

    &::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${({ $color, theme }) => getTheme(theme).colors[$color]};
      font-weight: 700;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
