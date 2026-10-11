import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/content/types';
import { ActionLink } from './ui';
import { ProjectArtwork } from './project-artwork';
import { RepositoryVideo } from './repository-video';
import Link from './transition-link';

export function CaseHero({ project }: { project: Project }) {
  const recording = project.assets.find((asset) => asset.kind === 'video');
  const contexts = [...new Set(project.evidence.map((item) => item.kind))];

  return (
    <section className="case-hero container" id="top">
      <div className="case-breadcrumb mono">
        <Link href="/#work"><ArrowLeft size={14} /> ALL SYSTEMS</Link>
        <span>CASE STUDY / {project.number}</span>
      </div>
      <div className="case-hero-top">
        <span className="eyebrow">{project.category}</span>
        <span className="mono">THE PROJECT INDEX / 08</span>
      </div>
      <h1 className={project.name.length > 15 ? 'long-project-name' : ''} style={{ viewTransitionName: `title-${project.id}` }}>
        {project.name}<span>.</span>
      </h1>
      <div className="case-hero-description">
        <p>{project.tagline}</p>
        <ActionLink href={project.repository} external>Explore the repository</ActionLink>
      </div>
      <div className="case-visual" style={{ viewTransitionName: `preview-${project.id}` }}>
        <div className="project-art-meta mono">
          <span><i /> SYSTEM {project.number}</span>
          <span>{recording ? 'REPOSITORY RECORDING / MUJOCO SIMULATION' : project.subtitle.toUpperCase()}</span>
        </div>
        {recording ? (
          <RepositoryVideo asset={recording} />
        ) : <ProjectArtwork project={project} />}
        {recording && <span className="art-caption mono">REAL REPOSITORY MEDIA · SIMULATION · PLAY ON DEMAND</span>}
      </div>
      {recording && <p className="case-video-caption">{recording.caption}{recording.sourceUrl && <a href={recording.sourceUrl} target="_blank" rel="noopener noreferrer">View original source ↗</a>}</p>}
      <div className="case-stack">
        <span className="mono">BUILT WITH</span>
        <div>{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div>
      </div>
      <div className="case-summary-strip">
        <div><span className="mono">THE FOCUS</span><p>{project.subtitle}</p></div>
        <div><span className="mono">A KEY DESIGN CHOICE</span><p>{project.decisions[0]?.title}</p></div>
        <div><span className="mono">EVIDENCE CONTEXT</span><p>{contexts.map((context) => context[0].toUpperCase() + context.slice(1)).join(' / ')}</p></div>
      </div>
    </section>
  );
}
