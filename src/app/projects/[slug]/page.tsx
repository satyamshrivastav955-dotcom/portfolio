import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check, GitBranch } from 'lucide-react';
import { projects, getProject } from '@/content/projects';
import { profile } from '@/content/profile';
import { ActionLink } from '@/components/ui';
import { ProjectVisual } from '@/components/project-visual';
import { Architecture, ProjectInteraction } from '@/components/architecture';
import { AssetGallery } from '@/components/asset-gallery';
import { Footer } from '@/components/contact';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map((project) => ({ slug: project.id })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.subtitle}`,
    description: project.summary,
    ...(profile.siteUrl ? { alternates: { canonical: `/projects/${project.id}/` } } : {}),
    openGraph: { title: `${project.name} — ${project.subtitle}`, description: project.summary, type: 'article', ...(profile.siteUrl ? { url: `${profile.siteUrl}/projects/${project.id}/`, images: [{ url: '/og-image.png', width: 1200, height: 630 }] } : {}) },
    twitter: { card: 'summary_large_image', title: project.name, description: project.short },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <><main id="main" className="case-page" style={{ '--project-accent': project.accent } as CSSProperties}>
    <section className="case-hero container" id="top"><div className="case-breadcrumb mono"><Link href="/#work"><ArrowLeft size={14} /> ALL SYSTEMS</Link><span>CASE STUDY / {project.number}</span></div><div className="case-hero-top"><span className="eyebrow">{project.category}</span><span className="mono">THE PROJECT INDEX / 08</span></div><h1 className={project.name.length > 15 ? 'long-project-name' : ''}>{project.name}<span>.</span></h1><div className="case-hero-description"><p>{project.tagline}</p><ActionLink href={project.repository} external>Explore the repository</ActionLink></div><div className="case-visual"><div className="project-art-meta mono"><span><i /> SYSTEM {project.number}</span><span>{project.subtitle.toUpperCase()}</span></div><ProjectVisual id={project.id} /><span className="art-caption mono">ORIGINAL EXPLANATORY VISUAL · NOT AN IMPLEMENTATION SCREENSHOT</span></div><div className="case-stack"><span className="mono">BUILT WITH</span><div>{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div></div></section>
    <div className="case-body container"><aside className="case-sidebar"><span className="mono">IN THIS CASE STUDY</span><nav aria-label="Case study contents"><a href="#overview">01 / Overview</a><a href="#architecture">02 / Architecture</a><a href="#decisions">03 / Engineering decisions</a><a href="#features">04 / System capabilities</a><a href="#evidence">05 / Evidence & boundaries</a>{project.assets.length > 0 && <a href="#visual-evidence">06 / Visual record</a>}</nav><a className="case-source-link" href={project.repository} target="_blank" rel="noopener noreferrer"><GitBranch size={16} /> Source code <ArrowUpRight size={14} /></a></aside>
      <div className="case-content"><section className="case-section" id="overview"><div className="case-section-title"><span className="mono">01 / OVERVIEW</span><h2>{project.subtitle}</h2></div><p className="case-summary">{project.summary}</p>{project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{project.contribution && <div className="contribution-note"><span className="mono">COLLABORATIVE WORK / OWNERSHIP</span><p>{project.contribution}</p></div>}</section>
      <section className="case-section" id="architecture"><div className="case-section-title"><span className="mono">02 / ARCHITECTURE</span><h2>Inside the system.</h2><p>From input to outcome. Select a stage to follow the engineering story.</p></div><Architecture nodes={project.architecture} /><ProjectInteraction id={project.id} /></section>
      <section className="case-section" id="decisions"><div className="case-section-title"><span className="mono">03 / ENGINEERING DECISIONS</span><h2>The choices behind the build.</h2></div><div className="decision-list">{project.decisions.map((decision,index) => <article key={decision.title}><span className="decision-number">0{index+1}</span><div><h3>{decision.title}</h3><p>{decision.text}</p></div></article>)}</div></section>
      <section className="case-section" id="features"><div className="case-section-title"><span className="mono">04 / SYSTEM CAPABILITIES</span><h2>What the project explores.</h2></div><ul className="feature-list">{project.features.map((feature) => <li key={feature}><Check size={16} /><span>{feature}</span></li>)}</ul></section>
      <section className="case-section" id="evidence"><div className="case-section-title"><span className="mono">05 / EVIDENCE & BOUNDARIES</span><h2>The work. In context.</h2><p>Implementation, experiments, and illustrative previews are different kinds of evidence. Their scope matters.</p></div><div className="evidence-list">{project.evidence.map((evidence) => <article key={evidence.title}><span className={`evidence-kind mono kind-${evidence.kind}`}>{evidence.kind}</span><h3>{evidence.title}</h3><p>{evidence.text}</p></article>)}</div><div className="limitations"><span className="mono">LIMITATIONS & REMAINING WORK</span><p>{project.limitations}</p></div>{project.related && <a className="related-study" href={project.related.url} target="_blank" rel="noopener noreferrer"><div><span className="mono">RELATED / SEPARATE TECHNICAL MODULE</span><h3>{project.related.label}</h3><p>{project.related.description}</p></div><ArrowUpRight size={25} /></a>}<div className="case-repo-actions"><ActionLink href={project.repository} external>Inspect the source</ActionLink>{project.demo && <ActionLink href={project.demo} secondary external>Open working demo</ActionLink>}</div></section><AssetGallery assets={project.assets} /></div>
    </div><section className="next-project container"><span className="mono">CONTINUE EXPLORING / NEXT SYSTEM</span><Link href={`/projects/${next.id}/`}><div><span className="mono">{next.number} / {next.category}</span><h2>{next.name}</h2></div><ArrowUpRight /></Link></section>
  </main><Footer /></>;
}
