import test from 'node:test';
import assert from 'node:assert/strict';
import { TranslateContentSchema } from '../src/application/validators/translation.validators';
import { collectTranslationTexts, translateContent } from '../src/application/services/translation.service';

test('translation rejects identical languages and oversized content', () => {
  const input = { collection: 'pages', sourceLanguage: 'en-US', targetLanguage: 'fr-FR', content: { title: 'Hello' } };
  assert.equal(TranslateContentSchema.safeParse({ ...input, targetLanguage: 'en-US' }).success, false);
  assert.equal(TranslateContentSchema.safeParse({ ...input, content: { body: 'a'.repeat(60001) } }).success, false);
});

test('translation extracts nested prose while leaving structural values alone', () => {
  const result = collectTranslationTexts({ title: 'Hello', list: ['Welcome'], itinerary: [{ day: 1, title: 'Arrival', image: '/image.webp', url: 'https://example.com', _id: 'abc' }] });
  assert.deepEqual(result.map(item => item.text), ['Hello', 'Welcome', 'Arrival']);
});

test('translation applies validated AI output without changing links or numbers', async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = 'test-key';
  globalThis.fetch = async (_url, options) => {
    const request = JSON.parse(String(options?.body));
    assert.equal(request.store, false);
    assert.equal(request.text.format.type, 'json_schema');
    return Response.json({ status: 'completed', output: [{ content: [{ type: 'output_text', text: JSON.stringify({ translations: [{ id: 0, text: 'Bonjour' }, { id: 1, text: 'Arrivée' }] }) }] }] });
  };
  try {
    const content = { title: 'Hello', itinerary: [{ title: 'Arrival', dayNumber: 1, image: '/photo.webp' }] };
    const result = await translateContent({ collection: 'trips', sourceLanguage: 'en-US', targetLanguage: 'fr-FR', content });
    assert.deepEqual(result, { title: 'Bonjour', itinerary: [{ title: 'Arrivée', dayNumber: 1, image: '/photo.webp' }] });
    assert.equal(content.title, 'Hello');
    globalThis.fetch = async () => Response.json({ status: 'completed', output: [{ content: [{ type: 'output_text', text: '{"translations":[]}' }] }] });
    await assert.rejects(() => translateContent({ collection: 'trips', sourceLanguage: 'en-US', targetLanguage: 'fr-FR', content }), /incomplete translation/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = originalKey;
  }
});

test('translation rejects unsupported languages and empty sources', async () => {
  await assert.rejects(() => translateContent({ collection: 'pages', sourceLanguage: 'xx-XX', targetLanguage: 'fr-FR', content: { title: 'Hello' } }), /Unsupported/);
  await assert.rejects(() => translateContent({ collection: 'pages', sourceLanguage: 'en-US', targetLanguage: 'fr-FR', content: { title: '', list: [] } }), /Add content/);
});
