import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),

    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),

    // Brotli compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),

    // Visualize bundle size (optional)
    visualizer({
      open: true,
      filename: 'bundle-report.html',
    }),
  ],

  build: {
    minify: 'terser', // switch from default 'esbuild' to 'terser'
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
