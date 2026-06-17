'use client';
// React error boundaries must be class components and run on the client.

import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

interface SentryInterface {
  captureException: (error: Error) => void;
}

class InkCanvasErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    if (typeof window !== 'undefined' && 'Sentry' in window) {
      const sentry = window.Sentry as unknown as SentryInterface | undefined;
      if (sentry && 'captureException' in sentry) {
        sentry.captureException(error);
      }
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default InkCanvasErrorBoundary;
