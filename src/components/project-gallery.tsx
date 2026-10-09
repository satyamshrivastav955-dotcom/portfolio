'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';
import { ProjectVisual } from './project-visual';
import { SectionLabel } from './ui';
import { useMotionPreference } from './motion-provider';

const filters = ['All systems', 'Perception & AI', 'Security systems', 'Software & trust'] as const;

function FeaturedProject({ project, large = false }: { project: Project; large?: boolean }) {
  const { paused } = useMotionPreference();
  return <article className={`featured-project ${large ? 'featured-large' : ''}`} style={{ '--project-accent': project.accent } as CSSProperties}>
    <Link href={`/projects/${project.id}/`} className="project-art-link" onPointerMove={(event) => {
      if (paused || event.pointerType !== 'mouse') return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      event.currentTarget.style.setProperty('--tilt-x', `${(0.5-y)*5}deg`);
      event.currentTarget.style.setProperty('--tilt-y', `${(x-0.5)*5}deg`);
      event.currentTarget.style.setProperty('--light-x', `${x*100}%`);
      event.currentTarget.style.setProperty('--light-y', `${y*100}%`);
    }} onPointerLeave={(event) => { event.currentTarget.style.setProperty('--tilt-x', '0deg'); event.currentTarget.style.setProperty('--tilt-y', '0deg'); }}><span className="sr-only">Explore {project.name}: {project.subtitle}. </span><div className="project-art-meta mono"><span><i /> SYSTEM {project.number}</span><span>{large ? 'PERCEPTION / REASONING / ACTION' : project.category.split(' · ')[0]}</span></div><ProjectVisual id={project.id} /><span className="art-caption mono">CONCEPTUAL SYSTEM VISUAL</span><span className="project-open"><ArrowUpRight size={26} /></span></Link>
    <div className="featured-description"><div><span className="mono project-category">{project.category}</span><h3><Link href={`/projects/${project.id}/`}>{project.name}<ArrowUpRight size={large ? 32 : 25} /></Link></h3><p>{project.short}</p></div><div className="featured-stack">{project.stack.slice(0, large ? 4 : 3).map((technology) => <span key={technology}>{technology}</span>)}</div></div>
  </article>;
}

export function ProjectGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All systems');
  const visible = filter === 'All systems' ? projects : projects.filter((project) => project.group === filter);
  const featured = filter === 'All systems' ? ['argus', 'callshield', 'nexus-1'].map((id) => projects.find((project) => project.id === id)!) : visible.slice(0, 3);
  const rest = visible.filter((project) => !featured.includes(project));

  return <section id="work" className="work-section section-pad" aria-labelledby="work-title">
    <div className="container"><SectionLabel number="01">SELECTED WORK</SectionLabel>
      <div className="section-heading" data-reveal><h2 id="work-title">COMPLEX PROBLEMS.<br /><span className="muted-heading">CONSIDERED SYSTEMS.</span></h2><div className="section-heading-aside"><span className="mono">THE PROJECT INDEX / 08</span><p>Eight investigations at the intersection of intelligence, security, and software.</p></div></div>
      <div className="project-filters" role="group" aria-label="Filter projects">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}<sup>{item === 'All systems' ? '08' : `0${projects.filter((project) => project.group === item).length}`}</sup></button>)}</div>
      <p className="sr-only" role="status">Showing {visible.length} projects{filter !== 'All systems' && ` in ${filter}`}.</p>
      <div className="featured-grid" key={filter}>{featured.map((project, index) => <FeaturedProject key={project.id} project={project} large={index === 0} />)}</div>
      {!!rest.length && <div className="project-archive"><div className="archive-heading mono"><span>CONTINUE THE EXPLORATION</span><span>MORE SYSTEMS BELOW <Plus size={13} /></span></div>{rest.map((project) => <Link href={`/projects/${project.id}/`} className="archive-project" key={project.id} style={{ '--project-accent': project.accent } as CSSProperties}><span className="archive-number mono">{project.number}</span><div className="archive-art"><ProjectVisual id={project.id} /></div><div className="archive-info"><h3>{project.name}</h3><p>{project.subtitle}</p></div><span className="archive-category mono">{project.category.split(' · ')[0]}</span><span className="archive-arrow"><ArrowUpRight size={24} /></span></Link>)}</div>}
      <div className="work-footnote mono"><span>BUILT TO BE UNDERSTOOD. NOT JUST SEEN.</span><span>PREVIEWS ARE ORIGINAL EXPLANATORY VISUALS.</span></div>
    </div>
  </section>;
}
