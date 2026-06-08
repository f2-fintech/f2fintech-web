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
    // Combine all CSS into a single file to reduce server requests
    cssCodeSplit: false,
    // esbuild is faster than terser and produces similar output
    minify: 'esbuild',
    // Warn when any chunk exceeds 1MB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Merge chunks smaller than 20KB to avoid many small network requests
        experimentalMinChunkSize: 20000,
        // Group frequently used libraries to avoid excessive splitting
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui';
            }
            if (
              id.includes('react') ||
              id.includes('redux') ||
              id.includes('react-router')
            ) {
              return 'vendor-core';
            }
            if (id.includes('@tiptap') || id.includes('prosemirror')) {
              return 'vendor-editor';
            }
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
