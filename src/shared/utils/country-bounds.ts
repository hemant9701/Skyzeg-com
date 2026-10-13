import countryBounds from '../../../data/country-bounds.json';

export type CountryBounds = [[number, number], [number, number]];
const normalize = (name: string) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const aliases: Record<string, string> = {
  usa:'United States of America', us:'United States of America', unitedstates:'United States of America', america:'United States of America',
  uk:'United Kingdom', greatbritain:'United Kingdom', britain:'United Kingdom',
  uae:'United Arab Emirates', southkorea:'South Korea', republicofkorea:'South Korea',
  vietnam:'Vietnam', czechrepublic:'Czechia', northmacedonia:'Macedonia', eswatini:'eSwatini',
  ivorycoast:'Ivory Coast', cotedivoire:'Ivory Coast', drcongo:'Dem. Rep. Congo', democraticrepublicofthecongo:'Dem. Rep. Congo', republicofthecongo:'Congo'
};
const boundsByName = new Map(Object.entries(countryBounds).map(([name,bounds]) => [normalize(name), bounds as CountryBounds]));
export function getCountryBounds(country?: string | null): CountryBounds | undefined {
  if (!country) return undefined;
  const key = normalize(country);
  return boundsByName.get(normalize(aliases[key] || country));
}
