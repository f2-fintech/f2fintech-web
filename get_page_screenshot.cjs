const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log("Page loaded successfully.");
  } catch (e) {
    console.error("Navigation encountered an issue, but we will proceed:", e.message);
  }

  try {
    // Wait for map heading text to appear in DOM, meaning Home has finished rendering
    console.log("Waiting for map section to render...");
    await page.waitForSelector('text=National Loan Disbursement Presence', { timeout: 20000 });
    console.log("Map section rendered successfully!");
    
    // Force scroll down
    await page.evaluate(() => window.scrollTo(0, 2500));
    await page.waitForTimeout(2000); // Wait for scroll animation to settle
    
    const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\c79f6da7-5ef0-418f-acea-cef2dec4a9b5";
    await page.screenshot({ path: path.join(artifactDir, 'page_map_screenshot.png') });
    console.log("Screenshot saved to page_map_screenshot.png");
  } catch (e) {
    console.error("Error waiting or capturing screenshot:", e.message || e);
    // Take a screenshot of whatever is there right now
    const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\c79f6da7-5ef0-418f-acea-cef2dec4a9b5";
    await page.screenshot({ path: path.join(artifactDir, 'page_map_error_screenshot.png') });
    console.log("Error screenshot saved.");
  } finally {
    await browser.close();
  }
})();
