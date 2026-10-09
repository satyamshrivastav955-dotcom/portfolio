'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Command, Menu, Pause, Play, Search, X } from 'lucide-react';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { Mark } from './ui';
import { useMotionPreference } from './motion-provider';

const sections = [{ id: 'work', label: 'Selected work' }, { id: 'about', label: 'About' }, { id: 'capabilities', label: 'Capabilities' }, { id: 'contact', label: 'Contact' }];
const commands = [
  ...sections.map((section) => ({ title: section.label, meta: 'SECTION', href: `/#${section.id}` })),
  ...projects.map((project) => ({ title: project.name, meta: project.subtitle, href: `/projects/${project.id}/` })),
  ...profile.links.map((link) => ({ title: link.label, meta: 'PROFILE ↗', href: link.url })),
  ...(profile.resume ? [{ title: 'Résumé', meta: 'DOCUMENT ↗', href: profile.resume }] : []),
];

export function Header() {
  const { paused, reduced, toggle } = useMotionPreference();
  const [active, setActive] = useState('');
  const [dialog, setDialog] = useState<'menu' | 'search' | null>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const results = commands.filter((command) => `${command.title} ${command.meta}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const keydown = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setQuery(''); setSelected(0);
        setDialog((value) => value === 'search' ? null : 'search');
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    if (dialog) {
      node.showModal();
      const overflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      if (dialog === 'search') inputRef.current?.focus();
      return () => { node.close(); document.body.style.overflow = overflow; };
    }
  }, [dialog]);

  useEffect(() => {
    if (dialog === 'search') document.getElementById(`command-${selected}`)?.scrollIntoView({ block: 'nearest' });
  }, [selected, dialog]);

  useEffect(() => {
    if (pathname !== '/') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -55% 0px' });
    sections.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [pathname]);

  const openSearch = () => { setQuery(''); setSelected(0); setDialog('search'); };
  const navigate = (href: string) => {
    setDialog(null);
    if (href.startsWith('https://')) window.open(href, '_blank', 'noopener,noreferrer');
    else router.push(href);
  };
  const searchKeys = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setSelected((index) => results.length ? (index + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length : 0);
    } else if (event.key === 'Enter' && results[selected]) { event.preventDefault(); navigate(results[selected].href); }
  };

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label={`${profile.name}, home`}><Mark /><span>SATYAM<span className="wordmark-dot">.</span><small>SHRIVASTAV</small></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{sections.map((section) => <Link href={`/#${section.id}`} key={section.id} aria-current={pathname === '/' && active === section.id ? 'location' : undefined}>{section.label}{section.id === 'work' && <sup>08</sup>}</Link>)}</nav>
      <div className="header-tools">
        {reduced ? <span className="reduced-label mono">LOW MOTION</span> : <button className="icon-button motion-button" onClick={toggle} aria-label={paused ? 'Enable animations' : 'Pause animations'} title={paused ? 'Enable animations' : 'Pause animations'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}
        <button className="search-trigger" onClick={openSearch} aria-label="Open command palette"><Command size={15} /><span>K</span></button>
        <button className="icon-button mobile-trigger" onClick={() => setDialog('menu')} aria-label="Open navigation menu"><Menu size={23} /></button>
      </div>
    </header>
    <dialog ref={dialogRef} className={`site-dialog ${dialog === 'menu' ? 'menu-dialog' : 'command-dialog'}`} aria-labelledby="dialog-title" onCancel={() => setDialog(null)} onClick={(event) => { if (event.target === event.currentTarget) setDialog(null); }}>
      <div className="dialog-surface">
        <div className="dialog-heading"><span id="dialog-title" className="mono">{dialog === 'menu' ? 'EXPLORE THE PORTFOLIO' : 'QUICK NAVIGATION'}</span><button className="icon-button" onClick={() => setDialog(null)} aria-label="Close dialog"><X size={21} /></button></div>
        {dialog === 'menu' ? <nav aria-label="Mobile navigation">{sections.map((section, index) => <Link href={`/#${section.id}`} onClick={() => setDialog(null)} key={section.id}><span className="mono">0{index + 1}</span>{section.label}<ArrowUpRight /></Link>)}<button className="menu-search" onClick={openSearch}><Search size={18} /> Search projects <kbd>⌘ K</kbd></button></nav> : <>
          <div className="command-input"><Search size={20} /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} onKeyDown={searchKeys} placeholder="Find a project, section, or link…" role="combobox" aria-label="Search portfolio" aria-expanded="true" aria-controls="command-results" aria-autocomplete="list" aria-activedescendant={results[selected] ? `command-${selected}` : undefined} autoComplete="off" /></div>
          <div className="command-results" id="command-results" role="listbox" aria-label="Navigation results">{results.length ? results.map((command, index) => <button key={command.href} id={`command-${index}`} role="option" aria-selected={index === selected} className={index === selected ? 'is-selected' : ''} onMouseMove={() => setSelected(index)} onClick={() => navigate(command.href)} tabIndex={-1}><span>{command.title}<small>{command.meta}</small></span><ArrowUpRight size={18} /></button>) : <p className="empty-results">No matches. Try “ARGUS”, “robot”, or “contact”.</p>}</div>
          <div className="command-footer mono"><span>↑ ↓ TO NAVIGATE</span><span>↵ TO OPEN</span><span>ESC TO CLOSE</span></div>
        </>}
      </div>
    </dialog>
  </>;
}
