import Link from 'next/link';
import HeroBanner from '@/components/public/HeroBanner';

export default function NotFound() {
  return (
    <>
      <HeroBanner imageSrc="/images/heroBannerImg.webp">
        <h1 className="text-8xl font-semibold sm:text-6xl lg:text-9xl">404</h1>
        <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Page not found</h1>
      </HeroBanner>
      <section className="bg-surface px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-body">The page you requested does not exist.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 font-semibold text-white transition hover:bg-primary-hover">Go home</Link>
        </div>
      </section>
    </>
  );
}

