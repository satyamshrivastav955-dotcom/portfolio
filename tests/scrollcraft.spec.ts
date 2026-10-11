import { test, expect } from '@playwright/test';

test('hero depth follows scroll, reverses, and removes the long scene when paused', async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  if (isMobile) {
    expect(await page.locator('.opening-stage').evaluate(element => getComputedStyle(element).position)).not.toBe('sticky');
    return;
  }
  await page.waitForTimeout(600);
  const initial = await page.locator('.opening-background').evaluate(element => getComputedStyle(element).transform);
  const distance = await page.locator('.opening-scene').evaluate(element => element.clientHeight - innerHeight);
  await page.evaluate(distance => scrollTo({ top: distance * .7, behavior: 'instant' }), distance);
  await page.waitForTimeout(750);
  const moved = await page.locator('.opening-background').evaluate(element => getComputedStyle(element).transform);
  expect(moved).not.toEqual(initial);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(750);
  await expect.poll(() => page.locator('.opening-background').evaluate(element => getComputedStyle(element).transform)).toBe(initial);
  await page.getByRole('button', { name: 'Pause animations' }).click();
  expect(await page.locator('.opening-stage').evaluate(element => getComputedStyle(element).position)).not.toBe('sticky');
  await expect(page.getByRole('link', {name:'EXPLORE WORK',exact:true})).toBeVisible();
});

test('architecture follows both scroll directions and manual inspection takes priority', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Mobile uses compact manually inspectable architecture.');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/projects/argus/');
  for (const stage of [0,2,4,1]) {
    await page.locator('.story-step').nth(stage).evaluate(element => scrollTo({ top: element.getBoundingClientRect().top + scrollY - innerHeight * .45, behavior:'instant' }));
    await expect(page.locator('.system-story')).toHaveAttribute('data-active', String(stage));
  }
  await page.locator('.architecture-nodes button').last().click();
  await expect(page.locator('.system-story')).toHaveAttribute('data-active','4');
  await page.getByRole('button', {name:'RESUME SCROLL STORY'}).click();
  await page.locator('.story-step').first().evaluate(element => scrollTo({top:element.getBoundingClientRect().top+scrollY-innerHeight*.45,behavior:'instant'}));
  await expect(page.locator('.system-story')).toHaveAttribute('data-active','0');
});

test('CallShield conditionally routes selected signals without inventing a risk result', async ({ page }) => {
  await page.goto('/projects/callshield/');
  const options = page.getByRole('group',{name:'Available communication signals'});
  await options.getByRole('button',{name:'Audio',exact:false}).click();
  await options.getByRole('button',{name:'Language',exact:false}).click();
  await expect(page.locator('.signal-paths')).toContainText('No signals selected.');
  await options.getByRole('button',{name:'Video',exact:false}).click();
  await expect(page.locator('.signal-path')).toHaveCount(1);
  await expect(page.locator('.signal-destination')).toContainText('1 selected paths');
});

test('local hashing is deterministic and clearly marks stale digests', async ({ page }) => {
  await page.goto('/projects/face-blockchain/');
  await page.getByLabel('Example evidence note').fill('abc');
  await page.getByRole('button',{name:'Calculate SHA-256'}).click();
  await expect(page.locator('.digest-result code')).toHaveText('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  await page.getByLabel('Example evidence note').fill('abcd');
  await expect(page.locator('.digest-result')).toContainText('NOTE CHANGED');
  await page.getByRole('button',{name:'Calculate SHA-256'}).click();
  await expect(page.locator('.digest-result code')).not.toHaveText('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});

test('student scenarios remain hypothetical and do not fabricate predictions', async ({ page }) => {
  await page.goto('/projects/student-intelligence/');
  await page.getByRole('button',{name:'Absences',exact:true}).click();
  await expect(page.locator('.explanation-comparison')).toContainText('More recorded absences');
  await page.getByRole('button',{name:'Explore a support scenario'}).click();
  await expect(page.locator('.explanation-comparison')).toContainText('Additional attendance support');
  await expect(page.locator('.explanation-comparison')).toContainText('UNDETERMINED');
});

test('recorded phase inspection responds to keyboard selection', async ({ page }) => {
  await page.goto('/projects/nexus-1/');
  const release = page.getByRole('group',{name:'Simulation execution phase'}).getByRole('button',{name:'RELEASE',exact:true});
  await release.focus(); await release.press('Enter');
  await expect(release).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('.phase-crop img')).toHaveAttribute('alt', /release/i);
});

test('failed hero photography preserves identity and navigation', async ({ page }) => {
  await page.route('**/editorial/*.webp', route => route.abort());
  await page.goto('/');
  await expect(page.locator('.opening-background')).toHaveClass(/photo-unavailable/);
  await expect(page.locator('h1')).toHaveAccessibleName('Satyam Shrivastav');
  await page.getByRole('link',{name:'EXPLORE WORK',exact:true}).click();
  await expect(page.locator('#work-title')).toBeVisible();
});

test('failed simulation playback offers the real source recording', async ({ page }) => {
  await page.route('**/projects/nexus-execution.webm',route=>route.abort());
  await page.goto('/projects/nexus-1/');
  await page.locator('video').evaluate((video: HTMLVideoElement)=> { video.load(); void video.play().catch(()=>{}); });
  await expect(page.locator('.video-fallback')).toContainText('could not be loaded');
  await expect(page.locator('.video-fallback a')).toHaveAttribute('href', /outputs\/demo.gif/);
});
