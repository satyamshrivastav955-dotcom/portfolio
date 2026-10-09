import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!profile.siteUrl) return []; // REPLACE_ME: configure the production origin to emit real URLs.
  return [{ url: profile.siteUrl, changeFrequency: 'monthly', priority: 1 }, ...projects.map((project) => ({ url: `${profile.siteUrl}/projects/${project.id}/`, changeFrequency: 'monthly' as const, priority: 0.8 }))];
}
