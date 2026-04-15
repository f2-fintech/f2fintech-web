import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

// Custom lightweight plugin to intelligently auto-assign lazy loading
function lazyLoadImages() {
  return {
    name: 'lazy-load-images',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.jsx') || id.endsWith('.tsx')) {
        return code.replace(/<img(\s+(?!.*?loading=)[^>]*?)>/g, '<img loading="lazy" decoding="async"$1>');
      }
      return code;
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    lazyLoadImages(),

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
    rollupOptions: {
      output: {
        manualChunks: {
          react_vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@mui/system'],
          framer: ['framer-motion'],
        }
      }
    }
  },
});
