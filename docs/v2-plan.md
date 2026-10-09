# V2 plan — The Systems Observatory

**Status:** Planned. This document describes the next version, not features already implemented in V1.

## The ambition

Create a portfolio people remember for its visual originality, physical-feeling interactions, and the clarity of its engineering stories. The experience should make visitors curious enough to explore and give them credible evidence when they do.

Two equally important outcomes:

> “That experience was memorable.”
>
> “I understand what Satyam built, how it works, and why those decisions matter.”

The creative direction is an **engineering observatory**: visitors encounter a sophisticated artifact, inspect its layers, and follow its connections into real projects.

## 1. Preserve V1

- Archive the V1 source, npm lockfile, production output, content, and verification record.
- Keep a working V1 preview available.
- Establish desktop/mobile screenshot and interaction baselines.
- Develop V2 in a separate branch or workspace; perform the release transition after review.
- Reuse the typed content architecture, evidence distinctions, working routes, and tested accessibility foundations.

## 2. Improve identity and information hierarchy

- Make **Satyam Shrivastav** and the supplied professional positioning prominent in the opening.
- Connect the central artwork to perception, reasoning, action, and verification.
- Give flagship projects distinct compositions and interaction patterns within one design system.
- Bring the strongest verified recording, screenshot, or example toward the opening of each case study.
- Add concise, verified personal-contribution summaries and engineering trade-offs.
- Increase small mobile annotation sizes and tighten empty space around the hero actions.
- Maintain an immediate route to the complete project index and professional information.

## 3. Signature Moments — the cinematic animation track

This is a central V2 workstream. The goal is several exceptional, connected moments supported by precise everyday interaction design.

### A. The artifact awakens — signature opening

**Visitor experience:** the composition comes into focus, typography moves through spatial layers, and a custom engineered structure reveals itself.

- Create a bespoke artifact with meaningful assemblies representing inputs, reasoning, outputs, and verification.
- Choreograph lighting, component alignment, typography, annotations, and actions as one concise entrance.
- Let selected geometry pass behind and in front of decorative typography using carefully authored masks and occlusion.
- Introduce a short directional light sweep that reveals material and surface detail.
- Add restrained pointer-responsive camera movement and depth-dependent particle motion.
- Keep identity, navigation, and primary actions available immediately.

**Engineering approach:** procedural Three.js geometry, reused/instanced meshes where useful, a tightly limited material set, and a shared timeline. Prototype any shader effect against a simpler implementation before committing to its cost.

**Starting motion budget:** approximately 1.2–1.6 seconds for the entrance, with no navigation gate or artificial loading delay.

### B. The exploded-view transformation — the defining scroll moment

**Visitor experience:** the artifact opens into its component layers; those layers become a readable architecture diagram that introduces the work.

- Use a short, scroll-linked camera move and controlled component separation.
- Maintain continuity between object parts, labels, diagram nodes, and project categories.
- Let connectors construct themselves as their role is introduced.
- End in a usable project-navigation composition.
- Make interruption and reverse scrolling natural.
- Provide direct section navigation that works at every stage.

**Starting implementation:** one bounded Three.js scene, a scoped GSAP timeline, and DOM/SVG labels. Any sticky chapter must be short and preserve native scrolling.

### C. Project portals — continuity from preview to case study

**Visitor experience:** selecting a project carries the preview into its case study, preserving a sense of place.

- Expand the selected media surface into the case-study opening.
- Carry the project title, accent, and one graphic motif through the transition.
- Stage the supporting text after the visual settles.
- Preserve image/video aspect ratios and stable layout dimensions.
- Coordinate return navigation with the originating project position.

**Engineering approach:** prototype native View Transitions and a controlled overlay fallback against Next.js navigation, direct loads, and back/forward behavior. An interrupted transition must still leave a usable page.

**Starting motion budget:** 450–700ms, reduced to an immediate or short crossfade presentation when appropriate.

### D. Engineering X-ray — inspect the layers

**Visitor experience:** an explicit control reveals the conceptual structure behind the polished artifact or project visualization.

