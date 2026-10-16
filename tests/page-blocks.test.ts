import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PageBlocks from '../src/components/public/PageBlocks';

function render(type: string, settings: Record<string, unknown> = {}) {
  return renderToStaticMarkup(createElement(PageBlocks, { languageCode: 'fr-FR', blocks: [{ type, settings, translations: [
    { languageCode: 'en-US', title: 'English', body: '<p>English body</p>' },
    { languageCode: 'fr-FR', title: 'French', body: '<p>French body</p><script>alert(1)</script>' }
  ] }] }));
}

test('hero uses a background image while image blocks use a figure', () => {
  assert.match(render('hero', { imageUrl: '/hero.jpg' }), /min-h-80/);
  assert.match(render('hero', { imageUrl: '/hero.jpg' }), /src="\/hero.jpg"/);
  assert.match(render('image', { imageUrl: '/photo.jpg' }), /<figure/);
  assert.match(render('image', { imageUrl: '/photo.jpg' }), /<figcaption/);
});

test('video blocks embed YouTube and Vimeo links and play local files', () => {
  assert.match(render('video', { videoUrl: 'https://www.youtube.com/watch?v=abc123' }), /<iframe[^>]+src="https:\/\/www.youtube-nocookie.com\/embed\/abc123"/);
  assert.match(render('video', { videoUrl: 'https://vimeo.com/12345' }), /player.vimeo.com\/video\/12345/);
  assert.match(render('video', { videoUrl: '/uploads/video.mp4' }), /<video[^>]+src="\/uploads\/video.mp4"/);
});

test('CTA settings produce a button and unsafe links are ignored', () => {
  assert.match(render('cta', { buttonUrl: '/contact', buttonText: 'Contact us' }), /href="\/contact"[^>]*>Contact us<\/a>/);
  assert.doesNotMatch(render('cta', { buttonUrl: 'javascript:alert(1)' }), /<a /);
});

test('gallery and FAQ use their own structures', () => {
  const gallery = render('gallery', { images: '/a.jpg, /b.jpg\n/c.jpg' });
  for (const name of ['a', 'b', 'c']) assert.ok(gallery.includes(`src="/${name}.jpg"`));
  assert.match(render('faq'), /<details[^>]*><summary[^>]*>French<\/summary>/);
});

test('rich text uses the selected language, sanitizes HTML, and ignores stale media settings', () => {
  const html = render('richText', { imageUrl: '/old.jpg' });
  assert.match(html, /French body/);
  assert.doesNotMatch(html, /English|<script|alert\(1\)|old.jpg/);
});
