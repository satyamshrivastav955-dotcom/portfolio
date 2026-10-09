import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const slugs = ['argus', 'callshield', 'graphql-sentinel', 'hybrid-ai-nids', 'nexus-1', 'face-blockchain', 'taskorbit', 'student-intelligence'];
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()}: ${response.url()}`); });
let failures = 0;
for (const slug of slugs) {
  await page.goto(`http://127.0.0.1:3000/projects/${slug}/`, { waitUntil: 'networkidle' });
  await page.locator('footer').scrollIntoViewIfNeeded();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  const invalidAnchors = await page.locator('a[href^="#"]').evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')).filter((href) => href !== '#' && !document.getElementById(href.slice(1))));
  const violations = result.violations.map((violation) => ({ rule: violation.id, nodes: violation.nodes.map((node) => node.target) }));
  failures += violations.length + invalidAnchors.length;
  console.log(JSON.stringify({ slug, violations, invalidAnchors }));
}
await browser.close();
console.log(JSON.stringify({ errors, failures }));
if (failures || errors.length) process.exitCode = 1;
