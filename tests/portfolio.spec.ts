import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const slugs = ['argus', 'callshield', 'graphql-sentinel', 'hybrid-ai-nids', 'nexus-1', 'face-blockchain', 'taskorbit', 'student-intelligence'];

test('homepage is complete, error-free, and exposes all eight projects', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ENGINEERINGTHE UNSEEN.');
  for (const slug of slugs) await expect(page.locator(`#work a[href="/projects/${slug}/"]`).first()).toBeAttached();
  await expect(page.locator('#about')).toBeAttached();
  await expect(page.locator('#capabilities')).toBeAttached();
  await expect(page.locator('#contact')).toBeAttached();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  expect(errors).toEqual([]);
});

test('project filtering preserves the selected category and restores the index', async ({ page }) => {
  await page.goto('/#work');
  await page.getByRole('button', { name: 'Security systems' }).click();
  await expect(page.locator('#work [role="status"]')).toContainText('Showing 3 projects');
  await expect(page.locator('#work a[href="/projects/argus/"]')).toHaveCount(0);
  await expect(page.locator('#work a[href="/projects/callshield/"]').first()).toBeVisible();
  await page.getByRole('button', { name: 'All systems' }).click();
  await expect(page.locator('#work [role="status"]')).toContainText('Showing 8 projects');
});

test('command palette supports search, keyboard navigation, close, and route changes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open command palette' }).click();
  const input = page.getByRole('combobox', { name: 'Search portfolio' });
  await expect(input).toBeFocused();
  await input.fill('zz-no-project');
  await expect(page.getByText('No matches.')).toBeVisible();
  await input.fill('NEXUS');
  await input.press('ArrowDown');
  await input.press('Enter');
  await expect(page).toHaveURL(/\/projects\/nexus-1\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('NEXUS-1');
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('capabilities expand and link to real case studies', async ({ page }) => {
  await page.goto('/#capabilities');
  const button = page.getByRole('button', { name: 'Security & trust' });
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#capability-security')).toBeVisible();
  await page.locator('#capability-security').getByRole('link', { name: 'GraphQL-Sentinel' }).click();
  await expect(page).toHaveURL(/graphql-sentinel/);
});

test('all case studies support direct loading, architecture inspection, and refresh', async ({ page }) => {
  for (const slug of slugs) {
    const response = await page.goto(`/projects/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    const lastNode = page.locator('.architecture-nodes button').last();
    await lastNode.click();
    await expect(lastNode).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#architecture-detail')).not.toBeEmpty();
    await expect(page.locator('#evidence')).toBeAttached();
    expect(await page.locator('title').textContent()).toContain('Satyam Shrivastav');
  }
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Student Intelligence');
});

test('query illustration explains both policy outcomes', async ({ page }) => {
  await page.goto('/projects/graphql-sentinel/');
  await page.getByRole('button', { name: 'Deeply nested operation' }).click();
  await expect(page.locator('.query-output')).toContainText('Exceeds the example depth policy');
  await expect(page.locator('.over-limit')).toHaveCount(2);
  await page.getByRole('button', { name: 'Shallow operation' }).click();
  await expect(page.locator('.query-output')).toContainText('Within the example depth policy');
});

test('workflow example supports revision, approval, and reset', async ({ page }) => {
  await page.goto('/projects/taskorbit/');
  for (let step = 0; step < 3; step++) await page.getByRole('button', { name: 'Advance example' }).click();
  await page.getByRole('button', { name: 'Request revision' }).click();
  await expect(page.locator('.workflow-status')).toContainText('VERSION 2');
  await expect(page.locator('.workflow-status')).toContainText('In progress');
  await page.getByRole('button', { name: 'Advance example' }).click();
  await page.getByRole('button', { name: 'Approve submission' }).click();
  await expect(page.locator('.workflow-status')).toContainText('Delivered');
  await page.getByRole('button', { name: 'Reset example' }).click();
  await expect(page.locator('.workflow-status')).toContainText('Brief');
  await expect(page.locator('.workflow-status')).toContainText('VERSION 1');
});

test('contact copy reports success and a clipboard failure truthfully', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Copy GitHub profile URL' }).click();
  await expect(page.locator('.copy-feedback')).toHaveText('Copied to clipboard.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('satyamshrivastav955-dotcom');
  await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { value: () => Promise.reject(new Error('Unavailable')), configurable: true }); });
  await page.getByRole('button', { name: 'Copy GitHub profile URL' }).click();
  await expect(page.locator('.copy-feedback')).toContainText('Copy unavailable.');
});

test('page layouts do not overflow at mobile, tablet, laptop, or wide widths', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/projects/graphql-sentinel/']) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }));
      expect(dimensions.scroll, `${route} at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    }
  }
});

test('home and interactive case study pass automated accessibility checks', async ({ page }) => {
  for (const route of ['/', '/projects/graphql-sentinel/']) {
    await page.goto(route);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
  }
  await page.getByRole('button', { name: 'Open command palette' }).click();
  const dialogResult = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  expect(dialogResult.violations).toEqual([]);
});

test('navigation supports mobile menu and browser back', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation menu' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Selected work' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  } else await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Selected work' }).click();
  await page.locator('.project-art-link').first().click();
  await expect(page).toHaveURL(/argus/);
  await page.goBack();
  await expect(page.locator('#work-title')).toBeVisible();
});

