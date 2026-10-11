import type { ProjectId } from './types';

export interface ImplementationPlate {
  src: string;
  portrait?: string;
  alt: string;
}

// Presentation artwork derived from the unmodified repository media in media.ts.
// These are editorial compositions, not alternative application screenshots.
export const implementationPlates: Partial<Record<ProjectId, ImplementationPlate>> = {
  callshield: {
    src: '/projects/editorial/callshield.webp', portrait: '/projects/editorial/callshield-portrait.webp',
    alt: 'Signal and Trust: an editorial monochrome composition of the real CallShield Android demonstration, with red framing. The screenshot contains sample dialogue and unvalidated demonstration scores.',
  },
  'nexus-1': {
    src: '/projects/editorial/nexus.webp',
    alt: 'NEXUS-1: a monochrome editorial plate showing a genuine MuJoCo simulator frame above the four repository execution phases: align, lift, lower, and release.',
  },
  taskorbit: {
    src: '/projects/editorial/taskorbit.webp',
    alt: 'Work in Orbit: the real TaskOrbit delivery dashboard presented as a monochrome print with a red margin. All displayed records are repository demonstration data.',
  },
  'face-blockchain': {
    src: '/projects/editorial/provenance.webp',
    alt: 'Trace the Evidence: the original repository terminal capture in an editorial composition, alongside the explanatory image-match, evidence-digest, and testnet-anchor relationship.',
  },
  'student-intelligence': {
    src: '/projects/editorial/student.webp',
    alt: 'Beyond the Score: the repository SHAP importance chart framed as an editorial plate. Blue actionable-feature bars are recolored red; the original labels, values, and lengths are unchanged.',
  },
};
