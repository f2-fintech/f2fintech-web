import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),

    // Gzip compression for production
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),

    // Brotli compression (better ratio than gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),

    // Bundle visualizer — open:false so it doesn't pop up on every build
    visualizer({
      open: false,
      filename: 'bundle-report.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    // esbuild is faster than terser and produces similar output
    minify: 'esbuild',
    // Warn when any chunk exceeds 1MB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Letting Vite handle chunking automatically to prevent CSS order issues
        // and circular dependencies that occur with aggressive manual splitting.
      },
    },
  },

  // Speed up dev server
  server: {
    warmup: {
      clientFiles: [
        './src/components/intro/Intro.jsx',
        './src/components/home/Home.jsx',
      ],
    },
  },
});
