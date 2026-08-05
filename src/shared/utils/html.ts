import sanitizeHtml from 'sanitize-html';

export function safeHtml(input?: string | null): string {
  if (!input) return '';
  return sanitizeHtml(input, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'iframe', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'figure', 'figcaption', 'video', 'source'
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'style', 'id'],
      a: ['href', 'name', 'target', 'rel', 'class'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class'],
      iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'title'],
      video: ['src', 'controls', 'poster', 'width', 'height'],
      source: ['src', 'type']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel', 'data']
  });
}

export function readingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
