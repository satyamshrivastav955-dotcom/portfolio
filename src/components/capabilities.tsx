'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { capabilities } from '@/content/profile';
import { projects } from '@/content/projects';
import { SectionLabel } from './ui';

export function Capabilities() {
  const [active, setActive] = useState<string>(capabilities[0].id);
  return <section id="capabilities" className="capabilities-section section-pad"><div className="container"><SectionLabel number="03">CAPABILITIES</SectionLabel><div className="capabilities-layout"><div className="capabilities-intro" data-reveal><h2>THE RIGHT TOOLS.<br /><span className="muted-heading">THE BIGGER PICTURE.</span></h2><p>A connected toolkit, grounded in the projects it helps bring to life.</p><div className="capability-glyph" aria-hidden="true"><div /><div /><div /><span>+</span></div><span className="mono capability-caption">CONNECTED DISCIPLINES / SHARED CURIOSITY</span></div><div className="capability-list">{capabilities.map((capability) => <div key={capability.id} className={`capability-item ${active === capability.id ? 'is-open' : ''}`}><h3><button onClick={() => setActive(active === capability.id ? '' : capability.id)} aria-expanded={active === capability.id} aria-controls={`capability-${capability.id}`}><span className="mono">{capability.number}</span>{capability.name}{active === capability.id ? <Minus size={19} /> : <Plus size={19} />}</button></h3><div className="capability-panel" id={`capability-${capability.id}`} hidden={active !== capability.id}><p>{capability.description}</p><div className="tool-tags">{capability.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><div className="capability-projects"><span className="mono">EXPLORE IN PRACTICE</span>{capability.projects.map((id) => { const project = projects.find((item) => item.id === id)!; return <Link key={id} href={`/projects/${id}/`}>{project.name}<ArrowUpRight size={14} /></Link>; })}</div></div></div>)}</div></div></div></section>;
}
