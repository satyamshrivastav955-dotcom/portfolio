'use client';

import { useState, type CSSProperties } from 'react';
import Link from './transition-link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';
import { ProjectArtwork } from './project-artwork';
import { SectionLabel } from './ui';
import { useMotionPreference } from './motion-provider';

const filters = ['All systems', 'Perception & AI', 'Security systems', 'Software & trust'] as const;
const featuredIds = ['argus', 'callshield', 'nexus-1', 'graphql-sentinel'];

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const { paused } = useMotionPreference();
  return <article className={`featured-project feature-${project.id}`} style={{ '--project-accent': project.accent } as CSSProperties}>
    <div className="feature-kicker mono"><span>0{index + 1} / SELECTED STUDY</span><span>{project.category.split(' · ')[0]}</span></div>
    <div className="feature-reveal"><Link href={`/projects/${project.id}/`} className="project-art-link" style={{ viewTransitionName: `preview-${project.id}` }} onPointerMove={event => {
      if (paused || event.pointerType !== 'mouse') return;
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - (event.clientY - bounds.top) / bounds.height) * 3}deg`);
      event.currentTarget.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 3}deg`);
    }} onPointerLeave={event => { event.currentTarget.style.setProperty('--tilt-x', '0deg'); event.currentTarget.style.setProperty('--tilt-y', '0deg'); }}>
      <span className="sr-only">Explore {project.name}: {project.subtitle}</span><ProjectArtwork project={project} /><span className="project-open"><ArrowUpRight size={27} /></span>
    </Link></div>
    <div className="featured-description"><div><h3 style={{ viewTransitionName: `title-${project.id}` }}><Link href={`/projects/${project.id}/`}>{project.name}<ArrowUpRight size={28} /></Link></h3><p>{project.short}</p></div></div>
    <div className="feature-footer"><span>{project.subtitle}</span><a href={project.repository} target="_blank" rel="noopener noreferrer">REPOSITORY <ArrowUpRight size={13} /><span className="sr-only"> for {project.name} (opens in a new tab)</span></a></div>
  </article>;
}

export function ProjectGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All systems');
  const visible = filter === 'All systems' ? projects : projects.filter(project => project.group === filter);
  return <section id="work" className="work-section section-pad" aria-labelledby="work-title">
    <div className="container"><SectionLabel number="02">SELECTED WORK / ENGINEERING IN PRACTICE</SectionLabel>
      <div className="section-heading"><h2 id="work-title"><span className="type-mask"><span>IDEAS BECOME</span></span><span className="type-mask"><span>SYSTEMS<span className="red-period">.</span></span></span></h2><div className="section-heading-aside"><span className="mono">FOUR SELECTED / EIGHT EXPLORED</span><p>From the things machines see to the decisions they make. A collection of engineering investigations.</p><a className="index-jump" href="#project-index">VIEW ALL PROJECTS <ArrowDown size={18} /></a></div></div>
      <div className="featured-grid">{featuredIds.map((id,index) => <FeaturedProject key={id} project={projects.find(project => project.id === id)!} index={index} />)}</div>
      <div className="project-archive" id="project-index"><div className="archive-heading"><h3>THE COMPLETE INDEX<span> / 08</span></h3><span className="mono">EVERY SYSTEM. EVERY STORY.</span></div>
        <div className="project-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}<sup>{item === 'All systems' ? '08' : `0${projects.filter(project => project.group === item).length}`}</sup></button>)}</div>
        <p className="sr-only" role="status">Showing {visible.length} projects{filter !== 'All systems' && ` in ${filter}`}.</p>
        <div className="archive-list">{visible.map(project => <Link href={`/projects/${project.id}/`} className="archive-project" key={project.id}><span className="archive-number">{project.number}</span><div className="archive-info"><h3>{project.name}</h3><p>{project.subtitle}</p></div><span className="archive-category mono">{project.category.split(' · ')[0]}</span><span className="archive-arrow"><ArrowUpRight size={26} /></span></Link>)}</div>
      </div>
      <div className="work-footnote mono"><span>COMPLEXITY, MADE LEGIBLE.</span><span>OPEN THE CASE STUDY. FOLLOW THE EVIDENCE.</span></div>
    </div>
  </section>;
}
