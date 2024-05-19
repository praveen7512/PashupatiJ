import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  esbuild: {
    ...(process.env.NODE_ENV === 'production' && {
      drop: ['console', 'debugger'],
    }),
  },
  plugins: [
    svgr({
      esbuildOptions: {},
      include: '**/*.svg',
      exclude: '',
    }),
    react(),
    tsconfigPaths(),
  ],
  server: {
    open: true,
    port: 8080,
  },
  resolve: {
    alias: [
      {
        find: '@analytics',
        replacement: resolve(__dirname, './src/analytics/'),
      },
      {
        find: '@assets',
        replacement: resolve(__dirname, './src/assets/'),
      },
      {
        find: '@locales',
        replacement: resolve(__dirname, './src/locales/'),
      },
      {
        find: '@components',
        replacement: resolve(__dirname, './src/components/'),
      },
      {
        find: '@config',
        replacement: resolve(__dirname, './src/config/'),
      },
      {
        find: '@hooks',
        replacement: resolve(__dirname, './src/hooks/'),
      },
      {
        find: '@locales',
        replacement: resolve(__dirname, './src/locales/'),
      },
      {
        find: '@locales',
        replacement: resolve(__dirname, './src/locales/'),
      },
      {
        find: '@locales',
        replacement: resolve(__dirname, './src/locales/'),
      },
      {
        find: '@models',
        replacement: resolve(__dirname, './src/models/'),
      },
      {
        find: '@routes',
        replacement: resolve(__dirname, './src/routes/'),
      },
      {
        find: '@pages',
        replacement: resolve(__dirname, './src/pages/'),
      },
      {
        find: '@services',
        replacement: resolve(__dirname, './src/services'),
      },
      {
        find: '@theme',
        replacement: resolve(__dirname, './src/theme/'),
      },
      {
        find: '@types',
        replacement: resolve(__dirname, './src/types/'),
      },
      {
        find: '@utils',
        replacement: resolve(__dirname, './src/utils/'),
      },
    ],
  },
});
