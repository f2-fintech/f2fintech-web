const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
    console.log("Page loaded successfully.");
    
    // Scroll down to the map section
    const mapSection = page.locator('text=OUR FOOTPRINT');
    await mapSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000); // Wait for transitions/animations to finish
    
    const artifactDir = "C:\\Users\\lenovo\\.gemini\\antigravity-ide\\brain\\c79f6da7-5ef0-418f-acea-cef2dec4a9b5";
    await page.screenshot({ path: path.join(artifactDir, 'page_map_screenshot.png') });
    console.log("Screenshot saved to page_map_screenshot.png");
  } catch (e) {
    console.error("Error during page execution:", e);
  } finally {
    await browser.close();
  }
})();