- Transition between solid surfaces, wire structure, labeled modules, and data paths.
- Highlight the inspected module and reveal a concise explanation.
- Use selection and keyboard focus, with pointer hover as an enhancement.
- Synchronize the same selection in the visual and its accessible text controls.
- Label this as an explanatory architectural view; show actual runtime telemetry only when sourced and connected.

This develops V1’s form/signal switch into an information-bearing interaction.

### E. The signal field — a living connective background

**Visitor experience:** particles briefly organize around a meaningful action, then settle back into the atmosphere.

- Let sparse particles bend subtly around pointer movement.
- Use short, purposeful formations: a project contour, a connection path, or a transition into a diagram.
- Reserve higher-density formations for selected moments.
- Keep the field subordinate to text and pause it outside the visible chapter.

**Engineering approach:** a bounded particle buffer or instanced geometry within the existing scene, with adaptive density and no React updates per particle/frame.

### F. Spatial typography — an art-directed headline system

- Use line masks, word sequencing, depth, and selective occlusion.
- Give the opening headline, section statements, and project titles different motion rhythms.
- Explore a short tracking/scale transition where a headline settles into its final composition.
- Use readable text illumination for the engineering philosophy.
- Keep real headings in the DOM and decorative duplicates hidden from assistive technology.
- Reserve displacement/distortion for brief decorative moments; important copy remains readable.

### G. Evidence choreography — movement that explains

- Synchronize verified recordings with their documented action phases.
- Reveal architecture connections as the relevant evidence appears.
- Animate transitions between comparison states while keeping labels and scale understandable.
- Let visitors scrub, step, replay, pause, and inspect.
- Preserve the distinction between repository evidence, recorded playback, local illustrations, and planned functionality.

### H. Tactile micro-interactions — the supporting finish

- Bounded magnetic movement on selected desktop actions, while keeping their hit areas stable.
- Perspective and lighting responses on project previews.
- Small spring-based icon and selection transitions.
- Command-palette opening/closing choreography with immediate keyboard readiness.
- Focus states that feel as deliberate as hover states.
- Crisp clipboard, loading, and error feedback.
- A subtle desktop exploration indicator where it conveys an actual action; retain a reliable native pointer and touch equivalent.

### I. The closing connection — a final visual payoff

- Reintroduce the opening motif in a quieter contact composition.
- Let previously separate paths converge into one clear contact action.
- Echo the initial typography rhythm to make the experience feel complete.
- Keep the configured email/profile action direct and functional.

## 4. Three flagship engineering experiences

### ARGUS — the perception timeline

- Lead with a genuine recording where available.
- Scrub through verified detection/tracking annotations synchronized to the source frames.
- Select an event and follow its path through perception, asynchronous reasoning, logging, prioritization, and alert delivery.
- Animate the relationship between the frame, selected event, and architecture node.
- Treat the VLM optimization repository as a separate module until integration is verified.

**Evidence dependency:** obtain matching recordings, frame timestamps, event data, and benchmark context before representing a synchronized trace as real output.

### NEXUS-1 — mission playback

- Make the existing real MuJoCo recording prominent.
- Introduce the instruction and synchronize playback with documented execution phases.
- Show target/actual coordinates and verification results only when a corresponding trace exists.
- Animate an explanatory error vector during a documented recovery example.
- Keep simulation scope and carry-assist disclosure clear.

**Motion signature:** a spatial progression from instruction to plan to execution, with the recorded result determining the verification narrative.

### GraphQL-Sentinel — inspectable security decisions

- Expand the local example into an editable query playground.
- Parse queries with a real GraphQL parser and visualize the operation structure.
- Animate changes in nesting, branches, and the inspected path.
- Offer a small, explicitly illustrative configurable policy.
- Present a trace of the local decision and its contributing inputs.
- Handle invalid queries and empty input accessibly.

**Evidence boundary:** the browser illustration is not the repository gateway or a comprehensive security assessment.

## 5. Distinctive motion for the remaining projects

