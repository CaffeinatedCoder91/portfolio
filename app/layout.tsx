import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  Zen_Maru_Gothic,
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Space_Mono,
} from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { theme } from '@/styles/theme';
import Nav from '@/components/nav/Nav';

const zenMaru = Zen_Maru_Gothic({
  weight: ['700'],
  variable: '--font-zen-maru',
  subsets: ['latin'],
});

const bricolage = Bricolage_Grotesque({
  weight: ['800'],
  variable: '--font-bricolage',
  subsets: ['latin'],
});

const hanken = Hanken_Grotesk({
  weight: ['400', '700'],
  variable: '--font-hanken',
  subsets: ['latin'],
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: '--font-space-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Joanna Joseph · Frontend Engineer',
  description: 'AI-native frontend engineer. React & TypeScript.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html
      lang="en"
      className={`${zenMaru.variable} ${bricolage.variable} ${hanken.variable} ${spaceMono.variable}`}
    >
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <a href="#main-content" className="skip-to-content">
              Skip to main content
            </a>
            <div className="frame" aria-hidden="true" />
            <Nav />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
