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

    // Bundle visualizer - open:false so it doesn't pop up on every build
    visualizer({
      open: false,
      filename: 'bundle-report.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  build: {
    // Combine all CSS into a single file to reduce server requests
    cssCodeSplit: false,
    // esbuild is faster than terser and produces similar output
    minify: 'esbuild',
    // Warn when any chunk exceeds 1MB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Letting Vite handle chunking automatically to prevent CSS order issues
        // and circular initialization dependencies with React/MUI/Emotion.
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