test('normal-motion mode uses responsive artwork, switches appearance, and pauses', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  if (isMobile) {
    await expect(page.locator('.core-poster')).toBeVisible();
    await expect(page.locator('.signal-core canvas')).toHaveCount(0);
  } else await expect(page.locator('.signal-core.is-ready canvas')).toBeVisible({ timeout: 25_000 });
  await page.getByRole('button', { name: '02 / SIGNAL' }).click();
  await expect(page.getByRole('button', { name: '02 / SIGNAL' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Pause animations' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Enable animations' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
});

test('WebGL failure retains the static artwork and usable page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).includes('webgl')) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto('/');
  await expect(page.locator('.core-poster')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Open command palette' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('unknown paths return the designed not-found page', async ({ page }) => {
  await page.goto('/does-not-exist/');
  await expect(page.getByRole('heading', { name: 'OFF THE KNOWN PATH.' })).toBeVisible();
  await page.getByRole('link', { name: 'Back to the work' }).click();
  await expect(page.locator('#work-title')).toBeVisible();
});

test('repository media is local and the NEXUS recording plays on demand', async ({ page }) => {
  await page.goto('/projects/nexus-1/');
  const video = page.locator('video');
  await video.scrollIntoViewIfNeeded();
  expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  await video.evaluate((element: HTMLVideoElement) => element.play());
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0.2);
  expect(await video.evaluate((element: HTMLVideoElement) => element.duration)).toBeGreaterThan(9);
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
});

test('a missing evidence image provides a visible fallback', async ({ page }) => {
  await page.route('**/projects/callshield-insight.webp', (route) => route.abort());
  await page.goto('/projects/callshield/');
  await page.locator('#visual-evidence').scrollIntoViewIfNeeded();
  await expect(page.getByText('This asset could not be loaded.')).toBeVisible();
});

test('static content and project navigation remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/');
  await expect(page.locator('h1')).toBeVisible();
  await page.locator('.project-art-link').first().click();
  await expect(page).toHaveURL(/argus/);
  await expect(page.locator('#overview')).toContainText('ARGUS');
  await context.close();
});

test('assembly layers have meaningful, keyboard-accessible controls', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    const poster = await page.locator('.core-poster img').boundingBox();
    const title = await page.locator('.hero-title-wrap').boundingBox();
    expect(poster && title && poster.y + poster.height <= title.y).toBe(true);
  }
  const layers = page.getByRole('button', { name: '03 / LAYERS' });
  await layers.focus();
  await layers.press('Enter');
  await expect(layers).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.artifact-description')).toContainText('verification');
  await expect(page.locator('.artifact-layer-legend li')).toHaveCount(4);
  await expect(page.locator('.core-poster img')).toHaveAttribute('src', '/core-layers.webp');
  await page.getByRole('button', { name: '01 / FORM' }).click();
  await expect(page.locator('.artifact-layer-legend')).toHaveCount(0);
});

test('project portal navigation works with full motion and browser history', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#work');
  await page.locator('.project-art-link').first().click();
  await expect(page).toHaveURL(/\/projects\/argus\/$/);
  await expect(page.locator('h1')).toHaveText('ARGUS.');
  await page.goBack();
  await expect(page.locator('#work-title')).toBeVisible();
  expect(errors).toEqual([]);
});
