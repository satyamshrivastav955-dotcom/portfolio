# Satyam Shrivastav — Engineering the Unseen

A complete, statically generated portfolio built around eight supplied engineering projects. The architectural V2 identity combines oversized editorial typography, fine white construction grids, a procedural metal assembly, warm-paper sections, and detailed, evidence-aware case studies.

See **[V2 release notes](docs/v2-release.md)** for the current revision and verification. V1 source and production archives are preserved in **[snapshots/](snapshots/README.md)**.

## Run locally

Use Node.js 20.9+ (Node 24 was used during implementation) and npm.

```bash
npm ci
npm run dev
```

Open **http://localhost:3000**.

Production preview:

```bash
npm run build
npm run start
```

The build creates `out/`, including real HTML for every project route. No backend, database, API key, or environment variable is required.

### This workspace’s development environment

The Windows-mounted filesystem made the initial package extraction unusually slow. The working `node_modules` is linked to `/tmp/omnirush/portfolio-runtime/node_modules` on Linux for this session. The application and lockfile are in the project directory. If that temporary directory is cleared, run `npm ci` to recreate the dependencies normally. This link is local tooling, not part of the deployed site.

## What’s included

- **Original assembly artwork:** four machined-metal Three.js frames with inner boards, a central core, alignment guides, pointer response, and scroll-linked separation.
- **Responsive rendering:** wide, fine-pointer screens receive interactive WebGL. Touch/mobile and reduced-motion screens receive lightweight renders of the same original scene. Form / Signal / Layers controls work in both modes.
- **Motion architecture:** immediate CSS typography choreography; lazily loaded GSAP/ScrollTrigger for editorial movement, text illumination, and diagram rotation; pointer-responsive project lighting and tilt.
- **Complete project index:** category filters, three large showcases, and five compact editorial entries. Filters expose all eight projects.
- **Eight shareable case studies:** an opening focus/decision/evidence summary, overview, architecture explorer, engineering decisions, capabilities, evidence, limitations, source links, optional real media, and next-project navigation.
- **Meaningful local interactions:** GraphQL depth-policy illustration and TaskOrbit review/revision lifecycle. Both are explicitly labeled illustrations.
- **Repository media:** five reviewed project-media sets, including a user-controlled NEXUS simulation video. Each media record links to its original repository source.
- **Navigation:** desktop active-section links, native-dialog mobile menu, Ctrl/Cmd+K searchable command palette, shared-element project transitions on supported browsers, browser history, and direct-load routes.
- **Contact:** configured GitHub links and clipboard feedback, with email and résumé support activated by configuration.
- **Accessibility:** semantic sections, keyboard navigation, focus states, dialog focus containment, skip link, global animation pause, reduced-motion support, and readable content without JavaScript.
- **SEO:** per-project metadata, favicon, social image, robots.txt, conditional canonical URLs and sitemap, and a designed 404 page.

## Content editing

| File | Edit here |
| --- | --- |
| `src/content/profile.ts` | Identity, headline, introduction, about copy, contact, social links, résumé, production origin, optional background entries, capabilities, editorial copy |
| `src/content/projects.ts` | The eight supplied project stories, stack, features, architecture, decisions, evidence distinctions, limitations, contributions, repository/demo links |
| `src/content/media.ts` | Screenshot/video/diagram paths, actual dimensions, descriptive captions, source links, video posters |
| `src/content/types.ts` | Shared TypeScript content contracts |
| `src/content/artifact.ts` | Assembly mode descriptions and conceptual layer names |
| `public/projects/` | Optimized project media |
| `src/app/globals.css` | Layered design tokens, layouts, motion, and responsive rules |
| `src/app/architectural.css` | V2 drafting surfaces, assembly layout, case-study summaries, and responsive refinements |

Search for **`REPLACE_ME`**. Missing personal facts are `null` or empty arrays, not invented credentials. Optional sections disappear cleanly until populated. See **[the content checklist](docs/content-checklist.md)** for exact remaining inputs.

### Adding a contact email

Set `profile.email` in `src/content/profile.ts`. The contact action becomes a `mailto:` link, and the copy button copies that email. Without an email, the site uses the supplied GitHub profile. There is no simulated contact form.

### Enabling background sections

Populate `experience`, `education`, or `achievements` with:

```ts
{
  title: 'Your verified title',
  organization: 'Your actual organization',
  period: 'Your actual dates',
  description: 'A supported description',
  link: 'https://your-verified-source.example', // optional; replace or omit
}
```

These are schema examples, not portfolio claims.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

On Linux, Playwright may also require `npx playwright install-deps chromium` (system permissions required). The implementation session used downloaded browser libraries isolated under `/tmp/omnirush`; it did not change system packages.

The 38-test Playwright suite covers desktop/mobile navigation, filters, keyboard search, case-study deep links, query examples, workflow revisions, clipboard success/failure, 320–1920px overflow checks, automated accessibility, responsive artwork, assembly layers, project transitions/history, WebGL failure, 404s, repository video playback, missing-image fallback, and JavaScript-disabled reading/navigation.

**[V2 release notes](docs/v2-release.md)** record the current checks and measurements. **[V1 verification notes](docs/verification.md)** preserve the earlier results.

## Deploy

Deploy the **contents of `out/`** to a static host supporting directory indexes. This preserves `/projects/argus/` and every other case-study URL on direct navigation and refresh.

- Vercel: import as a Next.js project; static export is configured.
- Netlify / Cloudflare Pages: build `npm run build`, publish `out`.
- Nginx or similar: serve directory `index.html` files and `404.html` for missing routes.
- For a subdirectory deployment such as a project GitHub Pages site, configure Next.js `basePath` and asset paths first; the current deployment target is an origin root.

Set **`profile.siteUrl`** to the final HTTPS origin and rebuild to emit real canonical URLs, absolute social-image URLs, and sitemap entries. No production domain is invented. Until configured, the sitemap intentionally contains no URLs.

## Asset and motion maintenance

- `scripts/generate-assets.mjs`: regenerates social/favicons and downloads/optimizes the reviewed still assets. Requires network access and the installed `sharp` package supplied by Next.js.
- `scripts/convert-recording.mjs`: optional NEXUS GIF → WebM conversion. Set `RECORDING_INPUT` and `FFMPEG_PATH` as needed. The existing checked-in video is already converted; regular builds do not need FFmpeg.
- `scripts/render-core-posters.mjs`: captures the actual procedural WebGL scene for the responsive fallback. Requires the local site and Playwright Chromium. Generated posters are already included.
- `scripts/visual-review.mjs`: captures desktop/mobile review images. Override `REVIEW_OUTPUT` and `REVIEW_URL` when needed; the output directory must exist.

No remote font service or third-party scene embed is used at runtime. Media, fonts, graphics, and application pages are served locally.

See **[V2 release notes](docs/v2-release.md)** for the current visual direction and **[V1 design and engineering notes](docs/design.md)** for the original architecture and evidence policy. **[The V2 roadmap](docs/v2-plan.md)** tracks the broader signature experiences and their remaining scope.
