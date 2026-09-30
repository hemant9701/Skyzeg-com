import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizePlainText, sanitizeEmailValue, TailorMadeRequestCreateSchema } from '../src/application/validators/content.validators';

test('sanitizePlainText strips HTML and collapses whitespace', () => {
  const input = '  <script>alert(1)</script> Hello <strong>world</strong>  ';
  assert.equal(sanitizePlainText(input), 'Hello world');
});

test('sanitizeEmailValue trims and lowercases addresses', () => {
  assert.equal(sanitizeEmailValue('  User@Example.com '), 'user@example.com');
});

test('tailor-made request accepts blank optional form values and normalizes structured fields', () => {
  const request = TailorMadeRequestCreateSchema.parse({
    trip: 'trip-id',
    leadName: ' Jamie Doe ',
    leadEmail: 'JAMIE@example.com',
    leadPhone: '',
    travelDate: '',
    travellersCount: '2',
    preferredDestination: ' Kenya ',
    durationDays: '',
    budgetRange: ' USD 1500 - 2500 per person ',
    accommodationStyle: 'Comfort',
    activities: ' Wildlife ',
    specialRequests: ''
  });

  assert.equal(request.leadName, 'Jamie Doe');
  assert.equal(request.leadEmail, 'jamie@example.com');
  assert.equal(request.travelDate, undefined);
  assert.equal(request.durationDays, undefined);
  assert.equal(request.preferredDestination, 'Kenya');
  assert.equal(request.travellersCount, 2);
});
