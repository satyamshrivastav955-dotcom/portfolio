'use client';

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMotionPreference } from './motion-provider';

const NavigationContext = createContext<((href: string) => void) | null>(null);

/** Coordinate native shared-element snapshots with the committed App Router page. */
export function PageTransitions({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { paused } = useMotionPreference();
  const pending = useRef<(() => void) | null>(null);
  const active = useRef<ViewTransition | null>(null);

  useEffect(() => {
    pending.current?.();
    pending.current = null;
  }, [pathname]);

  useEffect(() => () => {
    pending.current?.();
    active.current?.skipTransition();
  }, []);

  const navigate = useCallback((href: string) => {
    if (paused || typeof document.startViewTransition !== 'function' || href === pathname) {
      router.push(href);
      return;
    }
    active.current?.skipTransition();
    pending.current?.();
    try {
      const transition = document.startViewTransition(() => new Promise<void>((resolve) => {
        // Navigation always proceeds, even when a slow route exceeds the visual budget.
        const timeout = window.setTimeout(resolve, 1800);
        pending.current = () => { window.clearTimeout(timeout); resolve(); };
        router.push(href);
      }));
      active.current = transition;
      void transition.ready.catch(() => {});
      void transition.finished.catch(() => {}).finally(() => {
        if (active.current === transition) active.current = null;
      });
    } catch {
      pending.current?.();
      pending.current = null;
      router.push(href);
    }
  }, [paused, pathname, router]);

  return <NavigationContext.Provider value={navigate}>{children}</NavigationContext.Provider>;
}

export const useProjectNavigation = () => useContext(NavigationContext);
