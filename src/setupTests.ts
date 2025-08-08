// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Provide a Jest-compatible global for tests that use Jest APIs
// Map common Jest functions to Vitest's `vi` implementation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).jest = vi;

// Initialize i18n for tests to return real translation strings
import './i18n';
import i18n from 'i18next';

// Ensure tests run in English
await i18n.changeLanguage('en');

// Polyfill IntersectionObserver for components that use it
class IntersectionObserverMock {
  readonly root: Element | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

// Mock react-helmet-async to avoid requiring HelmetProvider context in unit tests
vi.mock('react-helmet-async', async () => {
  const React = await import('react');
  return {
    HelmetProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    Helmet: ({ children }: { children?: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  };
});

// Provide a default mock for Analytics context used in components
vi.mock('@/providers/AnalyticsProvider', () => ({
  useAnalyticsContext: () => ({
    trackEvent: vi.fn(),
    getTestVariant: vi.fn(),
    trackABConversion: vi.fn(),
  }),
}));