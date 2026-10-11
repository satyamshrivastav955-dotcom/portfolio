'use client';

import { lazy, Suspense, useSyncExternalStore } from 'react';
import { useMotionPreference } from './motion-provider';
import { CorePoster } from './core-poster';
import type { ArtifactMode } from '@/content/artifact';

const SignalCore = lazy(() => import('./signal-core'));
const mediaQuery = '(min-width: 800px) and (pointer: fine)';
function subscribe(callback: () => void) {
  const media = window.matchMedia(mediaQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export function CoreExperience({ mode }: { mode: ArtifactMode }) {
  const widePointer = useSyncExternalStore(subscribe, () => window.matchMedia(mediaQuery).matches, () => false);
  const { reduced } = useMotionPreference();
  if (!widePointer || reduced) return <CorePoster mode={mode} />;
  return <Suspense fallback={<CorePoster mode={mode} />}><SignalCore mode={mode} /></Suspense>;
}
