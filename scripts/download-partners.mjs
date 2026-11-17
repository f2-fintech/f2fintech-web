import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/partners");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const partners = [
  { title: "Bajaj Finance",       url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/bajajFinance2.png",         slug: "bajaj-finance" },
  { title: "Bajaj Market",        url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/bajajMarket.png",            slug: "bajaj-market" },
  { title: "Chola",               url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/chola.png",                  slug: "chola" },
  { title: "L&T",                 url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/LNT.avif",                   slug: "lnt" },
  { title: "Tata",                url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/Tata2.jpg",                  slug: "tata" },
  { title: "ABFL",                url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/ABFL.png",                   slug: "abfl" },
  { title: "Godrej",              url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/godrej.webp",                slug: "godrej" },
  { title: "IDFC",                url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/IDFC.png",                   slug: "idfc" },
  { title: "HDFC Bank",           url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/HDFC.png",                   slug: "hdfc" },
  { title: "ICICI",               url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/ICICI%20Bank%202.avif",      slug: "icici" },
  { title: "INDUSIND",            url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/INDUSIND.jpg",               slug: "indusind" },
  { title: "Lending Cart",        url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/Lendingkart.webp",           slug: "lendingkart" },
  { title: "Incred",              url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/Incred.avif",                slug: "incred" },
  { title: "Credit Saison",       url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/creditSaison.png",          slug: "credit-saison" },
  { title: "Paysense",            url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/paysense.jpg",              slug: "paysense" },
  { title: "Shriram",             url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/Sriram.jpg",                slug: "shriram" },
  { title: "HSBC Bank",           url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/HSBC.png",                  slug: "hsbc" },
  { title: "Standard Chartered",  url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/standard%20chartered.jfif", slug: "standard-chartered" },
  { title: "YES Bank",            url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/yes_bank.avif",             slug: "yes-bank" },
  { title: "AXIS Bank",           url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/yesBank.png",               slug: "axis" },
  { title: "Kotak Bank",          url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/kotak.png",                 slug: "kotak" },
  { title: "Deutsche Bank",       url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/Deutsche-Bank.jpg",         slug: "deutsche" },
  { title: "SBI",                 url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/sbi.webp",                  slug: "sbi" },
  { title: "PNB",                 url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/pnb.jpg",                   slug: "pnb" },
  { title: "Poonawala",           url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/poonawala.webp",            slug: "poonawala" },
  { title: "SMFG",                url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/SMFG.png",                  slug: "smfg" },
  { title: "Canara Bank",         url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/canara_bank.jpg",           slug: "canara" },
  { title: "Bank of Baroda",      url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/bob.png",                   slug: "bob" },
  { title: "BOI",                 url: "https://f2fintechcustomerdocs.s3.eu-north-1.amazonaws.com/loan-provider/BOI.png",                   slug: "boi" },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const ext = path.extname(new URL(url).pathname).split("?")[0] || ".jpg";
    const tmpFile = dest + ext;
    const file = fs.createWriteStream(tmpFile);
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(tmpFile);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(tmpFile); });
    }).on("error", (e) => { fs.unlinkSync(tmpFile); reject(e); });
  });
}

async function main() {
  // Dynamically import sharp
  const { default: sharp } = await import("sharp");

  for (const p of partners) {
    const webpPath = path.join(OUTPUT_DIR, `${p.slug}.webp`);
    if (fs.existsSync(webpPath)) {
      console.log(`✓ Already exists: ${p.slug}.webp`);
      continue;
    }
    try {
      console.log(`⬇  Downloading ${p.title}...`);
      const tmpFile = await download(p.url, path.join(OUTPUT_DIR, p.slug));
      await sharp(tmpFile).webp({ quality: 90 }).toFile(webpPath);
      fs.unlinkSync(tmpFile);
      console.log(`✅ Saved: ${p.slug}.webp`);
    } catch (e) {
      console.error(`❌ Failed ${p.title}: ${e.message}`);
    }
  }
  console.log("\nDone! All partner logos processed.");
}

main();
