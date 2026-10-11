'use client';

import Image from 'next/image';
import type { ImplementationPlate as Plate } from '@/content/implementation-plates';
import styles from './implementation-plates.module.css';

export function ImplementationPlate({ plate, onError }: { plate: Plate; onError: () => void }) {
  return <div className={`project-artwork ${styles.plate} ${plate.portrait ? styles.hasPortrait : ''}`} data-implementation-plate>
    <Image className={styles.landscape} src={plate.src} alt={plate.alt} width={1400} height={1000} loading="lazy" onError={onError} />
    {plate.portrait && <Image className={styles.portrait} src={plate.portrait} alt={plate.alt} width={960} height={1260} loading="lazy" onError={onError} />}
  </div>;
}
