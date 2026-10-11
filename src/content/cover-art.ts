import type { ProjectId } from './types';

export interface CoverArt {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Original conceptual cover artwork for each project, generated separately per
// docs/project-artwork-briefs.md (source: Crazy/img1–img8.png) and optimized to
// WebP via scripts/convert-covers.mjs. These are illustrative editorial covers,
// never project output: the genuine screenshots, simulation recording, and
// chart remain in the evidence sections via media.ts.
export const coverArt: Record<ProjectId, CoverArt> = {
  argus: {
    src: '/projects/covers/argus.webp', width: 1536, height: 1024,
    alt: 'Conceptual cover art for ARGUS: a solitary figure crossing a concrete underpass in a shaft of light, marked by small red attention brackets beside a red architectural plane. Illustrative artwork, not a detection result.',
  },
  callshield: {
    src: '/projects/covers/callshield.webp', width: 1536, height: 1024,
    alt: 'Conceptual cover art for CallShield: a silhouetted caller against concrete with a red ribbon of sound. Illustrative artwork, not a waveform measurement.',
  },
  'graphql-sentinel': {
    src: '/projects/covers/graphql-sentinel.webp', width: 1536, height: 1024,
    alt: 'Conceptual cover art for GraphQL-Sentinel: brushed-steel query channels approaching a gateway, one branch stopped by a red barrier. Illustrative artwork, not a system diagram.',
  },
  'hybrid-ai-nids': {
    src: '/projects/covers/hybrid-ai-nids.webp', width: 1536, height: 1024,
    alt: 'Conceptual cover art for Hybrid AI NIDS: black signal conduits converging into an inspection junction with a small red intervention. Illustrative artwork, not network data.',
  },
  'nexus-1': {
    src: '/projects/covers/nexus-1.webp', width: 1536, height: 1024,
    alt: 'Conceptual cover art for NEXUS-1: a robotic arm placing a white cube beside a red target plane. Illustrative artwork; the genuine MuJoCo recording appears in the evidence section.',
  },
  'face-blockchain': {
    src: '/projects/covers/face-blockchain.webp', width: 1536, height: 1024,
    alt: 'Conceptual cover art for Face Blockchain Verification: a contact sheet, evidence plate, and archival block linked by a red provenance strip. Illustrative artwork, not verification evidence.',
  },
  taskorbit: {
    src: '/projects/covers/taskorbit.webp', width: 1536, height: 1024,
    alt: 'Conceptual cover art for TaskOrbit: ordered work trays with a red folio passing between stations. Illustrative artwork, not the application interface.',
  },
  'student-intelligence': {
    src: '/projects/covers/student-intelligence.webp', width: 1536, height: 1024,
    alt: 'Conceptual cover art for Student Intelligence: translucent analytical layers and sculptural columns over an open notebook with a red focal plane. Illustrative artwork, not model output.',
  },
};
