import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/app.ts'],
  external: ['@prisma/client', '@prisma/adapter-pg'],
  outputOptions: { file: 'dist/index.js' },
});
