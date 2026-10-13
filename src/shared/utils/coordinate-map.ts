export function buildCoordinateMap(coordinates?: { latitude?: number; longitude?: number } | null) {
  const latitude = coordinates?.latitude;
  const longitude = coordinates?.longitude;
  if (typeof latitude !== 'number' || typeof longitude !== 'number' || !Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) return null;
  const params = new URLSearchParams({
    bbox: [Math.max(-180, longitude - 0.15), Math.max(-90, latitude - 0.1), Math.min(180, longitude + 0.15), Math.min(90, latitude + 0.1)].join(','),
    layer: 'mapnik', marker: latitude + ',' + longitude
  });
  return {
    embedUrl: 'https://www.openstreetmap.org/export/embed.html?' + params,
    viewUrl: 'https://www.openstreetmap.org/?mlat=' + latitude + '&mlon=' + longitude + '#map=11/' + latitude + '/' + longitude
  };
}
