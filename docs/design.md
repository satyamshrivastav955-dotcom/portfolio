# Design and engineering notes

## Direction: an engineering observatory

The portfolio treats complex software as something that can be examined: a reflective signal core, fine technical annotations, diagrammatic previews, a compact system index, and case studies organized around decisions and evidence.

The visual rhythm is deliberately varied: a large dark opening, an editorial project gallery, a quiet identity chapter, a compact capability explorer, a soft-lilac engineering-philosophy chapter, and a large typographic sign-off.

### References actually inspected

- `prev.sandeepp.in`: fetched the page and inspected rendered desktop (1440×1000) and mobile (390×844) screenshots. Observed the oversized serif identity, terminal-themed hero, typewriter content, small status/skill elements, atmospheric dot field, and mobile stacking.
- `sandeepp.in/resume`: read the structured résumé and inspected its mobile rendering, including the grid, compact navigation, professional hierarchy, and role-based filters.
- Three.js, GSAP, Motion, and Spline: retrieved the documentation/showcase landing pages to inform technique choices. They were not all rendered interactively.
- Awwwards animation listing returned HTTP 403 in this environment.

No reference source code, branding, illustrations, or layout was copied. The portfolio uses an original geometric artifact and original explanatory diagrams. GSAP and Three.js were selected for their distinct jobs; a second general-purpose animation library was unnecessary.

## Design tokens

`src/app/globals.css` is organized into CSS layers: reset, tokens, base, layout, components, motion, responsive.

- **Canvas:** near-black `#0c0d10`; raised surfaces `#131419`.
- **Primary type:** off-white `#eeedf0`.
- **Accent:** restrained lilac `#b5a2ff`, complemented by soft cyan `#a5e3d3`.
- **Display:** self-hosted Bebas Neue, deliberately oversized and tightly composed.
- **Body:** self-hosted variable Space Grotesk.
- **Technical annotations:** system monospace, with no external font request.
- **Geometry:** thin rules, mostly square edges, sparse surface framing.
- **Motion:** shared ease `cubic-bezier(.22, 1, .36, 1)`, concise 180–900ms interface transitions, slower ambient movement.
- **Responsive boundaries:** 600, 800, 1100, and 1600px; additional small-screen and short-height treatment.

## Animation ownership

### Initial rendering

Hero typography animates in CSS, independently of library loading. Server-rendered headings and links exist before JavaScript. Important scroll-revealed copy uses translation rather than opacity hiding.

### Shared motion

`MotionProvider` owns the motion preference, optional GSAP import, scoped animation context, ScrollTriggers, resize/visibility observers, and cleanup. OS reduced-motion preferences are respected. The header pause control stops nonessential motion without removing content.

### Procedural core

`core-experience.tsx` selects the appropriate representation:

- Wide fine-pointer device, normal motion: lazily loaded Three.js scene.
- Small/touch device or reduced motion: local poster render of the exact same procedural scene.
- WebGL failure/context loss: the poster remains available.

The scene owns its renderer, geometries, materials, environment texture, resize observer, visibility observer, pointer/scroll listeners, and RAF. It caps DPR and rendering frequency, stops rendering when offscreen or in a hidden document, and disposes resources on unmount. No per-frame React state updates are used.

The mobile poster still provides form/signal switching, with low-cost CSS atmospheric movement when allowed. It avoids expensive shader compilation on constrained devices. This decision followed an actual mobile performance audit.

### Project graphics

Eight original SVG visualizations explain the supplied architectures. CSS animation is paused outside the viewport. Pointer tilt/lighting writes bounded CSS custom properties rather than causing per-frame React rerenders. Touch and keyboard access use the same project links.

### Navigation

Native HTML dialogs provide modality and focus containment. Escape closes dialogs, the command input supports arrow/Enter navigation, and Ctrl/Cmd+K opens the palette. Next.js routes preserve normal browser history. Static export produces refresh-safe HTML for all eight case-study paths.

## Evidence policy

- The supplied catalog is authoritative for project prose.
- Original previews and local interactive examples are labeled illustrations.
- Repository-provided images and video have explicit captions and source links.
- Student evaluation figures are described as historical repository reports pending verification, not promoted as current benchmark badges.
- NIDS metrics are withheld while the supplied evaluation inconsistency remains unresolved.
- CallShield collaboration is explicit, with personal contribution details pending.
- ARGUS optimization remains a separate related study.
- NEXUS is a simulation system; Base Sepolia is a test network.

## Media preparation

| Local asset | Source / treatment |
| --- | --- |
| `nexus-execution.webm` | Repository `outputs/demo.gif`; 118 frames, 12.5fps preserved; converted to VP9 WebM, approximately 356 KiB; no audio. |
| `nexus-poster.webp` | First original GIF frame. |
| `nexus-execution.webp` | Repository `outputs/demo_strip.png`; optimized as WebP. |
| `taskorbit-dashboard.webp` | Repository `docs/assets/taskorbit-dashboard.png`; optimized as WebP; demonstration-record caption. |
| `callshield-insight.webp` | Repository Android screenshot with antAI branding; demo-only scores/intervention wording explicitly contextualized. |
| `provenance-terminal.webp` | Repository confirmed-match capture, cropped to terminal results; desktop, local paths, and unrelated browser content removed. |
| `student-shap.webp` | Repository global SHAP figure; resized to 1200px and optimized as WebP; provenance and interpretation limitations visible. |
| `core-form.webp`, `core-signal.webp` | Captures of this portfolio’s own original Three.js scene. |

All project media sources are recorded beside their data in `src/content/media.ts`. No project backend was run as part of building this portfolio.
