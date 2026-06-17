import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Joanna Joseph · Frontend Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#F1ECE1',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '60px',
          gap: '40px',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            position: 'absolute',
            top: '120px',
            width: '200px',
            height: '8px',
            background: '#B24A2E',
            borderRadius: '4px',
          }}
        />

        {/* Name */}
        <h1
          style={{
            fontSize: '80px',
            fontWeight: 700,
            color: '#2A2521',
            margin: '0',
            marginTop: '60px',
            textAlign: 'center',
            fontFamily: '"Zen Maru Gothic", system-ui',
            letterSpacing: '-2px',
          }}
        >
          Joanna Joseph
        </h1>

        {/* Title */}
        <p
          style={{
            fontSize: '48px',
            fontWeight: 400,
            color: '#7A7166',
            margin: '0',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.5px',
          }}
        >
          Frontend Engineer
        </p>

        {/* Accent dots */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '30px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              background: '#B24A2E',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              background: '#3C5366',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              background: '#5B7A8C',
              borderRadius: '50%',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
