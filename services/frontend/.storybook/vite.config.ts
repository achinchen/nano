/// <reference types="vitest" />
import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/frontend/storybook',
  plugins: [
    react(),
    dts({
      tsconfigPath: join(__dirname, '../tsconfig.storybook.json'),
    }),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
});
