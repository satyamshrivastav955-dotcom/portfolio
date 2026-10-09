export type ProjectId = 'argus' | 'callshield' | 'graphql-sentinel' | 'hybrid-ai-nids' | 'nexus-1' | 'face-blockchain' | 'taskorbit' | 'student-intelligence';
export type ProjectGroup = 'Perception & AI' | 'Security systems' | 'Software & trust';
export type EvidenceKind = 'implementation' | 'experiment' | 'simulation' | 'roadmap';

export interface ArchitectureNode {
  name: string;
  detail: string;
}

export interface ProjectAsset {
  src: string;
  alt: string;
  caption: string;
  kind: 'screenshot' | 'video' | 'diagram';
  width: number;
  height: number;
  sourceUrl?: string;
  poster?: string;
}

export interface Project {
  id: ProjectId;
  number: string;
  name: string;
  subtitle: string;
  category: string;
  group: ProjectGroup;
  tagline: string;
  short: string;
  summary: string;
  overview: string[];
  stack: string[];
  features: string[];
  architecture: ArchitectureNode[];
  decisions: { title: string; text: string }[];
  evidence: { kind: EvidenceKind; title: string; text: string }[];
  limitations: string;
  contribution?: string;
  repository: string;
  related?: { label: string; url: string; description: string };
  demo?: string;
  assets: ProjectAsset[];
  accent: string;
}

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  description: string;
  link?: string;
}

export interface Profile {
  name: string;
  initials: string;
  headline: string;
  introduction: string;
  about: string;
  email: string | null;
  location: string | null;
  availability: string | null;
  resume: string | null;
  siteUrl: string | null;
  links: { label: string; url: string }[];
  experience: TimelineEntry[];
  education: TimelineEntry[];
  achievements: TimelineEntry[];
}
