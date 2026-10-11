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
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting); });
    }, { rootMargin: '80px' });
    const observe = () => wrapper.current?.querySelectorAll('.project-visual, .core-poster, .audio-field').forEach(element => observer.observe(element));
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
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      const context = gsap.context(() => {
        media.add('(min-width: 900px) and (min-height: 650px)', () => {
          if (!wrapper.current?.querySelector('.opening-scene')) return;
          const opening = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'opening', trigger: '.opening-scene', start: 'top top', end: 'bottom bottom', scrub: .45, invalidateOnRefresh: true } });
          opening.to('.opening-background', { scale: 1.22, yPercent: -5, duration: 1 }, 0)
            .to('.opening-foreground', { scale: 1.1, yPercent: 8, xPercent: -4, duration: 1 }, 0)
            .to('.opening-red-plane', { yPercent: 34, scaleX: 1.7, xPercent: -40, duration: .8 }, 0)
            .to('.opening-registration', { yPercent: -22, xPercent: -7, duration: 1 }, 0)
            .to('.opening-side-note', { y: -50, duration: .8 }, 0)
            .to('.opening-copy h1 .name-mask:first-child', { xPercent: -12, yPercent: -22, duration: .82 }, .06)
            .to('.opening-copy h1 .name-mask:last-child', { xPercent: 7, yPercent: -5, duration: .82 }, .1)
            .to('.opening-intro, .opening-actions', { y: -24, duration: .7 }, .05)
            .to('.opening-copy', { yPercent: -8, duration: .7 }, .1)
            .to('.opening-frame b', { scaleX: 1, duration: 1 }, 0)
            .fromTo('.opening-handoff', { yPercent: 102, y: 0 }, { yPercent: 0, duration: .36 }, .64);
        });
        gsap.utils.toArray<HTMLElement>('.featured-project').forEach((element, index) => {
          const crop = [ 'inset(12% 0 0 0)', 'inset(0 18% 0 0)', 'inset(0 0 14% 0)', 'inset(0 0 0 16%)' ][index % 4];
          const reveal = element.querySelector('.feature-reveal');
          const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: 'top 92%', end: 'top 28%', scrub: .6, invalidateOnRefresh: true } });
          timeline.fromTo(reveal, { clipPath: crop, y: index % 2 ? 55 : 28 }, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, ease: 'none' }, 0);
          timeline.fromTo(element.querySelector('.project-artwork'), { scale: 1.1, yPercent: index === 2 ? -7 : 0 }, { scale: 1, yPercent: 0, ease: 'none' }, 0);
          timeline.fromTo(element.querySelector('h3'), { x: index % 2 ? 22 : -22 }, { x: 0, ease: 'none' }, 0);
        });
        gsap.utils.toArray<HTMLElement>('.type-mask > span').forEach((element, index) => {
          gsap.fromTo(element, { yPercent: 55 + index % 2 * 15 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top 95%', end: 'top 65%', scrub: .4 } });
        });
        const aboutPhoto = wrapper.current?.querySelector('.about-photo');
        if (aboutPhoto) {
          gsap.fromTo('.about-photo img', { scale: 1.15, yPercent: -5 }, { yPercent: 5, scale: 1.03, ease: 'none', scrollTrigger: { trigger: aboutPhoto, start: 'top bottom', end: 'bottom top', scrub: .7 } });
          gsap.to('.about-photo-plane', { yPercent: 45, scaleY: 1.25, ease: 'none', scrollTrigger: { trigger: aboutPhoto, start: 'top bottom', end: 'bottom top', scrub: .7 } });
        }
        const journey = wrapper.current?.querySelector('.journey-timeline');
        if (journey) {
          gsap.fromTo('.journey-rail i', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: journey, start: 'top 65%', end: 'bottom 65%', scrub: true } });
          gsap.utils.toArray<HTMLElement>('.journey-entry').forEach(element => {
            ScrollTrigger.create({ trigger: element, start: 'top 65%', end: 'bottom top', onEnter: () => { element.dataset.active = 'true'; }, onLeaveBack: () => { element.dataset.active = 'false'; } });
            gsap.fromTo(element.querySelector('.journey-number'), { x: -10 }, { x: 0, ease: 'none', scrollTrigger: { trigger: element, start: 'top 85%', end: 'top 55%', scrub: true } });
          });
        }
        const contact = wrapper.current?.querySelector('.contact-section');
        if (contact) {
          gsap.fromTo(contact, { clipPath: 'polygon(0 3%, 100% 0, 100% 100%, 0 100%)' }, { clipPath: 'polygon(0 0%, 100% 0, 100% 100%, 0 100%)', ease: 'none', scrollTrigger: { trigger: contact, start: 'top 95%', end: 'top 35%', scrub: .4 } });
          gsap.fromTo('.contact-top h2', { x: -25 }, { x: 0, ease: 'none', scrollTrigger: { trigger: contact, start: 'top 80%', end: 'top 10%', scrub: .5 } });
        }
        const caseVisual = wrapper.current?.querySelector('.case-visual');
        if (caseVisual) {
          gsap.fromTo(caseVisual, { clipPath: 'inset(0 4% 0 4%)' }, { clipPath: 'inset(0 0% 0 0%)', ease: 'none', scrollTrigger: { trigger: caseVisual, start: 'top 85%', end: 'top 25%', scrub: .45 } });
        }
        gsap.utils.toArray<HTMLElement>('.case-section-title h2').forEach(element => {
          gsap.fromTo(element, { x: -18 }, { x: 0, ease: 'none', scrollTrigger: { trigger: element, start: 'top 94%', end: 'top 65%', scrub: .3 } });
        });
      }, wrapper);
      let refreshFrame = 0;
      const resize = new ResizeObserver(() => { cancelAnimationFrame(refreshFrame); refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh()); });
      if (wrapper.current) resize.observe(wrapper.current);
      cleanup = () => { resize.disconnect(); cancelAnimationFrame(refreshFrame); media.revert(); context.revert(); };
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    }).catch(() => { document.documentElement.dataset.motion = 'off'; });
    return () => { cancelled = true; cleanup?.(); };
  }, [paused, pathname]);

  return <MotionContext.Provider value={{ paused, reduced, toggle: () => setUserPaused(value => !value) }}><div ref={wrapper}>{children}</div></MotionContext.Provider>;
}
export const useMotionPreference = () => useContext(MotionContext);
