'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import type { ProjectAsset } from '@/content/types';

function Asset({ asset }: { asset: ProjectAsset }) {
  const [failed, setFailed] = useState(false);
  return <figure className={`evidence-asset ${asset.height > asset.width * 1.5 ? 'portrait-asset' : ''}`}>{failed ? <div className="asset-fallback"><ImageOff size={28} /><p>This asset could not be loaded.</p></div> : asset.kind === 'video' ? <video controls playsInline preload="none" poster={asset.poster} width={asset.width} height={asset.height} aria-label={asset.alt} onError={() => setFailed(true)}><source src={asset.src} /><a href={asset.src}>Open the simulation recording</a></video> : <Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} onError={() => setFailed(true)} loading="lazy" />}<figcaption><span className="mono">{asset.kind.toUpperCase()}</span><div>{asset.caption}{asset.sourceUrl && <a href={asset.sourceUrl} target="_blank" rel="noopener noreferrer">View repository source ↗<span className="sr-only"> (opens in a new tab)</span></a>}</div></figcaption></figure>;
}

export function AssetGallery({ assets }: { assets: ProjectAsset[] }) {
  if (!assets.length) return null;
  return <section id="visual-evidence" className="case-section"><div className="case-section-title"><span className="mono">VISUAL RECORD</span><h2>From the implementation.</h2></div>{assets.map((asset) => <Asset key={asset.src} asset={asset} />)}</section>;
}
