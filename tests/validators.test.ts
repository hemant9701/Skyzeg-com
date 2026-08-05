import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizePlainText, sanitizeEmailValue } from '../src/application/validators/content.validators';

test('sanitizePlainText strips HTML and collapses whitespace', () => {
  const input = '  <script>alert(1)</script> Hello <strong>world</strong>  ';
  assert.equal(sanitizePlainText(input), 'Hello world');
});

test('sanitizeEmailValue trims and lowercases addresses', () => {
  assert.equal(sanitizeEmailValue('  User@Example.com '), 'user@example.com');
});
