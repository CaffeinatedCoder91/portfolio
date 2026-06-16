import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Joanna Joseph · Frontend Engineer',
  description: 'AI-native frontend engineer.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;
