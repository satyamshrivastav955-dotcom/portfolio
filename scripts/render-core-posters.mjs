import { chromium } from '@playwright/test';
import sharp from 'sharp';

// Render the actual procedural artifact for the mobile / reduced-motion fallback.
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 1000 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
await page.locator('.signal-core.is-ready').waitFor();
await page.getByRole('button', { name: 'Pause animations' }).click();
await page.addStyleTag({ content: `body { background: transparent !important; } body::after, .hero::before, .hero-grid, .site-header, .hero-coordinate, .hero-orbit-label, .hero-title-wrap, .hero-bottom, .hero-floor { visibility: hidden !important; } .hero-visual { position: fixed !important; inset: 0 !important; width: 800px !important; height: 800px !important; opacity: 1 !important; } .core-fallback { display: none; }` });
for (const mode of ['form', 'signal']) {
  if (mode === 'signal') await page.locator('.scene-controls button').nth(1).evaluate((element) => element.click());
  await page.waitForTimeout(250);
  const buffer = await page.locator('.signal-core canvas').screenshot({ omitBackground: true });
  const info = await sharp(buffer).trim().resize({ width: 760 }).webp({ quality: 87 }).toFile(new URL(`../public/core-${mode}.webp`, import.meta.url).pathname);
  console.log(mode, info);
}
await browser.close();
