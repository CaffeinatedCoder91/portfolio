'use client';
// Error boundaries need client hooks to report exceptions and retry rendering.

import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const pageStyle = {
  minHeight: '100vh',
  display: 'grid',
  placeItems: 'center',
  padding: '32px',
  background: '#F1ECE1',
  color: '#2A2521',
  fontFamily: 'var(--font-hanken), system-ui, sans-serif',
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
  fontFamily: 'var(--font-bricolage), system-ui, sans-serif',
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
  fontFamily: 'var(--font-space-mono), monospace',
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
  fontFamily: 'var(--font-space-mono), monospace',
  fontSize: '0.85rem',
  fontWeight: 700,
  textDecoration: 'none',
} satisfies React.CSSProperties;

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main style={pageStyle}>
      <section aria-labelledby="error-title" style={panelStyle}>
        <h1 id="error-title" style={headingStyle}>
          Something went wrong.
        </h1>
        <p style={copyStyle}>
          Please try again, or head home and start from a calmer place.
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
  );
};

export default ErrorPage;
