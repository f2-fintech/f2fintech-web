// Fix failed partners: copy existing webp files and handle AVIF via direct S3 fetch
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/partners");

// Already-webp sources that failed "same input/output" - just download fresh to correct path
const directCopies = [
  { slug: "godrej",       url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/godrej.webp" },
  { slug: "lendingkart",  url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/Lendingkart.webp" },
  { slug: "sbi",          url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/sbi.webp" },
  { slug: "poonawala",    url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/poonawala.webp" },
];

// AVIF ones - download and convert
const avifOnes = [
  { slug: "lnt",   url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/LNT.avif" },
  { slug: "icici", url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/ICICI%20Bank%202.avif" },
];

function downloadToFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        return downloadToFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (e) => reject(e));
  });
}

async function main() {
  const { default: sharp } = await import("sharp");

  // Handle direct webp copies
  for (const p of directCopies) {
    const dest = path.join(OUTPUT_DIR, `${p.slug}.webp`);
    console.log(`⬇  Downloading ${p.slug}.webp directly...`);
    try {
      await downloadToFile(p.url, dest);
      console.log(`✅ Saved: ${p.slug}.webp`);
    } catch(e) {
      console.error(`❌ ${p.slug}: ${e.message}`);
    }
  }

  // Handle AVIF - download raw then try sharp with heif support, fallback to keeping raw
  for (const p of avifOnes) {
    const tmpPath = path.join(OUTPUT_DIR, `${p.slug}.avif`);
    const destPath = path.join(OUTPUT_DIR, `${p.slug}.webp`);
    console.log(`⬇  Downloading AVIF: ${p.slug}...`);
    try {
      await downloadToFile(p.url, tmpPath);
      // Try converting with sharp
      await sharp(tmpPath, { failOn: "none" }).webp({ quality: 90 }).toFile(destPath);
      fs.unlinkSync(tmpPath);
      console.log(`✅ Converted AVIF: ${p.slug}.webp`);
    } catch(e) {
      console.error(`❌ AVIF convert failed for ${p.slug}: ${e.message}`);
      // Fallback: keep the avif as-is and rename slug to avif
      if (fs.existsSync(tmpPath)) {
        const fallback = path.join(OUTPUT_DIR, `${p.slug}-fallback.avif`);
        fs.renameSync(tmpPath, fallback);
        console.log(`  Kept as fallback: ${p.slug}-fallback.avif`);
      }
    }
  }
  console.log("\nFix done!");
}

main();
