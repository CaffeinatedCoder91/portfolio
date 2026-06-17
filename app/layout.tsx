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
  metadataBase: new URL('https://joannamjoseph.com'),
  title: {
    template: '%s · Joanna Joseph',
    default: 'Joanna Joseph · Frontend Engineer',
  },
  description: 'AI-native frontend engineer building LLM-powered products. React, TypeScript, Next.js.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://joannamjoseph.com',
    title: 'Joanna Joseph · Frontend Engineer',
    description: 'AI-native frontend engineer building LLM-powered products. React, TypeScript, Next.js.',
    siteName: 'Joanna Joseph',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Joanna Joseph · Frontend Engineer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joanna Joseph · Frontend Engineer',
    description: 'AI-native frontend engineer building LLM-powered products. React, TypeScript, Next.js.',
    images: ['/og.png'],
    creator: '@joannamjoseph',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Joanna Joseph',
    url: 'https://joannamjoseph.com',
    jobTitle: 'Frontend Engineer',
    sameAs: [
      'https://linkedin.com/in/joannamjoseph',
      'https://github.com/CaffeinatedCoder91',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
  };

  return (
    <html
      lang="en"
      className={`${zenMaru.variable} ${bricolage.variable} ${hanken.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </head>
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
