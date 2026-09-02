import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),

    // Progressive Web App (PWA) – Service Worker + Web Manifest
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'f2Fintechlogo-old.webp',
        'robots.txt',
      ],
      manifest: {
        name: 'F2 Fintech – Instant Loans India',
        short_name: 'F2 Fintech',
        description: 'Apply for instant personal loans, business loans, home loans & MSME loans. Get your official Experian CIBIL credit score report in minutes.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f1c6b',
        theme_color: '#1d2ebd',
        orientation: 'portrait',
        scope: '/',
        lang: 'en-IN',
        categories: ['finance', 'business'],
        icons: [
          {
            src: '/f2Fintechlogo-old.webp',
            sizes: '192x192',
            type: 'image/webp',
            purpose: 'any maskable',
          },
          {
            src: '/f2Fintechlogo-old.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Apply for Loan',
            short_name: 'Apply Loan',
            url: '/get-in-touch',
            icons: [{ src: '/f2Fintechlogo-old.webp', sizes: '192x192' }],
          },
          {
            name: 'Check CIBIL Score',
            short_name: 'CIBIL Score',
            url: '/download-cibil',
            icons: [{ src: '/f2Fintechlogo-old.webp', sizes: '192x192' }],
          },
          {
            name: 'Credit Cards',
            short_name: 'Cards',
            url: '/cards',
            icons: [{ src: '/f2Fintechlogo-old.webp', sizes: '192x192' }],
          },
        ],
      },
      workbox: {
        // Cache app shell routes (SPA navigation)
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//, /^\/admin\//],

        // Runtime caching strategies
        runtimeCaching: [
          // Cache static assets: fonts, images, CSS, JS
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|woff2?|ttf|eot|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'f2fintech-assets',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          // Cache API responses (stale-while-revalidate for fresh data)
          {
            urlPattern: /^https:\/\/.*\.f2fintech\.com\/api\/v1\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'f2fintech-api',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
            },
          },
          // Cache Google Fonts
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
            },
          },
        ],

        // Skip waiting and claim clients immediately
        skipWaiting: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
      },
    }),

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

  // Speed up dev server & bypass CORS for Digitap and SmartAuth
  server: {
    proxy: {
      '/smartauth-proxy': {
        target: 'https://prod.smartauth.co',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/smartauth-proxy/, ''),
      },
      '/digitap-proxy': {
        target: 'https://svc.digitap.ai',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/digitap-proxy/, ''),
      },
    },
    warmup: {
      clientFiles: [
        './src/components/intro/Intro.jsx',
        './src/components/home/Home.jsx',
      ],
    },
  },
});
