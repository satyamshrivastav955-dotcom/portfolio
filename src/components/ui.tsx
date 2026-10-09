import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function Mark({ className = '' }: { className?: string }) {
  return <svg className={`brand-mark ${className}`} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 1v38M1 20h38M6.6 6.6l26.8 26.8M6.6 33.4 33.4 6.6" stroke="currentColor" strokeWidth="3" /><circle cx="20" cy="20" r="7" fill="currentColor" /></svg>;
}

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label mono"><span className="section-index">{number}</span><span>{children}</span><span className="label-line" /></div>;
}

export function ActionLink({ href, children, secondary = false, external = false, down = false }: { href: string; children: ReactNode; secondary?: boolean; external?: boolean; down?: boolean }) {
  const content = <><span>{children}</span><span className="button-icon">{down ? <ArrowDown size={17} /> : <ArrowUpRight size={18} />}</span></>;
  const classes = `action-link ${secondary ? 'secondary' : ''}`;
  return external ? <a className={classes} href={href} target="_blank" rel="noopener noreferrer">{content}<span className="sr-only"> (opens in a new tab)</span></a> : <Link className={classes} href={href}>{content}</Link>;
}
