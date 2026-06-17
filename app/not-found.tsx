import Link from 'next/link';

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
  margin: '0',
  color: '#3C5366',
  fontFamily: 'var(--font-space-mono), monospace',
  fontSize: 'clamp(4.5rem, 18vw, 9rem)',
  fontWeight: 700,
  lineHeight: 0.9,
} satisfies React.CSSProperties;

const copyStyle = {
  margin: '18px 0 28px',
  color: '#2A2521',
  fontFamily: 'var(--font-bricolage), system-ui, sans-serif',
  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
  fontWeight: 800,
  lineHeight: 1,
} satisfies React.CSSProperties;

const linkStyle = {
  display: 'inline-flex',
  minHeight: '44px',
  alignItems: 'center',
  padding: '0 18px',
  border: '1.5px solid #2A2521',
  borderRadius: '9999px',
  background: '#3C5366',
  color: '#FAF7F0',
  fontFamily: 'var(--font-space-mono), monospace',
  fontSize: '0.85rem',
  fontWeight: 700,
  textDecoration: 'none',
} satisfies React.CSSProperties;

const NotFound = () => {
  return (
    <main style={pageStyle}>
      <section aria-labelledby="not-found-title" style={panelStyle}>
        <h1 id="not-found-title" style={headingStyle}>
          404
        </h1>
        <p style={copyStyle}>Page not found.</p>
        <Link href="/" style={linkStyle}>
          Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
