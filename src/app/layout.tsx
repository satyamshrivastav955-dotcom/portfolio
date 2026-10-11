import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource/bebas-neue/latin-400.css';
import './globals.css';
import './architectural.css';
import './editorial.css';
import { editorial, profile } from '@/content/profile';
import { Header } from '@/components/header';
import { MotionProvider } from '@/components/motion-provider';
import { PageTransitions } from '@/components/page-transitions';

export const metadata: Metadata = {
  title: { default: editorial.seo.title, template: '%s — Satyam Shrivastav' },
  description: editorial.seo.description,
  ...(profile.siteUrl ? { metadataBase: new URL(profile.siteUrl), alternates: { canonical: '/' } } : {}),
  openGraph: { type: 'website', locale: 'en_US', title: editorial.seo.title, description: editorial.seo.description, siteName: 'Satyam Shrivastav', ...(profile.siteUrl ? { url: profile.siteUrl, images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Satyam Shrivastav — Engineering the Unseen' }] } : {}) },
  twitter: { card: 'summary_large_image', title: editorial.seo.title, description: editorial.seo.description, ...(profile.siteUrl ? { images: ['/og-image.png'] } : {}) },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#101110', colorScheme: 'dark' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><MotionProvider><div className="scroll-progress" aria-hidden="true" /><PageTransitions><Header />{children}</PageTransitions></MotionProvider></body></html>;
}
