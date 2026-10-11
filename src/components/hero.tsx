'use client';

import { useState } from 'react';
import { ArrowDown, MoveUpRight } from 'lucide-react';
import { editorial, profile } from '@/content/profile';
import { ActionLink } from './ui';
import { CoreExperience } from './core-experience';
import { DraftingGrid } from './drafting-grid';
import { artifactLayers, artifactModes, type ArtifactMode } from '@/content/artifact';

export function Hero() {
  const [mode, setMode] = useState<ArtifactMode>('form');
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <DraftingGrid />
    <div className="hero-coordinate mono hero-intro"><span className="tiny-cross">+</span><span>{profile.name.toUpperCase()} <span className="hero-coordinate-divider">/</span> SELECTED ENGINEERING WORK</span></div>
    <div className="hero-visual" aria-hidden="true"><CoreExperience mode={mode} /></div>
    <div className="hero-orbit-label mono"><span>FIG. 001</span><span>THE SYSTEM ASSEMBLY</span><i /></div>
    <div className="hero-title-wrap">
      <p className="eyebrow hero-intro">{editorial.hero.eyebrow}</p>
      <h1 id="hero-title" aria-label="Engineering the unseen."><span className="hero-line"><span className="hero-word">{editorial.hero.first}</span></span><span className="hero-line hero-line-bottom"><span className="hero-word">THE <span className="unseen">UNSEEN<span className="hero-period">.</span></span></span></span></h1>
    </div>
    <div className="hero-bottom">
      <div className="hero-actions hero-intro"><ActionLink href="#work" down>Explore the work <span className="action-count">08</span></ActionLink><a className="text-link" href={profile.links[0].url} target="_blank" rel="noopener noreferrer">Behind the code <MoveUpRight size={14} /><span className="sr-only"> on GitHub (opens in a new tab)</span></a></div>
      <div className="hero-description hero-intro"><span className="mono hero-name">{profile.name.toUpperCase()} — ENGINEER & BUILDER</span><p>{profile.headline}</p></div>
    </div>
    <div className="artifact-description" role="status"><span className="mono">{artifactModes.find((item) => item.id === mode)?.description}</span>{mode === 'layers' && <ol className="artifact-layer-legend">{artifactLayers.map((layer, index) => <li key={layer}><span>0{index + 1}</span>{layer}</li>)}</ol>}</div>
    <div className="hero-floor mono hero-intro"><a href="#work" className="scroll-cue"><span className="scroll-line" /><ArrowDown size={13} /> SCROLL TO DISCOVER</a><div className="scene-controls" role="group" aria-label="3D core appearance">{artifactModes.map((item) => <button key={item.id} onClick={() => setMode(item.id)} aria-pressed={mode === item.id}>{item.label}</button>)}</div><span className="hero-edition">FORM FOLLOWS UNDERSTANDING.</span></div>
  </section>;
}
