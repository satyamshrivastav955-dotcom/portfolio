import type { ProjectAsset, ProjectId } from './types';

const source = 'https://github.com/satyamshrivastav955-dotcom';

// Editorial photography only: never presented as project output or a portrait of the owner.
export const editorialPhotography = {
  architecture: { src: '/editorial/architecture.webp', alt: 'Monochrome architectural photograph of stepped glass towers, viewed from below.', sourceUrl: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2', credit: 'Architecture photograph / Unsplash' },
  concrete: { src: '/editorial/concrete.webp', alt: 'Monochrome architectural photograph of a cantilevered geometric building and sloping glass facade.', sourceUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625', credit: 'Architecture photograph / Unsplash' },
} as const;

// Reviewed repository media. These are distinct from the portfolio's conceptual SVG previews.
// REPLACE_ME: add further verified screenshots, recordings and benchmark artifacts here.
export const projectMedia: Partial<Record<ProjectId, ProjectAsset[]>> = {
  'nexus-1': [{
    src: '/projects/nexus-execution.webm', width: 540, height: 405,
    kind: 'video', poster: '/projects/nexus-poster.webp',
    alt: 'Recorded MuJoCo manipulation sequence from the NEXUS-1 repository, showing the arm moving a block toward the bin.',
    caption: 'Repository-provided MuJoCo execution recording, converted from the original 118-frame GIF into a smaller WebM while preserving its 12.5fps timing. No audio. Playback is on demand. This is a simulation recording, not physical-robot validation.',
    sourceUrl: `${source}/language-to-action-robot-agent/blob/main/outputs/demo.gif`,
  }, {
    src: '/projects/nexus-execution.webp', width: 1280, height: 240,
    kind: 'screenshot',
    alt: 'Four MuJoCo simulation frames showing the robot aligning, lifting, lowering, and releasing a block.',
    caption: 'Repository-provided simulation frames: ALIGN → LIFT → LOWER → RELEASE. This is MuJoCo simulation evidence, not a physical-robot recording.',
    sourceUrl: `${source}/language-to-action-robot-agent/blob/main/outputs/demo_strip.png`,
  }],
  callshield: [{
    src: '/projects/callshield-insight.webp', width: 458, height: 1024,
    kind: 'screenshot',
    alt: 'Repository Android demonstration with sample scam dialogue, signal explanations, and a risk summary using antAI branding.',
    caption: 'Repository-provided Android demonstration (antAI branding), using sample scam dialogue. Displayed scores and intervention text are demo UI output, not independently validated performance or proof of transaction blocking.',
    sourceUrl: `${source}/call-shield/blob/main/assets/screenshots/antai_incall_insight.jpg`,
  }],
  'face-blockchain': [{
    src: '/projects/provenance-terminal.webp', width: 500, height: 177,
    kind: 'screenshot',
    alt: 'Cropped repository terminal output listing independent candidate checks and confirmed image matches.',
    caption: 'Cropped repository terminal output. The surrounding desktop, local paths, and unrelated browser content have been removed. Candidate similarity values are example outputs, not identity or authenticity guarantees.',
    sourceUrl: `${source}/face-blockchain-verification/blob/main/assets/demo_confirmed_match.png`,
  }],
  taskorbit: [{
    src: '/projects/taskorbit-dashboard.webp', width: 1024, height: 575,
    kind: 'screenshot',
    alt: 'TaskOrbit manager delivery dashboard showing project state, deadlines, review tasks, and a schedule overlap.',
    caption: 'Repository-provided delivery dashboard with demonstration records. This image illustrates the interface; it is not evidence of customer adoption or operational scale.',
    sourceUrl: `${source}/taskorbit/blob/main/docs/assets/taskorbit-dashboard.png`,
  }],
  'student-intelligence': [{
    src: '/projects/student-shap.webp', width: 1200, height: 1044,
    kind: 'diagram',
    alt: 'Repository global SHAP importance chart with absence level, learning resources, and classroom participation among the displayed factors.',
    caption: 'Repository-generated global SHAP attribution figure. Values describe this documented model analysis; they are not causal effects, new portfolio calculations, or independently revalidated results.',
    sourceUrl: `${source}/student-performance-prediction-system/blob/main/assets/figures/12_shap_global_importance.png`,
  }],
};
