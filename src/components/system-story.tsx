'use client';

import { useEffect, useRef, useState, useId } from 'react';
import type { Project } from '@/content/types';
import { systemDiagrams } from '@/content/storytelling';
import { useMotionPreference } from './motion-provider';

function Diagram({ project, active }: { project: Project; active: number }) {
  const diagram = systemDiagrams[project.id];
  const uid = useId().replaceAll(':', '');
  return <svg className={`system-diagram diagram-${project.id}`} viewBox="0 0 380 400" role="img" aria-label={`${project.name} explanatory architecture. ${diagram.caption}`}>
    <defs><marker id={uid} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="currentColor" /></marker></defs>
    <g className="diagram-grid" stroke="currentColor" opacity=".08">{[40,100,160,220,280,340].map(x => <path key={x} d={`M${x} 15v365M20 ${x}h340`} />)}</g>
    {diagram.edges.map((edge,index) => {
      const from = diagram.nodes[edge.from], to = diagram.nodes[edge.to];
      const backwards = to.y < from.y;
      const path = backwards ? `M${from.x+76} ${from.y}H350V${to.y}H${to.x+76}` : `M${from.x} ${from.y+22}V${(from.y+to.y)/2}H${to.x}V${to.y-24}`;
      return <g key={index} className="diagram-edge" data-reached={edge.stage <= active}><path d={path} className="diagram-edge-base" /><path d={path} pathLength="1" className="diagram-edge-draw" markerEnd={`url(#${uid})`} />{edge.label && <text x={backwards ? 342 : 294} y={backwards ? (from.y+to.y)/2 : 77} textAnchor="end" className="diagram-edge-label">{edge.label}</text>}</g>;
    })}
    {diagram.nodes.map((node,index) => <g key={node.label} className="diagram-node" data-reached={node.stage <= active} data-current={node.stage === active}><rect x={node.x-75} y={node.y-21} width="150" height="42" /><text x={node.x} y={node.y+4} textAnchor="middle">{node.label}</text><circle cx={node.x-64} cy={node.y-12} r="2" /><text className="diagram-node-index" x={node.x+65} y={node.y-11} textAnchor="end">{String(index+1).padStart(2,'0')}</text></g>)}
  </svg>;
}

export function SystemStory({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const { paused } = useMotionPreference();
  const nodes = project.architecture;
  useEffect(() => {
    if (paused || manual) return;
    let cancelled = false;
    let clean: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const steps = [...root.current.querySelectorAll<HTMLElement>('.story-step')];
      const triggers = steps.map((step,index) => ScrollTrigger.create({ trigger: step, start: 'top 58%', end: 'bottom 58%', onEnter: () => setActive(index), onEnterBack: () => setActive(index) }));
      const current = steps.findIndex(step => { const rect = step.getBoundingClientRect(); return rect.top <= innerHeight*.58 && rect.bottom > innerHeight*.58; });
      if (current >= 0) setActive(current);
      clean = () => triggers.forEach(trigger => trigger.kill());
    });
    return () => { cancelled = true; clean?.(); };
  }, [paused, manual, project.id]);

  return <div className={`system-story story-${project.id}`} ref={root} data-active={active}>
    <div className="story-visual"><div className="story-visual-meta mono"><span>{project.name.toUpperCase()}</span><span>PATH 0{active+1} / 0{nodes.length}</span></div><Diagram project={project} active={active} /><p className="story-diagram-caption">{systemDiagrams[project.id].caption}</p>
      <div className="architecture-nodes" role="group" aria-label="Architecture stages">{nodes.map((node,index) => <button key={node.name} aria-pressed={active === index} aria-controls="architecture-detail" onClick={() => { setManual(true); setActive(index); }}><span>0{index+1}</span>{node.name}</button>)}</div>
      <div className="architecture-detail" id="architecture-detail" aria-live={manual ? 'polite' : 'off'}><span className="mono">0{active+1} / {nodes[active].name.toUpperCase()}</span><p>{nodes[active].detail}</p></div>
      {!paused && <button className="story-follow" onClick={() => setManual(!manual)} aria-pressed={!manual}>{manual ? 'RESUME SCROLL STORY' : 'SCROLL STORY ON · SELECT TO PAUSE'}</button>}
      <p className="architecture-caption mono">EXPLANATORY ARCHITECTURE / NO LIVE TELEMETRY</p>
    </div>
    <div className="story-reading">{nodes.map((node,index) => <article className="story-step" data-current={active === index} key={node.name}><span className="story-step-number">0{index+1}</span><h3>{node.name}</h3><p>{node.detail}</p></article>)}</div>
  </div>;
}
