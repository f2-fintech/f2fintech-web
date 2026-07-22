import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');
const outputPath = path.join(rootDir, 'public', 'sitemap.xml');

// Load environment variables manually to avoid adding extra dependencies
let baseApiUrl = 'https://api.f2fintech.com/api/v1'; // Production fallback
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/VITE_BASE_URL\s*=\s*["']?([^"'\r\n]+)/);
  if (match && match[1]) {
    baseApiUrl = match[1];
  }
}

// Override with process env if set
if (process.env.VITE_BASE_URL) {
  baseApiUrl = process.env.VITE_BASE_URL;
}

const baseUrl = 'https://f2fintech.com';

import { ALL_BANKS } from '../src/data/banksData.js';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/personal-loan', priority: '0.9', changefreq: 'weekly' },
  { path: '/business-loan', priority: '0.9', changefreq: 'weekly' },
  { path: '/home-loan', priority: '0.9', changefreq: 'weekly' },
  { path: '/doctor-loan', priority: '0.9', changefreq: 'weekly' },
  { path: '/loan-against-property', priority: '0.9', changefreq: 'weekly' },
  { path: '/unsecured-business-loan', priority: '0.8', changefreq: 'weekly' },
  { path: '/business-loan-for-women', priority: '0.8', changefreq: 'weekly' },
  { path: '/ecommerce-business-loan', priority: '0.8', changefreq: 'weekly' },
  { path: '/check-cibil-score', priority: '0.8', changefreq: 'weekly' },
  { path: '/our-products', priority: '0.8', changefreq: 'weekly' },
  { path: '/providers', priority: '0.7', changefreq: 'weekly' },
  { path: '/eligibility-checker', priority: '0.7', changefreq: 'monthly' },
  { path: '/dsa', priority: '0.8', changefreq: 'weekly' },
  { path: '/realtor', priority: '0.8', changefreq: 'weekly' },
  { path: '/offer', priority: '0.8', changefreq: 'weekly' },
  { path: '/doctors-and-professionals', priority: '0.8', changefreq: 'weekly' },
  { path: '/blogs', priority: '0.8', changefreq: 'daily' },
  { path: '/personal-loan-blogs', priority: '0.7', changefreq: 'weekly' },
  { path: '/business-loan-blogs', priority: '0.7', changefreq: 'weekly' },
  { path: '/overdraft-blogs', priority: '0.7', changefreq: 'weekly' },
  { path: '/about-us', priority: '0.6', changefreq: 'monthly' },
  { path: '/get-in-touch', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/channel-partners', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
  { path: '/terms-and-condition', priority: '0.4', changefreq: 'yearly' },
  { path: '/compliance', priority: '0.4', changefreq: 'yearly' },
  { path: '/fair-practices-code', priority: '0.4', changefreq: 'yearly' },
  { path: '/grievance-policy', priority: '0.4', changefreq: 'yearly' },
  { path: '/brochures', priority: '0.5', changefreq: 'monthly' },
  { path: '/feedback', priority: '0.5', changefreq: 'monthly' }
];

const fallbackBlogSlugs = [
  'doctor-loan-emi-calculator-2026-hdfc-icici-bajaj-finserv-rates',
  'doctor-loan-india-2026',
  'business',
  'doctorloan',
  'BusinessLoan'
];

async function generateSitemap() {
  console.log('Generating sitemap.xml...');
  console.log(`Using API Base URL: ${baseApiUrl}`);

  let blogs = [];
  let fetched = false;

  // Attempt 1: Configured API URL
  try {
    const response = await fetch(`${baseApiUrl}/blogs`);
    const data = await response.json();
    if (data && data.success && Array.isArray(data.blogs)) {
      blogs = data.blogs;
      fetched = true;
      console.log(`Fetched ${blogs.length} blogs successfully from API.`);
    }
  } catch (error) {
    console.warn(`Primary API URL (${baseApiUrl}) failed: ${error.message}`);
  }

  // Attempt 2: Production fallback if primary was local and failed
  if (!fetched && baseApiUrl !== 'https://api.f2fintech.com/api/v1') {
    try {
      console.log('Trying production API URL https://api.f2fintech.com/api/v1...');
      const response = await fetch('https://api.f2fintech.com/api/v1/blogs');
      const data = await response.json();
      if (data && data.success && Array.isArray(data.blogs)) {
        blogs = data.blogs;
        fetched = true;
        console.log(`Fetched ${blogs.length} blogs successfully from production API.`);
      }
    } catch (error) {
      console.warn(`Production API URL failed: ${error.message}`);
    }
  }

  // Attempt 3: Static fallback list
  if (!fetched) {
    console.log('Using static fallback list for blog routes.');
    blogs = fallbackBlogSlugs.map(slug => ({ route: `/blogs/${slug}` }));
  }

  const currentDate = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const addedUrls = new Set();

  const escapeXml = (str) =>
    str.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });

  // 1. Static Routes
  staticRoutes.forEach(route => {
    const loc = `${baseUrl}${route.path}`;
    if (!addedUrls.has(loc)) {
      addedUrls.add(loc);
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXml(loc)}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
  });

  // 2. Dynamic Blog Routes
  blogs.forEach(blog => {
    let routePath = blog.route || '';
    if (routePath) {
      // Extract the clean slug part from route (removing leading slashes and optional /blogs/ prefix)
      const slug = routePath.replace(/^\/?(blogs\/)?/, '');
      routePath = `/blogs/${slug}`;
      const loc = `${baseUrl}${routePath}`;

      if (!addedUrls.has(loc)) {
        addedUrls.add(loc);
        let lastmodDate = currentDate;
        if (blog.date) {
          try {
            const parsed = new Date(blog.date);
            if (!isNaN(parsed.getTime())) {
              lastmodDate = parsed.toISOString().split('T')[0];
            }
          } catch (e) {
            // fallback
          }
        }

        xml += `  <url>\n`;
        xml += `    <loc>${escapeXml(loc)}</loc>\n`;
        xml += `    <lastmod>${lastmodDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `  </url>\n`;
      }
    }
  });

  // 3. Dynamic Bank Product Routes
  if (Array.isArray(ALL_BANKS)) {
    ALL_BANKS.forEach(bank => {
      if (bank.loanTypes && typeof bank.loanTypes === 'object') {
        Object.keys(bank.loanTypes).forEach(category => {
          const bankLoanData = bank.loanTypes[category];
          if (bankLoanData && bankLoanData.slug) {
            const loc = `${baseUrl}/${category}/${bankLoanData.slug}`;
            if (!addedUrls.has(loc)) {
              addedUrls.add(loc);
              xml += `  <url>\n`;
              xml += `    <loc>${escapeXml(loc)}</loc>\n`;
              xml += `    <lastmod>${currentDate}</lastmod>\n`;
              xml += `    <changefreq>weekly</changefreq>\n`;
              xml += `    <priority>0.8</priority>\n`;
              xml += `  </url>\n`;
            }
          }
        });
      }
    });
  }

  xml += `</urlset>\n`;

  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write to public/sitemap.xml (for source control / persistent storage)
  fs.writeFileSync(outputPath, xml);
  console.log(`Successfully wrote sitemap to ${outputPath}`);

  // Write to dist/sitemap.xml directly if dist exists (to ensure build directory contains it immediately)
  const distPath = path.join(rootDir, 'dist', 'sitemap.xml');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, xml);
    console.log(`Successfully wrote sitemap to ${distPath}`);
  }
}

generateSitemap();
