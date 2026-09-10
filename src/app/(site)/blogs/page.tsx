import BlogCard from '@/components/public/BlogCard';
import HeroBanner from '@/components/public/HeroBanner';
import { buildBlogListFilter } from '@/application/services/blog-query.service';
import { getStrings } from '@/lib/ui-strings';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import { getLanguageCode } from '@/lib/language';

interface BlogsPageProps {
  searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>;
}

function getQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps = {}) {
  const languageCode = await getLanguageCode();
  const ui = getStrings(languageCode);
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});
  const uow = new UnitOfWork();
  const { filter } = await buildBlogListFilter(uow, {
    search: getQueryValue(resolvedSearchParams.search),
    category: getQueryValue(resolvedSearchParams.category),
    tag: getQueryValue(resolvedSearchParams.tag)
  });
  const blogs = await uow.blogs.list(filter, { sort: { publishDate: -1 } });
  return (
    <>
      <HeroBanner imageSrc="/images/heroBannerImg.webp">
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">{ui.blogsTitle}</h1>
        <p className="mt-3 text-base text-white/90 sm:text-lg">{ui.blogsSubtitle}</p>
      </HeroBanner>
      <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{(blogs as any[]).map((blog) => <BlogCard blog={blog} languageCode={languageCode} key={String(blog._id)} />)}</div>
        </div>
      </section>
    </>
  );
}
