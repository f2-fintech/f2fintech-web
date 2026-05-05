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
        manualChunks(id) {
          // Core React
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'react_vendor';
          }
          // MUI — split into two so neither chunk is too large
          if (id.includes('@mui/icons-material')) {
            return 'mui_icons';
          }
          if (id.includes('@mui/material') ||
              id.includes('@mui/system') ||
              id.includes('@mui/base') ||
              id.includes('@emotion/react') ||
              id.includes('@emotion/styled')) {
            return 'mui_core';
          }
          // Animation libs
          if (id.includes('framer-motion')) {
            return 'framer';
          }
          if (id.includes('gsap')) {
            return 'gsap';
          }
          // Charts
          if (id.includes('recharts')) {
            return 'recharts';
          }
          // TipTap editor (admin-only, large)
          if (id.includes('@tiptap')) {
            return 'tiptap';
          }
          // Firebase (large SDK)
          if (id.includes('firebase')) {
            return 'firebase';
          }
          // PDF/OCR libs (heavy, rarely used)
          if (id.includes('pdfjs-dist') ||
              id.includes('jspdf') ||
              id.includes('html2canvas') ||
              id.includes('tesseract')) {
            return 'pdf_ocr';
          }
          // Fonts package
          if (id.includes('@fontsource')) {
            return 'fonts';
          }
          // Redux
          if (id.includes('redux') || id.includes('react-redux')) {
            return 'redux';
          }
        },
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
