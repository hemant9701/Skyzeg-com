import type { Metadata } from 'next';

export interface SeoInput {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  image?: string;
}

export function buildMetadata(input: SeoInput): Metadata {
  const title = input.title || 'Travel & Tour Management System';
  const description = input.description || 'Explore curated tours, destinations and travel stories.';

  return {
    title,
    description,
    alternates: input.canonicalUrl ? { canonical: input.canonicalUrl } : undefined,
    openGraph: {
      title,
      description,
      images: input.image ? [{ url: input.image }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: input.image ? [input.image] : undefined
    }
  };
}

export function organizationSchema(baseUrl: string, logoUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'TravelNextMongo',
    url: baseUrl,
    logo: logoUrl ? `${baseUrl}${logoUrl}` : undefined
  };
}
