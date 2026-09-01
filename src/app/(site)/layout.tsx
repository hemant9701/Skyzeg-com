import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import NewsletterSection from '@/components/public/NewsletterSection';
import { organizationSchema } from '@/shared/seo/metadata';

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return (
    <>
      <Header />
      <main className="site-main">{children}</main>
      <NewsletterSection />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(baseUrl, '/images/logo.svg')) }}
      />
    </>
  );
}
