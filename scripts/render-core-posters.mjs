import { chromium } from '@playwright/test';
import sharp from 'sharp';

// Render the actual procedural artifact for the mobile / reduced-motion fallback.
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(process.env.REVIEW_URL ?? 'http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
await page.locator('.signal-core.is-ready').waitFor();
await page.getByRole('button', { name: 'Pause animations' }).click();
await page.addStyleTag({ content: `body { background: transparent !important; } body::before, body::after, .hero::before, .hero-grid, .site-header, .hero-coordinate, .hero-orbit-label, .hero-title-wrap, .hero-bottom, .hero-floor, .artifact-description { visibility: hidden !important; } .hero-visual { position: fixed !important; inset: 0 !important; width: 800px !important; height: 800px !important; opacity: 1 !important; } .core-fallback { display: none; }` });
for (const [index, mode] of ['form', 'signal', 'layers'].entries()) {
  await page.locator('.scene-controls button').nth(index).evaluate((element) => element.click());
  await page.waitForTimeout(250);
  const buffer = await page.locator('.signal-core canvas').screenshot({ omitBackground: true });
  const info = await sharp(buffer).trim().resize({ width: 760, height: 760, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 87 }).toFile(new URL(`../public/core-${mode}.webp`, import.meta.url).pathname);
  console.log(mode, info);
}
await browser.close();
