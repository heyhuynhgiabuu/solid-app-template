import nkzw from '@nkzw/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: [
    'coverage',
    'dist',
    'client/dist',
    'server/dist',
    'server/src/prisma/prisma-client/**',
  ],
  overrides: [
    {
      files: ['**/__tests__/**'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['**/seed.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['server/src/index.ts', 'server/src/app.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    // SolidJS uses `class` not `className`
    'react/no-unknown-property': 'off',
    // SolidJS signals are not React hooks
    'react-hooks-js/immutability': 'off',
  },
});
