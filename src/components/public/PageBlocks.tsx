import RichContent from './RichContent';
import { pickTranslation, type TranslationLike } from '@/shared/utils/localize';

interface PageBlock {
  _id?: unknown;
  type: string;
  sortOrder?: number;
  settings?: Record<string, unknown>;
  translations?: (TranslationLike & { title?: string; body?: string })[];
}

function safeUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const url = value.trim();
  return /^(https?:\/\/|\/(?!\/)|#)/i.test(url) ? url : undefined;
}

function videoEmbed(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    if (['youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com'].includes(host)) {
      const id = host === 'youtu.be' ? parsed.pathname.slice(1) : parsed.searchParams.get('v') || parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1];
      if (id && /^[\w-]+$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = parsed.pathname.match(/\/(\d+)\/?$/)?.[1];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch { /* Relative URLs are local video files. */ }
}

function BlockImage({ src, alt }: { src: string; alt: string }) {
  // CMS media may use arbitrary external hosts; render the original URL.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" className="h-auto w-full rounded-xl object-cover" />;
}

export default function PageBlocks({ blocks, languageCode }: { blocks?: PageBlock[]; languageCode: string }) {
  return <div className="space-y-10">{[...(blocks || [])]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((block, index) => {
      const translation = pickTranslation(block, languageCode);
      const settings = block.settings || {};
      const title = translation?.title;
      const body = translation?.body;
      const key = String(block._id || index);
      const image = safeUrl(settings.imageUrl ?? settings.image ?? settings.url ?? settings.src);
      const heading = title && <h2 className="font-heading text-3xl">{title}</h2>;
      const text = body && <RichContent html={body} />;
      const caption = (title || body) && <div className="space-y-4 text-dark">{heading}{text}</div>;

      switch (block.type) {
        case 'hero':
          if (!title && !body && !image) return null;
          return <section key={key} className="relative isolate overflow-hidden rounded-2xl bg-dark text-white">
            {image && <div className="absolute inset-0 -z-20 [&_img]:h-full [&_img]:rounded-none"><BlockImage src={image} alt="" /></div>}
            <div className="absolute inset-0 -z-10 bg-dark/60" aria-hidden="true" />
            <div className="flex min-h-80 flex-col justify-center gap-4 p-8 sm:p-12">{heading}{text}</div>
          </section>;
        case 'image':
          if (!image && !caption) return null;
          return <figure key={key} className="space-y-4">{image && <BlockImage src={image} alt={String(settings.altText || title || '')} />}{caption && <figcaption>{caption}</figcaption>}</figure>;
        case 'video': {
          const video = safeUrl(settings.videoUrl ?? settings.url ?? settings.src);
          if (!video && !caption) return null;
          const embed = video && videoEmbed(video);
          return <section key={key} className="space-y-4">{caption}{embed
            ? <iframe src={embed} title={title || 'Video'} loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="aspect-video w-full rounded-xl border-0" />
            : video && <video controls preload="metadata" src={video} className="w-full rounded-xl" />}</section>;
        }
        case 'cta': {
          const link = safeUrl(settings.buttonUrl ?? settings.url ?? settings.href);
          if (!caption && !link) return null;
          return <section key={key} className="space-y-6 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">{caption}{link && <a href={link} className="inline-flex rounded-full bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover">{String(settings.buttonText || settings.label || title || link)}</a>}</section>;
        }
        case 'gallery': {
          const images = (Array.isArray(settings.images) ? settings.images : String(settings.images || '').split(/[\n,]/))
            .map(safeUrl).filter((url): url is string => Boolean(url));
          if (!caption && !images.length) return null;
          return <section key={key} className="space-y-4">{caption}<div className="grid gap-4 sm:grid-cols-2">{images.map((url, i) => <BlockImage key={i} src={url} alt={String(settings.altText || title || '')} />)}</div></section>;
        }
        case 'faq':
          if (!title && !body) return null;
          return title ? <details key={key} className="rounded-xl border border-line-strong p-5"><summary className="cursor-pointer font-semibold text-dark">{title}</summary><div className="mt-4">{text}</div></details> : <section key={key}>{text}</section>;
        case 'richText':
        default:
          return caption ? <section key={key}>{caption}</section> : null;
      }
    })}</div>;
}
