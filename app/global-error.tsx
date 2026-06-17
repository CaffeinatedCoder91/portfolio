'use client';
// Global error boundaries replace the root layout, so they must render html/body.

import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const bodyStyle = {
  margin: 0,
  minHeight: '100vh',
  background: '#F1ECE1',
  color: '#2A2521',
  fontFamily: 'Hanken Grotesk, system-ui, sans-serif',
} satisfies React.CSSProperties;

const pageStyle = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: '32px',
} satisfies React.CSSProperties;

const panelStyle = {
  width: 'min(100%, 520px)',
  padding: '32px',
  border: '1.5px solid #2A2521',
  borderRadius: '22px',
  background: '#FAF7F0',
  boxShadow: '0 6px 22px rgba(42,37,33,0.07)',
  textAlign: 'center',
} satisfies React.CSSProperties;

const headingStyle = {
  margin: '0 0 16px',
  color: '#2A2521',
  fontFamily: 'Bricolage Grotesque, system-ui, sans-serif',
  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
  fontWeight: 800,
  lineHeight: 1,
} satisfies React.CSSProperties;

const copyStyle = {
  margin: '0 0 24px',
  color: '#7A7166',
  fontSize: '1rem',
  lineHeight: 1.6,
} satisfies React.CSSProperties;

const actionsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '12px',
} satisfies React.CSSProperties;

const buttonStyle = {
  minHeight: '44px',
  padding: '0 18px',
  border: '1.5px solid #2A2521',
  borderRadius: '9999px',
  background: '#3C5366',
  color: '#FAF7F0',
  cursor: 'pointer',
  fontFamily: 'Space Mono, monospace',
  fontSize: '0.85rem',
  fontWeight: 700,
} satisfies React.CSSProperties;

const linkStyle = {
  display: 'inline-flex',
  minHeight: '44px',
  alignItems: 'center',
  padding: '0 18px',
  border: '1.5px solid #2A2521',
  borderRadius: '9999px',
  background: '#F1ECE1',
  color: '#2A2521',
  fontFamily: 'Space Mono, monospace',
  fontSize: '0.85rem',
  fontWeight: 700,
  textDecoration: 'none',
} satisfies React.CSSProperties;

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={bodyStyle}>
        <main style={pageStyle}>
          <section aria-labelledby="global-error-title" style={panelStyle}>
            <h1 id="global-error-title" style={headingStyle}>
              Something went wrong.
            </h1>
            <p style={copyStyle}>
              Please try again, or head home and start fresh.
            </p>
            <div style={actionsStyle}>
              <button type="button" onClick={reset} style={buttonStyle}>
                Try again
              </button>
              <Link href="/" style={linkStyle}>
                Home
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
