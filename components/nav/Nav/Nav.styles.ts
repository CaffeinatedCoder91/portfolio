import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';
import { theme as defaultTheme, type Theme } from '../../../styles/theme';

type ThemeInput = Partial<Theme> | undefined;

const hasTheme = (theme: ThemeInput): theme is Theme => {
  return Boolean(theme?.sizes);
};

const getTheme = (theme: ThemeInput): Theme => {
  return hasTheme(theme) ? theme : defaultTheme;
};

const pulse = keyframes`
  50% {
    box-shadow: 0 0 0 var(--dot-pulse-size) transparent;
  }
`;

export const NavShell = styled.header<{ $hidden: boolean }>`
  position: fixed;
  top: calc(${({ theme }) => getTheme(theme).sizes.frame} + ${({ theme }) => getTheme(theme).sizes.navOffset});
  right: 0;
  left: 0;
  z-index: 50;
  padding: 0 ${({ theme }) => getTheme(theme).sizes.navOffset};
  transform: ${({ $hidden }) => ($hidden ? 'translateY(-140%)' : 'none')};
  transition: transform 0.35s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const NavPill = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => getTheme(theme).space[3]};
  width: 100%;
  max-width: ${({ theme }) => getTheme(theme).sizes.navMaxWidth};
  margin-inline: auto;
  padding: ${({ theme }) =>
    `${getTheme(theme).space[2]} calc(${getTheme(theme).space[2]} + ${getTheme(theme).space[1]} / 2) ${getTheme(theme).space[2]} calc(${getTheme(theme).space[3]} + ${getTheme(theme).space[1]})`};
  background: color-mix(in srgb, ${({ theme }) => getTheme(theme).colors.paper2} 92%, transparent);
  backdrop-filter: blur(0.75rem);
  border: ${({ theme }) => getTheme(theme).border};
  border-radius: ${({ theme }) => getTheme(theme).radius.full};
  box-shadow: ${({ theme }) => getTheme(theme).shadows.sm};
`;

export const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => getTheme(theme).space[2]};
  font-family: ${({ theme }) => getTheme(theme).fonts.display};
  font-size: 1.125rem;
  font-weight: 800;
  line-height: 1.2;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => getTheme(theme).space[2]};
`;

export const StatusDot = styled.span`
  --dot-pulse-size: calc(${({ theme }) => getTheme(theme).space[2]} + ${({ theme }) => getTheme(theme).space[1]} / 4);

  width: ${({ theme }) => getTheme(theme).sizes.brandDot};
  height: ${({ theme }) => getTheme(theme).sizes.brandDot};
  border-radius: ${({ theme }) => getTheme(theme).radius.full};
  background: ${({ theme }) => getTheme(theme).colors.matcha};
  box-shadow: 0 0 0 ${({ theme }) => getTheme(theme).space[1]}
    color-mix(in srgb, ${({ theme }) => getTheme(theme).colors.matcha} 22%, transparent);
  animation: ${pulse} 2.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const LinkList = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => getTheme(theme).space[1]};

  @media (max-width: 48.75rem) {
    position: absolute;
    top: ${({ theme }) => getTheme(theme).sizes.navDropdownOffset};
    right: ${({ theme }) => getTheme(theme).sizes.navOffset};
    left: ${({ theme }) => getTheme(theme).sizes.navOffset};
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    align-items: stretch;
    padding: calc(${({ theme }) => getTheme(theme).space[2]} - ${({ theme }) => getTheme(theme).space[1]} / 2);
    background: ${({ theme }) => getTheme(theme).colors.paper2};
    border: ${({ theme }) => getTheme(theme).border};
    border-radius: ${({ theme }) => getTheme(theme).sizes.navDropdownRadius};
    box-shadow: ${({ theme }) => getTheme(theme).shadows.sm};
  }
`;

const activeStyles = css`
  background: ${({ theme }) => getTheme(theme).colors.ai};
  color: ${({ theme }) => getTheme(theme).colors.white};
`;

export const NavItem = styled(Link)<{ $active: boolean; $outlined?: boolean }>`
  border-radius: ${({ theme }) => getTheme(theme).radius.full};
  padding: calc(${({ theme }) => getTheme(theme).space[2]} - ${({ theme }) => getTheme(theme).space[1]} / 2)
    calc(${({ theme }) => getTheme(theme).space[2]} + ${({ theme }) => getTheme(theme).space[1]});
  border: ${({ $outlined, theme }) =>
    $outlined ? getTheme(theme).border : getTheme(theme).borderTransparent};
  background: ${({ theme }) => getTheme(theme).colors.transparent};
  color: ${({ theme }) => getTheme(theme).colors.ink};
  font-family: ${({ theme }) => getTheme(theme).fonts.body};
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.4;
  transition:
    background 0.2s,
    color 0.2s;

  ${({ $active }) => $active && activeStyles}
  border-color: ${({ $active, $outlined, theme }) =>
    $active
      ? getTheme(theme).colors.ai
      : $outlined
        ? getTheme(theme).colors.ink
        : getTheme(theme).colors.transparent};

  &:hover {
    background: ${({ theme }) => getTheme(theme).colors.ink};
    color: ${({ theme }) => getTheme(theme).colors.white};
  }

  @media (max-width: 48.75rem) {
    padding: calc(${({ theme }) => getTheme(theme).space[2]} + ${({ theme }) => getTheme(theme).space[1]} / 2)
      ${({ theme }) => getTheme(theme).space[3]};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const MenuToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => getTheme(theme).sizes.navToggle};
  height: ${({ theme }) => getTheme(theme).sizes.navToggle};
  border: 0;
  border-radius: ${({ theme }) => getTheme(theme).radius.full};
  background: ${({ theme }) => getTheme(theme).colors.ink};
  color: ${({ theme }) => getTheme(theme).colors.paper2};
  font-size: 1.2rem;
  line-height: 1;

  @media (max-width: 48.75rem) {
    display: inline-flex;
  }
`;
