export type ArtifactMode = 'form' | 'signal' | 'layers';

export const artifactModes: { id: ArtifactMode; label: string; description: string }[] = [
  { id: 'form', label: '01 / FORM', description: 'Four connected layers. One considered system.' },
  { id: 'signal', label: '02 / SIGNAL', description: 'Inspect the structure beneath the surface.' },
  { id: 'layers', label: '03 / LAYERS', description: 'Input → reasoning → action → verification.' },
];

export const artifactLayers = ['Input', 'Reasoning', 'Action', 'Verification'];
