import { safeHtml } from '@/shared/utils/html';

export default function RichContent({ html }: { html?: string }) {
  return <div className="rich-content" dangerouslySetInnerHTML={{ __html: safeHtml(html) }} />;
}
