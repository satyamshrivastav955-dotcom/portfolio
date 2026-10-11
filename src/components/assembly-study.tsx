'use client';

import { useState } from 'react';
import { CoreExperience } from './core-experience';
import { artifactModes, artifactLayers, type ArtifactMode } from '@/content/artifact';

export function AssemblyStudy() {
  const [mode, setMode] = useState<ArtifactMode>('form');
  const [open, setOpen] = useState(false);
  return <div className="assembly-study">
    <button className="assembly-toggle" aria-expanded={open} aria-controls="assembly-inspector" onClick={() => setOpen(!open)}><span>INSPECT THE SYSTEM ASSEMBLY</span><span aria-hidden="true">{open ? '−' : '+'}</span></button>
    {open && <div id="assembly-inspector"><div className="assembly-visual" aria-hidden="true"><CoreExperience mode={mode} /></div><div className="scene-controls" role="group" aria-label="3D core appearance">{artifactModes.map(item => <button key={item.id} onClick={() => setMode(item.id)} aria-pressed={mode === item.id}>{item.label}</button>)}</div><div className="artifact-description" role="status"><span>{artifactModes.find(item => item.id === mode)?.description}</span>{mode === 'layers' && <ol className="artifact-layer-legend">{artifactLayers.map((layer,index) => <li key={layer}><span>0{index + 1}</span>{layer}</li>)}</ol>}</div><p className="mono">ORIGINAL CONCEPTUAL ASSEMBLY / INPUT → VERIFICATION</p></div>}
  </div>;
}
