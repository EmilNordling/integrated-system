import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Plugin for React Fast refresh (HMR).
    // https://reactnative.dev/docs/next/fast-refresh
    // https://github.com/vitejs/vite/tree/main/packages/plugin-react-refresh#readme
    reactRefresh(),

    // Plugin for resolving TypeScript paths.
    // https://github.com/aleclarson/vite-tsconfig-paths#readme
    tsconfigPaths(),
  ],
  esbuild: {
    jsxInject: "import React from 'react';",
  },
});
