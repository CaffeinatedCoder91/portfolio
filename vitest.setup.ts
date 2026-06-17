import 'jest-axe/extend-expect';

const mockCanvasContext = {
  clearRect: () => undefined,
  fill: () => undefined,
  beginPath: () => undefined,
  arc: () => undefined,
  fillStyle: '',
  globalAlpha: 1,
} as unknown as CanvasRenderingContext2D;

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  writable: true,
  value: (contextId: string) => (contextId === '2d' ? mockCanvasContext : null),
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
