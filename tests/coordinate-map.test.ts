import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCoordinateMap } from '../src/shared/utils/coordinate-map';

test('coordinate map accepts zero and positions its marker in latitude-longitude order', () => {
  const map = buildCoordinateMap({latitude:0,longitude:0});
  assert.ok(map);
  const url = new URL(map.embedUrl);
  assert.equal(url.searchParams.get('marker'),'0,0');
  assert.equal(url.searchParams.get('bbox'),'-0.15,-0.1,0.15,0.1');
});
test('coordinate map hides missing and invalid locations', () => {
  for (const coordinates of [undefined, {}, {latitude:12}, {latitude:NaN,longitude:5}, {latitude:91,longitude:5}, {latitude:5,longitude:181}]) assert.equal(buildCoordinateMap(coordinates),null);
});
