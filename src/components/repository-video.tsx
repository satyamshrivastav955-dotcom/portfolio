'use client';

import { useState } from 'react';
import type { ProjectAsset } from '@/content/types';

export function RepositoryVideo({ asset }: { asset: ProjectAsset }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className="video-fallback" role="status"><p>The simulation recording could not be loaded.</p><a href={asset.sourceUrl ?? asset.src} target="_blank" rel="noopener noreferrer">Open the original repository recording ↗</a></div> : <video className="case-hero-recording" controls playsInline preload="none" poster={asset.poster} width={asset.width} height={asset.height} aria-label={asset.alt} onError={() => setFailed(true)}><source src={asset.src} type="video/webm" onError={() => setFailed(true)} /><a href={asset.sourceUrl ?? asset.src}>Open the simulation recording</a></video>;
}
