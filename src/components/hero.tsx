import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';
import { ActionLink } from './ui';
import { EditorialPhoto } from './editorial-photo';

export function Hero() {
  return <section className="opening-scene" id="top" aria-labelledby="hero-title">
    <div className="opening-stage">
      <div className="opening-image" aria-hidden="true">
        <EditorialPhoto name="concrete" className="opening-background" priority />
        <div className="opening-red-plane" />
        <EditorialPhoto name="concrete" className="opening-foreground" priority />
        <div className="opening-image-shade" />
        <div className="opening-registration"><span>+</span><span>+</span><span>+</span><span>+</span></div>
      </div>
      <div className="opening-topline mono"><span>[ 01 — THE OPENING ]</span><span>AN INDEPENDENT ENGINEERING PORTFOLIO</span></div>
      <div className="opening-copy">
        <p className="opening-statement">ENGINEERING<br />THE UNSEEN<span>.</span></p>
        <h1 id="hero-title" aria-label={profile.name}><span className="name-mask"><span>SATYAM</span></span><span className="name-mask"><span>SHRIVASTAV</span></span></h1>
        <p className="opening-intro">{profile.introduction}</p>
        <div className="opening-actions"><ActionLink href="#work" down>EXPLORE WORK</ActionLink><a className="text-link" href={profile.links[0].url} target="_blank" rel="noopener noreferrer">VIEW GITHUB <ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a></div>
      </div>
      <div className="opening-side-note mono"><span>PERCEPTION</span><span>REASONING</span><span>EXECUTION</span><i /><span>SYSTEMS THAT<br />MAKE SENSE.</span></div>
      <div className="opening-bottom mono"><span>STUDENT / BUILDER / PROBLEM SOLVER</span><a href="#work">SCROLL TO EXPLORE <ArrowDown size={16} /></a><span className="opening-frame">01 <i><b /></i> 02</span></div>
      <div className="opening-handoff" aria-hidden="true"><span className="mono">02 / FROM IDEAS TO SYSTEMS</span><strong>THE WORK<span>↘</span></strong></div>
    </div>
  </section>;
}
