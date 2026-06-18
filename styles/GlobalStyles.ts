import { createGlobalStyle } from 'styled-components';
import { theme as defaultTheme, type Theme } from '@/styles/theme';

type ThemeContext = {
  theme?: Theme;
};

const color =
  (token: keyof Theme['rawColors']) =>
  ({ theme }: ThemeContext): string =>
    (theme ?? defaultTheme).rawColors[token];

const darkColor =
  (token: keyof Theme['darkColors']) =>
  ({ theme }: ThemeContext): string =>
    (theme ?? defaultTheme).darkColors[token];

const GlobalStyles = createGlobalStyle`
  :root {
    --paper: ${color('paper')};
    --paper-2: ${color('paper2')};
    --ink: ${color('ink')};
    --ink-soft: ${color('inkSoft')};
    --line: ${color('line')};
    --ai: ${color('ai')};
    --shu: ${color('shu')};
    --mizu: ${color('mizu')};
    --fuji: ${color('fuji')};
    --matcha: ${color('matcha')};
    --kincha: ${color('kincha')};
    --white: ${color('white')};
    --shu-highlight: ${color('shuHighlight')};
    --modal-backdrop: ${color('modalBackdrop')};
  }

  html.dark {
    --paper: ${darkColor('paper')};
    --paper-2: ${darkColor('paper2')};
    --ink: ${darkColor('ink')};
    --ink-soft: ${darkColor('inkSoft')};
    --line: ${darkColor('line')};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: var(--font-hanken), system-ui, sans-serif;
    color: var(--ink);
    background: var(--paper);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  .frame {
    position: fixed;
    inset: 0;
    border: 7px solid var(--ai);
    pointer-events: none;
    z-index: 100;
  }

  .skip-to-content {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .skip-to-content:focus {
    position: fixed;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    overflow: visible;
    padding: 16px 24px;
    background: var(--ink);
    color: var(--paper);
    font-family: monospace;
    font-weight: 700;
    font-size: 14px;
    z-index: 999;
    border-radius: 0 0 14px 0;
  }
`;

export default GlobalStyles;
