import { ArrowUpRight } from 'lucide-react';
import Link from './transition-link';
import { editorial, profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { editorialPhotography } from '@/content/media';
import type { TimelineEntry } from '@/content/types';
import { SectionLabel } from './ui';
import { EditorialPhoto } from './editorial-photo';
import { AssemblyStudy } from './assembly-study';

export function About() {
  return <section id="about" className="about-section section-pad"><div className="container"><SectionLabel number="03">THE PERSON BEHIND THE SYSTEMS</SectionLabel><div className="about-layout"><div className="about-copy"><h2><span className="type-mask"><span>STUDENT.</span></span><span className="type-mask"><span>BUILDER.</span></span><span className="type-mask"><span>PROBLEM SOLVER.</span></span></h2><p className="about-lead">{profile.introduction}</p><p>{profile.about}</p><div className="about-signature"><span className="mono">SATYAM SHRIVASTAV<br />{profile.location ?? 'CURIOSITY IS THE STARTING POINT.'}</span></div>{profile.availability && <p className="availability">{profile.availability}</p>}</div><figure className="about-photo"><EditorialPhoto name="architecture" /><div className="about-photo-plane" aria-hidden="true" /><span className="about-photo-label mono">FORM.<br />STRUCTURE.<br />PURPOSE.</span><figcaption><a href={editorialPhotography.architecture.sourceUrl} target="_blank" rel="noopener noreferrer">EDITORIAL PHOTOGRAPH / UNSPLASH ↗</a></figcaption></figure></div><div className="about-focus mono"><span>FOCUS AREAS</span><span>AI SYSTEMS</span><span>SECURITY & TRUST</span><span>ROBOTICS SIMULATION</span><span>EXPLAINABLE DECISIONS</span></div><AssemblyStudy /></div></section>;
}

export function Philosophy() {
  return <section className="philosophy section-pad" id="approach"><div className="container"><h2>{editorial.philosophy.heading}</h2><p>{editorial.philosophy.introduction}</p></div></section>;
}

export function Journey() {
  const milestones = ['argus', 'graphql-sentinel', 'nexus-1', 'student-intelligence'].map(id => projects.find(project => project.id === id)!);
  return <section id="journey" className="journey-section section-pad"><div className="container"><SectionLabel number="05">A JOURNEY THROUGH THE WORK</SectionLabel><div className="journey-layout"><div className="journey-heading"><h2>FOLLOW<br />THE <span>THREAD.</span></h2><p>See. Question. Build. Verify.<br />Connected ideas across the documented projects.</p><span className="mono">PROJECT MILESTONES<br />ORGANIZED BY IDEA, NOT DATE</span></div><div className="journey-timeline"><div className="journey-rail" aria-hidden="true"><i /></div>{milestones.map((project,index) => <article className="journey-entry" key={project.id}><span className="journey-marker" aria-hidden="true" /><span className="journey-number">0{index+1}</span><div><span className="mono">{project.name.toUpperCase()}</span><h3>{project.decisions[0].title}</h3><p>{project.decisions[0].text}</p><Link href={`/projects/${project.id}/`}>FOLLOW THIS STUDY <ArrowUpRight size={15} /></Link></div></article>)}</div></div></div></section>;
}

function Timeline({ title, entries }: { title: string; entries: TimelineEntry[] }) {
  if (!entries.length) return null;
  return <section className="timeline-section container section-pad"><h2>{title}</h2><div>{entries.map(entry => <article key={`${entry.organization}-${entry.title}`}><span className="mono">{entry.period}</span><div><h3>{entry.title}</h3><p>{entry.organization}</p><p>{entry.description}</p>{entry.link && <a href={entry.link} target="_blank" rel="noopener noreferrer">View details <ArrowUpRight size={16} /></a>}</div></article>)}</div></section>;
}

export function BackgroundSections() {
  return <><Timeline title="Experience" entries={profile.experience} /><Timeline title="Education" entries={profile.education} /><Timeline title="Selected achievements" entries={profile.achievements} /></>;
}
