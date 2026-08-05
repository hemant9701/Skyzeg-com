import Link from 'next/link';

export default function NotFound() {
  return <section className="px-4 py-20 text-center sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl"><h1 className="text-[2.75rem] font-bold text-[#1C398E]">Page not found</h1><p className="mt-3 text-[#334155]">The page you requested does not exist.</p><Link href="/" className="mt-6 inline-flex rounded-full bg-[#1C398E] px-5 py-2.5 font-semibold text-white transition hover:bg-[#152d73]">Go home</Link></div></section>;
}
