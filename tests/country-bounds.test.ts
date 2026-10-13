import test from 'node:test';
import assert from 'node:assert/strict';
import { getCountryBounds } from '../src/shared/utils/country-bounds';

test('country bounds fit the entire country rather than a local point', () => {
  const india=getCountryBounds('India');
  assert.ok(india);
  assert.ok(india[0][0]<8&&india[1][0]>35);
  assert.ok(india[0][1]<70&&india[1][1]>95);
  assert.deepEqual(getCountryBounds('USA'),getCountryBounds('United States of America'));
  assert.deepEqual(getCountryBounds(' united kingdom '),getCountryBounds('UK'));
});
test('country bounds use a compact view across the date line', () => {
  const fiji=getCountryBounds('Fiji');
  assert.ok(fiji);
  assert.ok(fiji[1][1]-fiji[0][1]<20);
  assert.equal(getCountryBounds('unknown country'),undefined);
});
