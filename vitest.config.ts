import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom as the test environment
    setupFiles: './tests/setup.ts', // Setup file to run before tests
  },
});