| Project | Interaction direction | Evidence requirement |
| --- | --- | --- |
| CallShield | Available signal lanes converge into an explainable evidence summary; selected signals expand into their analysis paths. | Label demonstrations and confirm personal contributions and intervention behavior. |
| Hybrid AI NIDS | Recorded traffic flows through the four model branches; users inspect the fusion and drift narrative. | Validate evaluation artifacts; distinguish replay/synthetic examples from live traffic. |
| Face Blockchain | A canonical evidence record produces an actual client-side SHA-256 digest; editing a field visibly changes the integrity record. | Use canonicalization correctly, identify example payloads, and label any Base Sepolia anchor as testnet evidence. |
| TaskOrbit | A task moves between role-specific workspaces, with animated deadline-conflict and revision states. | Clearly identify the local workflow illustration and distinguish it from a connected product demo. |
| Student Intelligence | Verified attribution and counterfactual examples transition between explanation states. | Preserve dataset/evaluation context, fixed protected attributes, and human decision-support framing. |

Every project retains a complete readable case study even when richer evidence is still pending.

## 6. Two depths of reading

Give each case study a quick opening summary:

**Problem → My contribution → Key decision → Evidence → Current scope**

Follow it with the deeper technical story:

- Architecture and inspectable components.
- Goals, constraints, and trade-offs supported by the supplied material.
- Relevant source-file and artifact links when verified.
- Testing/evaluation context and limitations.
- Related work and the next project.

## 7. Performance, accessibility, and interaction requirements

- Keep the central WebGL workload bounded and avoid a separate heavy canvas for every project card.
- Load expensive interactions by relevance and capability; reserve space before loading assets.
- Use one owner for each timeline, renderer, observer, and listener, with complete cleanup.
- Pause offscreen and hidden-document activity.
- Maintain lightweight mobile representations and user-controlled playback.
- Respect reduced motion across camera moves, typography, parallax, particles, and shared-element transitions.
- Keep text legible throughout transitions; do not leave offscreen content at low opacity.
- Provide touch and keyboard equivalents for meaningful pointer interactions.
- Preserve real links, direct-route loading, refresh, browser history, and skip navigation.
- Use visible focus states and comfortable touch targets.
- Prototype failure behavior for interrupted navigation, WebGL/context loss, media errors, and unavailable optional assets.
- Target **90+ mobile Lighthouse performance** under a documented setup, with separate checks of the actual interactive WebGL path and real-device behavior where available.
- Report measured results and test scope rather than promising universal scores or frame rates.

## 8. Implementation sequence

1. **Freeze V1 and establish baselines.**
2. **Prototype the signature opening and exploded-view transformation.** Validate the visual result, mobile adaptation, and rendering cost before building around it.
3. **Build the flagship experiences:** ARGUS, NEXUS-1, and GraphQL-Sentinel, using available evidence and honest illustrative fallbacks.
4. **Integrate project-portal transitions and the X-ray interaction.** Verify interrupted navigation and accessible equivalents early.
5. **Extend the system across the remaining five projects.** Maintain variation in compositions and motion rhythm.
6. **Polish typography, signal-field moments, micro-interactions, and the closing connection.**
7. **Refine mobile, optimize, and verify.** Run functional/accessibility tests, inspect rendered pages, measure performance, and make a deliberate final visual pass.

## 9. Priority order

### Signature priorities

1. Artifact-to-architecture transformation.
2. Evidence-led flagship case studies.
3. Continuous project-to-case-study transitions.

### Supporting priorities

- Spatial typography.
- Engineering X-ray.
- Tactile, keyboard-equivalent interactions.
- Mobile art direction and readability.

### Selective experiments

- Particle formations.
- Custom shader displacement/refraction.
- Contextual desktop exploration indicator.
- Additional depth/camera effects.

Adopt selective experiments when their rendered result adds a clear, coherent improvement within the measured performance budget.

## 10. Final review questions

- Can a visitor identify Satyam and his engineering focus immediately?
- Does the opening artifact lead naturally into the actual work?
- Are there several genuinely memorable moments with breathing room between them?
- Can visitors understand the flagship projects quickly and inspect them deeply?
- Do animation and evidence reinforce each other?
- Is every visible control functional, interruptible, and accessible?
- Does mobile feel independently composed and fast?
- Are collaboration, simulation, experiments, and roadmap boundaries still accurate?
- Is V2 demonstrably stronger than the preserved V1 in the rendered experience and its engineering?
