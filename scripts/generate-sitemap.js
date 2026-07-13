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
  { path: '/eligibility-criteria', priority: '0.7', changefreq: 'monthly' },
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

async function generateSitemap() {
  console.log('Generating sitemap.xml...');
  console.log(`Using API Base URL: ${baseApiUrl}`);

  let blogs = [];
  try {
    const response = await fetch(`${baseApiUrl}/blogs`);
    const data = await response.json();
    if (data && data.success && Array.isArray(data.blogs)) {
      blogs = data.blogs;
      console.log(`Fetched ${blogs.length} blogs successfully from API.`);
    } else {
      console.warn('API returned non-success response, using empty blogs list.', data);
    }
  } catch (error) {
    console.error(`Failed to fetch blogs from API (${error.message}). Sitemap will still contain static routes.`);
  }

  const currentDate = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Routes
  staticRoutes.forEach(route => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // 2. Dynamic Blog Routes
  blogs.forEach(blog => {
    let routePath = blog.route || '';
    if (routePath) {
      // Extract the clean slug part from route (removing leading slashes and optional /blogs/ prefix)
      const slug = routePath.replace(/^\/?(blogs\/)?/, '');
      routePath = `/blogs/${slug}`;

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
      xml += `    <loc>${baseUrl}${routePath}</loc>\n`;
      xml += `    <lastmod>${lastmodDate}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    }
  });

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
