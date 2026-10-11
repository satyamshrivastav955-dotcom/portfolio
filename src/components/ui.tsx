import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function Mark({ className = '' }: { className?: string }) {
  return <svg className={`brand-mark ${className}`} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M3 13V3h10m14 0h10v10m0 14v10H27m-14 0H3V27" stroke="currentColor" strokeWidth="1.3" /><path d="M28 11H12v9h16v9H12" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" /></svg>;
}

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label mono"><span className="section-index">{number}</span><span>{children}</span><span className="label-line" /></div>;
}

export function ActionLink({ href, children, secondary = false, external = false, down = false }: { href: string; children: ReactNode; secondary?: boolean; external?: boolean; down?: boolean }) {
  const content = <><span>{children}</span><span className="button-icon">{down ? <ArrowDown size={17} /> : <ArrowUpRight size={18} />}</span></>;
  const classes = `action-link ${secondary ? 'secondary' : ''}`;
  return external ? <a className={classes} href={href} target="_blank" rel="noopener noreferrer">{content}<span className="sr-only"> (opens in a new tab)</span></a> : <Link className={classes} href={href}>{content}</Link>;
}
