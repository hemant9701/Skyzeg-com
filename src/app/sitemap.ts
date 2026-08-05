import type { MetadataRoute } from 'next';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const uow = new UnitOfWork();
  const [pages, blogs, destinations, trips] = await Promise.all([
    uow.pages.list({ isVisible: true }),
    uow.blogs.list({ status: 'published' }),
    uow.destinations.list({ isVisible: true }),
    uow.trips.list({ isVisible: true })
  ]);

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/destinations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/trips`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...pages.map((page: any) => ({ url: `${baseUrl}/pages/${page.slug}`, lastModified: page.updatedAt || page.createdAt, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...blogs.map((blog: any) => ({ url: `${baseUrl}/blogs/${blog.slug}`, lastModified: blog.updatedAt || blog.publishDate, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...destinations.map((destination: any) => ({ url: `${baseUrl}/destinations/${destination.slug}`, lastModified: destination.updatedAt || destination.createdAt, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...trips.map((trip: any) => ({ url: `${baseUrl}/trips/${trip.slug}`, lastModified: trip.updatedAt || trip.createdAt, changeFrequency: 'weekly' as const, priority: 0.8 }))
  ];
}
