# Verification record

> Historical V1 results. See [V2 release notes](v2-release.md) for the current revision's checks and scope.

This document records checks performed on the portfolio itself. It does not certify or re-run the eight underlying project implementations.

## Environment

- Linux / WSL with the source on a Windows-mounted filesystem.
- Node.js 24.21.0; npm 11.19.0.
- Next.js 16.4.0 static export with webpack.
- Playwright Chromium 156; desktop and Pixel 7-style mobile emulation.
- Software WebGL rendering (SwiftShader), not a physical mobile GPU.
- Production output served locally on port 3000.

## Completed verification

- **`npm run build` — passed.** Production static generation produced all eight project routes, homepage, not-found page, robots.txt, and sitemap.xml.
- **`npm run typecheck` — passed.**
- **`npm run lint` — passed.**
- **Development command smoke check — passed.** `npm run dev` started successfully; the homepage returned HTTP 200 and rendered its heading with zero captured browser errors. The development server was left on port 3000 for handoff.
- **`npm test` — 34 passed** across desktop and mobile on the final implementation (2.7 minutes). Assertions and timeout thresholds were retained. One earlier multi-navigation test timed out while other browser audit/screenshot jobs were competing for resources; the complete isolated rerun passed.
- **All eight case-study accessibility/anchor audits — passed.** `scripts/audit-pages.mjs` reported zero WCAG 2 / 2.1 A/AA violations, zero invalid local anchors, zero failed HTTP responses, and zero browser errors across those routes.
- Desktop and mobile rendered screenshots were inspected, including the entire homepage and a complete GraphQL case study.
- Screenshots revealed a transparent-wireframe depth artifact and hero composition issues; these were refined.
- Accessibility checks found insufficient contrast in the light section; colors were corrected.
- Browser checks exercised real clipboard success/failure, keyboard dialogs, direct-route reloads, review/revision transitions, video decoding/playback, image failures, WebGL failure, and JavaScript-disabled content/navigation.

## Performance work

An initial mobile Lighthouse run exposed excessive WebGL compilation work. Responsive rendering was changed so touch/mobile and OS reduced-motion views use lightweight renders of the same original artwork, while wide fine-pointer screens retain interactive Three.js.

Final post-optimization Lighthouse runs measured:

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 85 | 98 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 1.1 s | 0.3 s |
| Largest Contentful Paint | 3.0 s | 0.6 s |
| Total Blocking Time | 350 ms | 20 ms |
| Cumulative Layout Shift | 0.033 | 0.012 |
| Speed Index | 3.4 s | 1.4 s |

The final refinement prioritizes the hero poster, keeps initial typography independent of GSAP loading, and schedules optional scroll animation initialization during idle time. Offscreen copy stays at full opacity. Visible control labels and accessible names were reconciled.

These are local Lighthouse lab measurements under its emulated input/device conditions, not field Core Web Vitals or production guarantees. The responsive WebGL branch was additionally verified in Playwright; these scores are not a physical-GPU frame-rate benchmark. Actual hosting, compression, caching, device, browser, and network affect results.

Raw session artifacts are in `/tmp/omnirush/`: `portfolio-lighthouse-mobile-final.json`, `portfolio-lighthouse-desktop-webgl.json`, and `portfolio-*.png` review captures. They are temporary, environment-local artifacts; this document preserves their important results.

## Remaining scope

- Production-domain canonical URLs, absolute Open Graph image URLs, and sitemap entries require `profile.siteUrl`.
- Email, résumé, additional social links, background entries, and CallShield personal contributions require user-supplied facts.
- Safari, Firefox, and physical-device interaction/performance were not tested in this environment.
- Automated accessibility checks supplement rather than replace a full screen-reader/user audit.
- Underlying project benchmarks, tests, protective interventions, and deployment claims were not independently revalidated.
- Hosting-provider deep links and share previews need verification after deployment.
