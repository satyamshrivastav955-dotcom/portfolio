'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '@/content/types';
import { coverArt } from '@/content/cover-art';
import { ProjectVisual } from './project-visual';

export function ProjectArtwork({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const cover = coverArt[project.id];
  if (cover && !failed) {
    return <div className={`project-artwork artwork-${project.id} has-cover`}>
      <Image className="cover-art-image" src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} loading="lazy" onError={() => setFailed(true)} />
      <span className="artwork-index" aria-hidden="true">{project.number}</span>
      <span className="artwork-caption mono">ORIGINAL CONCEPT ARTWORK / {project.category.split(' · ')[0]}</span>
    </div>;
  }
  return <div className={`project-artwork artwork-${project.id}`}>
    <ProjectVisual id={project.id} />
    <span className="artwork-index" aria-hidden="true">{project.number}</span>
    <span className="artwork-caption mono">ILLUSTRATIVE SYSTEM STUDY</span>
    {failed && <span className="artwork-fallback mono">COVER UNAVAILABLE / DIAGRAM SHOWN</span>}
  </div>;
}
