import fs from 'node:fs/promises';
import sharp from 'sharp';
import { chromium } from '@playwright/test';

await fs.mkdir('snapshots/editorial-review', { recursive: true });
await fs.mkdir('public/editorial', { recursive: true });
for (const [name, id] of [['architecture', 'photo-1511818966892-d7d671e672a2'], ['concrete', 'photo-1487958449943-2429e8be8625']]) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=85`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  await sharp(Buffer.from(await response.arrayBuffer())).grayscale().normalise().webp({ quality: 83 }).toFile(`public/editorial/${name}.webp`);
  console.log(`Saved ${name} from ${url}`);
}
const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'snapshots/editorial-review/before-home.png' });
await browser.close();
