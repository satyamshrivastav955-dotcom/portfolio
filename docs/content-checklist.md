# Final content checklist

The eight detailed project descriptions have already been incorporated. Do not paste them again into components: update the matching typed project record.

## Personal inputs still needed

All fields below live in `src/content/profile.ts`.

- [ ] `profile.email`: public contact address. Currently `null`; GitHub is the functioning contact destination.
- [ ] `profile.siteUrl`: final HTTPS origin. Activates canonical URLs, absolute share-image URLs, and sitemap entries after a rebuild.
- [ ] `profile.links`: verified LinkedIn and any additional professional links. The supplied GitHub account is already configured.
- [ ] `profile.resume`: public PDF path or verified résumé URL. No placeholder download button is shown.
- [ ] `profile.location`: optional real location.
- [ ] `profile.availability`: optional actual availability statement. No invented “online” or availability status is displayed.
- [ ] `profile.experience`: verified role, organization, dates, description, optional source.
- [ ] `profile.education`: verified institution, qualification, dates, description, optional source.
- [ ] `profile.achievements`: documented milestones or awards. Empty sections stay hidden.

The introduction and engineering focus already use the supplied text. The monogram is original typographic artwork, not a placeholder photograph. A portrait is optional.

## Project-specific inputs

Edit `src/content/projects.ts`; media belongs in `src/content/media.ts`.

| Project | Remaining evidence / confirmation |
| --- | --- |
| ARGUS | Real perception-pipeline screenshots or recording; reproducible hardware/model/input benchmark details. Confirm integration before describing the VLM optimization repository as part of the runnable perception pipeline. |
| CallShield | **Your individual contributions** and collaborator attribution; verified intervention behavior. The current ownership note explicitly says contributions are pending. Android demonstration media is included and labeled. |
| GraphQL-Sentinel | Current implemented-versus-roadmap boundary and genuine gateway/dashboard captures. The local portfolio depth example is illustrative. |
| Hybrid AI NIDS | Reconcile trained-model availability and evaluation status; verify results artifacts before showing performance numbers. Genuine SOC screenshots would strengthen the case study. |
| NEXUS-1 | Additional real execution traces if desired. Repository simulation recording and phase frames are included. Physical-robot validation is not claimed; repository-disclosed carry assist is noted. |
| Face Blockchain | A reviewed Base Sepolia transaction record and evidence bundle if desired. A cropped real terminal capture is included. Testnet anchoring is not proof of identity, authorship, or authenticity. |
| TaskOrbit | Current actual test runs and a reliable demo URL, if available. The real repository dashboard image uses demonstration records. |
| Student Intelligence | Verify the reported evaluation artifacts and rerun the test suite before promoting historical figures as current results. The global SHAP figure is included as repository-reported analysis, not a new result. |

For any project, populate `demo` only with a working, reviewed URL. Add `contribution` where specific ownership information is known.

## Add media

1. Place optimized files in `public/projects/`.
2. Add a `ProjectAsset` record to the correct entry in `src/content/media.ts`.
3. Specify **actual** `width` and `height` to reserve space.
4. Include meaningful `alt`, a scope-aware `caption`, `kind`, and a `sourceUrl` where available.
5. For video, provide a `poster`; playback is user-controlled and does not autoplay.
6. Link that media array from the corresponding project record if the project did not previously have media.

Original SVG previews live in `src/components/project-visual.tsx` and are labeled conceptual visuals. Repository media appears in a separate “From the implementation” section.

## Before publishing

- [ ] Supply the final domain and rebuild.
- [ ] Confirm identity, links, and collaboration attribution.
- [ ] Confirm the email/résumé actions if enabled.
- [ ] Review captions and the evidence boundaries on every case study.
- [ ] Run the documented checks.
- [ ] Verify direct project URLs and `404.html` on the actual hosting provider.
- [ ] Check share previews after the production origin is configured.

**Search convention:** `REPLACE_ME` identifies unconfigured fields and media-expansion points in source. No fabricated personal facts are used as visual filler.
