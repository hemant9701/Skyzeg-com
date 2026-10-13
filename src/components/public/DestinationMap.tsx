'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import type { CountryBounds } from '@/shared/utils/country-bounds';
import 'leaflet/dist/leaflet.css';

export default function DestinationMap({ latitude, longitude, label, bounds }: { latitude: number; longitude: number; label: string; bounds?: CountryBounds }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let disposed = false;
    let map: LeafletMap | undefined;
    const resize = new ResizeObserver(() => {
      map?.invalidateSize();
      if (bounds) map?.fitBounds(bounds, { padding: [20, 20], animate: false });
    });
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      void import('leaflet').then(L => {
        if (disposed) return;
        map = L.map(element, {
          zoomControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
        });
        if (bounds) map.fitBounds(bounds, { padding: [20, 20] });
        else map.setView([latitude, longitude], 4);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);
        const markerLongitude = bounds && longitude < bounds[0][1] ? longitude + 360 : longitude;
        L.circleMarker([latitude, markerLongitude], { radius: 8, color: 'white', weight: 3, fillColor: 'var(--color-primary)', fillOpacity: 1 }).addTo(map);
        resize.observe(element);
      }).catch(() => { /* The larger-map link remains available if the map cannot load. */ });
    });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); resize.disconnect(); map?.remove(); };
  }, [latitude, longitude, bounds]);
  return <div ref={container} aria-label={label} className="relative z-0 h-80 w-full bg-light" />;
}
