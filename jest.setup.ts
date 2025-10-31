import '@testing-library/jest-dom';

// window.matchMedia mock (for MUI)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    media: query,
    matches: false,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// A simple placeholder for canvas, in case it pops up somewhere
HTMLCanvasElement.prototype.getContext = (() => ({})) as any;