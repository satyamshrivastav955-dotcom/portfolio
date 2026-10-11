import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import sharp from 'sharp';

const output = 'snapshots/editorial-review';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
const errors = [], failures = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.screenshot({ path: `${output}/home-desktop.png` });
const heroDistance = await page.locator('.opening-scene').evaluate(element => element.clientHeight - innerHeight);
for (const [name, progress] of [['hero-middle', .5], ['hero-end', 1]]) {
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), heroDistance * progress);
  await page.waitForTimeout(650);
  await page.screenshot({ path: `${output}/${name}.png` });
}
for (const id of ['work', 'about', 'capabilities', 'journey', 'contact']) {
  await page.locator(`#${id}`).evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - 80, behavior: 'instant' }));
  await page.waitForTimeout(750);
  await page.screenshot({ path: `${output}/${id}-desktop.png` });
}
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
// Exercise native scroll at reading pace in both directions, including the sticky boundaries.
const bottom = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
for (let y = 0; y <= bottom; y += 360) { await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(100); }
for (let y = bottom; y >= 0; y -= 500) { await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y); await page.waitForTimeout(100); }
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await page.waitForTimeout(700);
await page.screenshot({ path: `${output}/home-reversed.png` });
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.waitForTimeout(200);
await page.screenshot({ path: `${output}/home-full.png`, fullPage: true });
await sharp(`${output}/home-full.png`).resize({width:480}).toFile(`${output}/home-overview.png`);
await page.setViewportSize({ width: 390, height: 844 });
await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.goto('http://127.0.0.1:3000/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.screenshot({ path: `${output}/home-mobile.png` });
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.screenshot({ path: `${output}/mobile-full.png`, fullPage: true });
await sharp(`${output}/mobile-full.png`).resize({width:260}).toFile(`${output}/mobile-overview.png`);
const routes = ['argus','callshield','graphql-sentinel','hybrid-ai-nids','nexus-1','face-blockchain','taskorbit','student-intelligence'];
const routeResults = [];
for (const slug of routes) {
  await page.setViewportSize({width:1440,height:960});
  const response = await page.goto(`http://127.0.0.1:3000/projects/${slug}/`, {waitUntil:'networkidle'});
  await page.screenshot({path:`${output}/${slug}-opening.png`});
  await page.locator('#architecture').evaluate(element => window.scrollTo({top:element.getBoundingClientRect().top+scrollY-100,behavior:'instant'}));
  await page.screenshot({path:`${output}/${slug}-architecture.png`});
  routeResults.push({slug,status:response.status(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
}
await page.goto('http://127.0.0.1:3000/projects/argus/', {waitUntil:'networkidle'});
await page.emulateMedia({reducedMotion:'no-preference'});
await page.waitForTimeout(500);
for (const stage of [0,2,4,1]) {
  await page.locator('.story-step').nth(stage).evaluate(element => window.scrollTo({top:element.getBoundingClientRect().top+scrollY-innerHeight*.45,behavior:'instant'}));
  await page.waitForTimeout(650);
  await page.screenshot({path:`${output}/argus-stage-${stage}.png`});
}
await fs.writeFile(`${output}/review.json`, JSON.stringify({errors,failures,routeResults},null,2));
console.log(JSON.stringify({errors,failures,routeResults},null,2));
await browser.close();
