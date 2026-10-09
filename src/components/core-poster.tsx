import Image from 'next/image';

/** A render of our own procedural scene, used before WebGL and on smaller devices. */
export function CorePoster({ mode }: { mode: 'form' | 'signal' }) {
  return <div className="core-poster" data-mode={mode}><Image src={`/core-${mode}.webp`} alt="" width={760} height={720} preload={mode === 'form'} fetchPriority={mode === 'form' ? 'high' : 'auto'} decoding="sync" /></div>;
}
