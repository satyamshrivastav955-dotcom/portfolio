import { ArrowUpRight } from 'lucide-react';
import { editorial, profile } from '@/content/profile';
import type { TimelineEntry } from '@/content/types';
import { Mark, SectionLabel } from './ui';

export function About() {
  return <section id="about" className="about-section section-pad"><div className="container"><SectionLabel number="02">THE PERSON / THE PROCESS</SectionLabel><div className="about-layout"><div className="about-stamp" aria-hidden="true"><span className="mono">A LITTLE CONTEXT</span><div className="initials-art">S<span>S</span><Mark /></div><span className="mono">AN ENGINEER. ALWAYS A STUDENT.</span></div><div className="about-copy" data-reveal><span className="eyebrow">{editorial.about.label}</span><h2>CURIOUS BY NATURE.<br />ENGINEER BY <span>CHOICE.</span></h2><p className="about-lead">{profile.introduction}</p><p>{profile.about}</p><div className="about-signature"><span className="signature">Satyam.</span><span className="mono">{profile.name.toUpperCase()}<br />{profile.location ?? 'PERCEPTION. REASONING. REAL-WORLD SYSTEMS.'}</span></div>{profile.availability && <p className="availability">{profile.availability}</p>}</div></div><div className="manifesto"><span className="mono">A CONNECTING THREAD</span><p><span className="manifesto-line">Intelligence means more</span><br /><span className="manifesto-line">when you can explain</span><br /><span className="manifesto-line">how it works.</span><Mark /></p></div></div></section>;
}

export function Philosophy() {
  return <section className="philosophy section-pad" id="approach"><div className="container"><SectionLabel number="04">ENGINEERING PHILOSOPHY</SectionLabel><div className="philosophy-heading" data-reveal><h2>THE BUILD IS ONLY<br /><span>HALF THE STORY.</span></h2><p>{editorial.philosophy.introduction}</p></div><div className="philosophy-content"><div className="philosophy-art" aria-hidden="true"><svg className="philosophy-orbit" viewBox="0 0 400 400"><g fill="none" stroke="currentColor"><circle cx="200" cy="200" r="170" strokeOpacity=".3" /><circle cx="200" cy="200" r="140" strokeOpacity=".15" strokeDasharray="2 6" /><ellipse cx="200" cy="200" rx="170" ry="60" transform="rotate(45 200 200)" /><ellipse cx="200" cy="200" rx="170" ry="60" transform="rotate(-45 200 200)" /><circle cx="200" cy="200" r="18" fill="currentColor" /><circle cx="80" cy="80" r="7" fill="currentColor" /><circle cx="320" cy="80" r="7" fill="currentColor" /></g></svg><span className="mono">PROBLEM → SYSTEM → EVIDENCE</span></div><div className="philosophy-steps">{editorial.philosophy.steps.map((step) => <article key={step.number} data-reveal><span className="mono">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><ArrowUpRight size={20} aria-hidden="true" /></article>)}</div></div></div></section>;
}

function Timeline({ title, entries }: { title: string; entries: TimelineEntry[] }) {
  if (!entries.length) return null;
  return <section className="timeline-section container section-pad"><h2>{title}</h2><div>{entries.map((entry) => <article key={`${entry.organization}-${entry.title}`}><span className="mono">{entry.period}</span><div><h3>{entry.title}</h3><p>{entry.organization}</p><p>{entry.description}</p>{entry.link && <a href={entry.link} target="_blank" rel="noopener noreferrer">View details <ArrowUpRight size={16} /></a>}</div></article>)}</div></section>;
}

export function BackgroundSections() {
  return <><Timeline title="Experience" entries={profile.experience} /><Timeline title="Education" entries={profile.education} /><Timeline title="Selected achievements" entries={profile.achievements} /></>;
}
