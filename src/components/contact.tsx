'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import { editorial, profile } from '@/content/profile';
import { ActionLink, Mark, SectionLabel } from './ui';

export function Contact() {
  const [feedback, setFeedback] = useState('');
  const contactValue = profile.email ?? profile.links[0].url;
  const contactLabel = profile.email ?? 'github.com / satyamshrivastav955-dotcom';
  const copy = async () => {
    try { await navigator.clipboard.writeText(contactValue); setFeedback('Copied to clipboard.'); }
    catch { setFeedback(`Copy unavailable. Select this address: ${contactValue}`); }
  };
  return <section id="contact" className="contact-section section-pad">
    <div className="container">
      <SectionLabel number="05">NEXT CONNECTION</SectionLabel>
      <div className="contact-top" data-reveal>
        <div><p className="eyebrow">IDEAS ARE BETTER WHEN THEY CONNECT.</p><h2>LET’S BUILD<br /><span>SOMETHING</span><br />MEANINGFUL<span className="contact-dot">.</span></h2></div>
        <div className="contact-aside">
          <Mark className="contact-mark" /><p>{editorial.contact.heading}</p><span>{editorial.contact.text}</span>
          <ActionLink href={profile.email ? `mailto:${profile.email}` : profile.links[0].url} external={!profile.email}>{profile.email ? 'Start a conversation' : 'Connect on GitHub'}</ActionLink>
        </div>
      </div>
      <div className="contact-links">
        <div className="contact-copy">
          <span className="mono">{profile.email ? 'DIRECT LINE' : 'FIND ME ON THE INTERNET'}</span>
          <button onClick={copy} className="copy-button" aria-label={`${profile.email ? 'Copy email address' : 'Copy GitHub profile URL'}: ${contactLabel}`}>
            <span>{contactLabel}</span>{feedback.startsWith('Copied') ? <Check size={17} /> : <Copy size={17} />}
          </button>
          <p className="copy-feedback" role="status">{feedback}</p>
        </div>
        <div className="social-links">
          {profile.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={17} /><span className="sr-only"> (opens in a new tab)</span></a>)}
          {profile.resume && <a href={profile.resume} target="_blank" rel="noopener noreferrer">Résumé<ArrowUpRight size={17} /></a>}
        </div>
      </div>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="site-footer container"><Link href="/#top" className="footer-brand"><Mark /><span>{profile.name.toUpperCase()}</span></Link><span className="mono">© {new Date().getFullYear()} · BUILT WITH INTENT.</span><a href="#main" className="back-top mono">BACK TO TOP <ArrowUp size={15} /></a></footer>;
}
