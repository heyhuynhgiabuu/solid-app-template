import { join } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

const root = process.cwd();

export default defineConfig({
  build: { outDir: join(root, '../dist/client') },
  plugins: [tailwindcss(), solid()],
  server: {
    port: 5173,
    proxy: {
      '/api/auth': {
        changeOrigin: true,
        target: 'http://localhost:9000',
      },
      '/trpc': {
        changeOrigin: true,
        target: 'http://localhost:9000',
      },
    },
  },
});
