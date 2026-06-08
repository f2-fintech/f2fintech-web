const fs = require('fs');
const path = require('path');
const https = require('https');

const rawCssPath = path.join(__dirname, 'google_fonts_raw.css');
const fontsOutputDir = path.join(__dirname, '..', 'public', 'fonts');

if (!fs.existsSync(fontsOutputDir)) {
  fs.mkdirSync(fontsOutputDir, { recursive: true });
}

const rawCss = fs.readFileSync(rawCssPath, 'utf8');

// Regex to capture the subset comment and the @font-face block contents
const fontFaceRegex = /\/\*\s*([^*]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  let match;
  let newCss = '';
  const downloads = [];

  while ((match = fontFaceRegex.exec(rawCss)) !== null) {
    const subset = match[1].trim();
    const body = match[2];

    const familyMatch = body.match(/font-family:\s*['"]?([^'"]+)['"]?/);
    const styleMatch = body.match(/font-style:\s*([^;]+)/);
    const weightMatch = body.match(/font-weight:\s*([^;]+)/);
    const urlMatch = body.match(/url\((https:\/\/[^)]+)\)/);
    const unicodeRangeMatch = body.match(/unicode-range:\s*([^;]+)/);

    if (!familyMatch || !urlMatch) {
      continue;
    }

    const family = familyMatch[1].trim();
    const style = styleMatch ? styleMatch[1].trim() : 'normal';
    const weight = weightMatch ? weightMatch[1].trim().replace(/\s+/g, '_') : '400';
    const url = urlMatch[1].trim();
    const unicodeRange = unicodeRangeMatch ? unicodeRangeMatch[1].trim() : '';

    // Generate a clean local filename
    const cleanFamily = family.toLowerCase().replace(/\s+/g, '-');
    const cleanSubset = subset.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `${cleanFamily}-${style}-${weight}-${cleanSubset}.woff2`;
    const destPath = path.join(fontsOutputDir, filename);

    downloads.push({
      url,
      filename,
      destPath,
      family,
      style,
      weight,
      unicodeRange,
      subset
    });
  }

  console.log(`Found ${downloads.length} fonts to download.`);

  for (let i = 0; i < downloads.length; i++) {
    const d = downloads[i];
    console.log(`Downloading ${i + 1}/${downloads.length}: ${d.filename}...`);
    try {
      if (!fs.existsSync(d.destPath)) {
        await downloadFile(d.url, d.destPath);
      } else {
        console.log(`  Already downloaded: ${d.filename}`);
      }
      
      // Add the local @font-face block to the CSS
      newCss += `/* ${d.subset} */
@font-face {
  font-family: '${d.family}';
  font-style: ${d.style};
  font-weight: ${d.weight.replace(/_/g, ' ')};
  font-display: swap;
  src: url('./${d.filename}') format('woff2');
  unicode-range: ${d.unicodeRange};
}
`;
    } catch (err) {
      console.error(`Failed to download ${d.filename}:`, err);
    }
  }

  const outputCssPath = path.join(fontsOutputDir, 'fonts.css');
  fs.writeFileSync(outputCssPath, newCss, 'utf8');
  console.log(`Successfully generated local stylesheet: ${outputCssPath}`);
}

run();
