import type { Metadata } from 'next';
import { aylaLogos } from '../../public/logo/index';

const site = {
  name: 'AYLA',
  fullName: 'AYLA — Australia Young Leaders Academy',
  description:
    'Empowering the next generation of leaders through world-class Australian curriculum education in Cambodia.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ayla.edu.kh',
  image: aylaLogos.alt,
} as const;

export const rootMetadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  icons: {
    icon: aylaLogos.alt,
    shortcut: aylaLogos.light,
    apple: aylaLogos.dark,
  },
  openGraph: {
    siteName: site.name,
    title: site.fullName,
    description: site.description,
    url: site.url,
    images: [{ url: site.image, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.fullName,
    description: site.description,
    images: [site.image],
  },
  // Base URL used to resolve relative image paths for Open Graph / Twitter
  metadataBase: new URL(site.url),
};

export function generatePageMetadata({
  title,
  description = site.description,
  path = '',
  image = site.image,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = `${title} | ${site.name}`;
  const pageUrl = `${site.url}${path}`;

  return {
    title: pageTitle,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
