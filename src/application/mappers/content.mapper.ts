import { pickTranslation } from '@/shared/utils/localize';

export function mapContentCard(item: any, languageCode = 'en-US') {
  const translation = pickTranslation(item, languageCode) as any;
  return {
    id: String(item._id),
    slug: item.slug,
    title: translation?.title || item.slug,
    summary: translation?.summary || translation?.overview || translation?.description || '',
    image: item.heroImage || item.featuredImage || item.image || '/images/placeholder.svg',
    metaTitle: translation?.metaTitle,
    metaDescription: translation?.metaDescription
  };
}

export function mapTripCard(item: any, languageCode = 'en-US') {
  const translation = pickTranslation(item, languageCode) as any;
  return {
    id: String(item._id),
    slug: item.slug,
    title: translation?.title || item.slug,
    summary: translation?.summary || '',
    image: item.heroImage || '/images/placeholder.svg',
    durationDays: item.durationDays,
    durationNights: item.durationNights,
    price: item.price,
    discountPrice: item.discountPrice,
    currency: item.currency || 'USD'
  };
}

export function mapBlogCard(item: any, languageCode = 'en-US') {
  const translation = pickTranslation(item, languageCode) as any;
  return {
    id: String(item._id),
    slug: item.slug,
    title: translation?.title || item.slug,
    summary: translation?.summary || '',
    image: item.featuredImage || '/images/placeholder.svg',
    author: item.author,
    publishDate: item.publishDate
  };
}
