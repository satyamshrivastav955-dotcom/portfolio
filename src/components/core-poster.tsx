import Image from 'next/image';
import type { ArtifactMode } from '@/content/artifact';

/** A render of our own procedural scene, used before WebGL and on smaller devices. */
export function CorePoster({ mode }: { mode: ArtifactMode }) {
  return <div className="core-poster" data-mode={mode}><Image src={`/core-${mode}.webp`} alt="" width={760} height={760} preload={mode === 'form'} fetchPriority={mode === 'form' ? 'high' : 'auto'} decoding="sync" /></div>;
}
