# V2 — Architectural direction

This revision implements the professional visual direction requested after the V2 plan: fine white box-grid lines fading downward, restrained colors, a more structural centerpiece, and a composed editorial presentation.

## Implemented

- **Layered drafting background:** a fine white square grid, larger construction lines, nested rectangular frames, registration marks, and a downward fade. A lightweight fixed grid connects the rest of the dark sections.
- **Professional palette:** warm charcoal, off-white, stone, and muted sage/steel details. The selected-work chapter uses warm drafting paper; the philosophy chapter uses a quiet mineral-paper surface.
- **New visual identity:** an angular, bracketed S monogram, coordinated favicon, and revised share image.
- **Original system assembly:** four beveled, machined-metal frames, internal boards, a central block, etched details, and dashed alignment guides. The assembly responds to the pointer and separates subtly during scrolling.
- **Form / Signal / Layers:** explicit controls switch between the assembled object, its structural line view, and a separated four-layer view. A text legend identifies Input, Reasoning, Action, and Verification as a conceptual engineering model.
- **Responsive artwork:** desktop WebGL and locally rendered posters share the same design. Mobile and reduced-motion views support all three modes without requiring WebGL.
- **Project portals:** native View Transitions carry matching project imagery and titles into case studies on supported browsers. Normal links, keyboard activation, browser history, reduced-motion navigation, and a bounded slow-route fallback remain available.
- **Stronger case-study openings:** a compact focus/design-choice/evidence-context summary appears before the detailed story. NEXUS-1 leads with its genuine repository simulation recording, with playback controls and a source link.
- **Readable detail:** larger mobile annotations and case-study copy, higher-contrast muted colors, and a tighter mobile hero composition.
- **Development reliability:** webpack polling for Windows-mounted WSL workspaces and explicit localhost development origins address stale reloads and blocked HMR. A duplicate SVG React key was corrected.

## V1 preservation

The pre-revision source and static output are preserved in `snapshots/`:

- `v1-source.tar.gz` — SHA-256 `dd87960f1d1a7f73571acd7bfc707294d12403c66d53159d5f13de6667081a6a`
- `v1-production.tar.gz` — SHA-256 `0a028810cb6fdca3ec7d632596fce502dd18c9b36d2dd0db349f71904a1b85d4`

Both archives passed `gzip -t`. Their baseline is Git commit `ba9d502`; the source snapshot includes the pre-existing working-copy README.

A local comparison preview was prepared from the V1 production archive at `http://localhost:3001`. The active V2 production preview uses `http://localhost:3000`. Both preview homepages and direct project routes were checked successfully. These are local preview services, not public deployments.

To rebuild and preview V2, run `npm run build` followed by `npm run start`. For source development with live reload, use `npm run dev` instead of the production server. Both commands use port 3000, so stop the existing preview first.

## Main files

| File | Responsibility |
| --- | --- |
| `src/app/globals.css` | Shared neutral tokens and existing component styling |
| `src/app/architectural.css` | Drafting-paper sections, new assembly layout, responsive refinements, transition styling |
| `src/components/drafting-grid.tsx` | Layered white-grid and fading frame artwork |
| `src/components/signal-core.tsx` | Procedural assembly and complete Three.js lifecycle |
| `src/content/artifact.ts` | Mode labels, explanations, and conceptual layer names |
| `src/components/page-transitions.tsx` | Native transition / App Router coordination |
| `src/components/transition-link.tsx` | Progressive project-link enhancement |
| `src/components/case-hero.tsx` | Case-study opening, genuine recording, and summary |
| `scripts/render-core-posters.mjs` | Reproduce all three static fallback renders from the actual scene |

## Verification

- Production build: passed, generating the homepage, eight case-study routes, not-found page, robots.txt, and sitemap.xml.
- ESLint and TypeScript: passed.
- Desktop/mobile Playwright suite: **38 passed in 2.0 minutes** in the final complete run, including native-transition navigation, history, layer controls, mobile artwork/text separation, reduced motion, WebGL fallback, media playback, clipboard feedback, and 320–1920px overflow checks.
- Separate audits of all eight case studies: zero detected WCAG 2 / 2.1 A/AA violations, zero invalid local anchors, zero captured browser errors or failed HTTP responses.
- Desktop/mobile pages were rendered and inspected. The refinement pass corrected artwork/text separation, mobile grid-item sizing, and the poster-to-WebGL handoff.
- Visual-review capture completed with zero captured browser errors.

Project benchmark, deployment, collaboration, and simulation boundaries remain as documented in the supplied catalog.

## V2 performance measurements

Measured on October 9, 2026, with Lighthouse 13.5.0 against the local production export. Mobile uses Lighthouse's default mobile configuration; desktop uses its desktop configuration. Chromium ran in Linux/WSL with SwiftShader enabled, separately from the functional test suite.

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | **89** | **98** |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 1.1 s | 0.3 s |
| Largest Contentful Paint | 2.8 s | 0.6 s |
| Total Blocking Time | 280 ms | 20 ms |
| Cumulative Layout Shift | 0.038 | 0.012 |
| Speed Index | 3.7 s | 1.6 s |

Neither audit reported run warnings. These are local lab measurements, not production field data or physical-GPU frame-rate measurements. Safari, Firefox, physical-device behavior, and a full screen-reader audit remain unverified.

The JSON and HTML reports are temporary session artifacts at `/tmp/omnirush/portfolio-v2-lighthouse-mobile.{json,html}` and `/tmp/omnirush/portfolio-v2-lighthouse-desktop.{json,html}`. The earlier scores in `docs/verification.md` remain the historical V1 record.

## Remaining V2-plan work

`docs/v2-plan.md` remains the broader roadmap. Recorded ARGUS event synchronization, trace-synchronized NEXUS coordinates, an editable GraphQL AST playground, expanded X-ray module selection, and selective particle/shader experiments are future work. This revision implements the architectural visual direction and the interactions listed above; it does not present those future experiments as complete.

The outstanding personal data and contribution/evidence inputs remain listed in `docs/content-checklist.md`.
