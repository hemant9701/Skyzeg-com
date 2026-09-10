import Image from 'next/image';
import Link from 'next/link';
import { pickTranslation } from '@/shared/utils/localize';

export default function BlogCard({ blog, languageCode }: { blog: any; languageCode: string }) {
  const t = pickTranslation(blog, languageCode) as any;
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Image src={blog.featuredImage || '/images/placeholder.svg'} alt={t?.title || blog.slug} width={600} height={400} className="h-48 w-full object-cover" />
      <div className="flex-1 p-2">
        {/* <small className="text-sm font-medium text-muted">{blog.author} · {blog.publishDate ? new Date(blog.publishDate).toLocaleDateString() : ''}</small> */}
        <h5 className="mt-1 text-lg font-semibold text-dark"><Link href={`/blogs/${blog.slug}`} className="transition hover:text-accent">{t?.title || blog.slug}</Link></h5>
        <p className="mt-1 text-sm leading-6 text-muted">{strip(t?.summary).slice(0, 140)}</p>
      </div>
    </div>
  );
}

function strip(value?: string) {
  return (value || '').replace(/<[^>]*>/g, ' ');
}
