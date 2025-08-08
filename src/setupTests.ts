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