'use client';

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const MotionContext = createContext({ paused: true, reduced: true, toggle: () => {} });
function subscribe(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const snapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, snapshot, () => true);
  const [userPaused, setUserPaused] = useState(false);
  const paused = reduced || userPaused;
  const pathname = usePathname();
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting); });
    }, { rootMargin: '80px' });
    const observe = () => wrapper.current?.querySelectorAll('.project-visual, .core-poster').forEach((element) => observer.observe(element));
    observe();
    const mutations = new MutationObserver(observe);
    if (wrapper.current) mutations.observe(wrapper.current, { childList: true, subtree: true });
    const visibility = () => { document.documentElement.dataset.visibility = document.hidden ? 'hidden' : 'visible'; };
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); mutations.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'off' : 'on';
    if (paused) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    const load = () => Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      // Keep scroll choreography aligned with wall-clock time on slower devices.
      gsap.ticker.lagSmoothing(0);
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, { y: 42, duration: 0.9, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
        });
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
          gsap.fromTo(element, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
        });
        if (wrapper.current?.querySelector('.manifesto')) {
          gsap.fromTo('.manifesto-line', { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', stagger: 0.5, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 80%', end: 'bottom 55%', scrub: 0.7 } });
          gsap.to('.philosophy-orbit', { rotation: 100, ease: 'none', scrollTrigger: { trigger: '.philosophy', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
        }
      }, wrapper);
      const resize = new ResizeObserver(() => ScrollTrigger.refresh());
      if (wrapper.current) resize.observe(wrapper.current);
      cleanup = () => { resize.disconnect(); context.revert(); };
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    }).catch(() => { /* All content is visible without the optional animation library. */ });
    const useIdle = typeof window.requestIdleCallback === 'function';
    const handle = useIdle ? window.requestIdleCallback(() => { void load(); }, { timeout: 1500 }) : window.setTimeout(() => { void load(); }, 100);
    return () => { cancelled = true; if (useIdle) window.cancelIdleCallback(handle); else window.clearTimeout(handle); cleanup?.(); };
  }, [paused, pathname]);

  return <MotionContext.Provider value={{ paused, reduced, toggle: () => setUserPaused((value) => !value) }}><div ref={wrapper}>{children}</div></MotionContext.Provider>;
}

export const useMotionPreference = () => useContext(MotionContext);
