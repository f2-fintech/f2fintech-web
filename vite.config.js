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
        // Manual chunk splitting — groups heavy vendor libraries so they can be
        // cached independently and only downloaded when the route that needs them loads.
        manualChunks(id) {
          // MUI — largest single dependency, split further by area
          if (id.includes('@mui/x-date-pickers') || id.includes('@mui/lab')) {
            return 'vendor-mui-extra';
          }
          if (id.includes('@mui/icons-material')) {
            return 'vendor-mui-icons';
          }
          if (id.includes('@mui/material') || id.includes('@mui/system') || id.includes('@mui/base') || id.includes('@emotion')) {
            return 'vendor-mui-core';
          }

          // TipTap rich-text editor — only used on the blog formatter page
          if (id.includes('@tiptap')) {
            return 'vendor-tiptap';
          }

          // Firebase — only used when user is authenticated
          if (id.includes('firebase')) {
            return 'vendor-firebase';
          }

          // Recharts — only used on dashboard/analytics pages
          if (id.includes('recharts') || id.includes('d3-')) {
            return 'vendor-charts';
          }

          // PDF-related — heavy, only used on brochure/document pages
          if (id.includes('pdfjs-dist') || id.includes('jspdf') || id.includes('html2canvas')) {
            return 'vendor-pdf';
          }

          // Framer Motion / GSAP — animation libraries
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'vendor-animation';
          }

          // React core — kept together for maximum cache stability
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }

          // React Router
          if (id.includes('react-router') || id.includes('react-router-dom')) {
            return 'vendor-router';
          }

          // Redux
          if (id.includes('redux') || id.includes('react-redux') || id.includes('redux-thunk')) {
            return 'vendor-redux';
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
