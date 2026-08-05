import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { UnitOfWork } from '@/infrastructure/repositories/unit-of-work';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await new UnitOfWork().siteSettings.findOne({ key: 'main' });
  const siteName = settings?.siteName || 'Skyzeg Travels';
  const favicon = settings?.faviconUrl || '/icon.svg';

  return {
    title: { default: siteName, template: `%s | ${siteName}` },
    description: 'Travel and tour management system powered by Next.js and MongoDB.',
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={plusJakartaSans.variable}><body>{children}</body></html>;
}
