'use client';

import Image from 'next/image';
import { useState } from 'react';
import { editorialPhotography } from '@/content/media';

export function EditorialPhoto({ name, className = '', priority = false }: { name: keyof typeof editorialPhotography; className?: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  const asset = editorialPhotography[name];
  return <div className={`editorial-photo ${className} ${failed ? 'photo-unavailable' : ''}`}>
    {!failed && <Image src={asset.src} width={1800} height={1200} alt={asset.alt} priority={priority} loading={priority ? undefined : 'lazy'} onError={() => setFailed(true)} />}
  </div>;
}
