'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useId, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { getStrings } from '@/lib/ui-strings';

export interface DestinationMenuRegion {
  id: string;
  label: string;
  destinations: { _id: string; slug: string; title: string; heroImage?: string }[];
}

export default function DestinationRegionMenu({ regions, languageCode, onNavigate }: {
  regions: DestinationMenuRegion[];
  languageCode: string;
  onNavigate: () => void;
}) {
  const [selected, setSelected] = useState(regions.find((region) => region.destinations.length)?.id || regions[0]?.id);
  const id = useId();
  const ui = getStrings(languageCode);
  const active = regions.find((region) => region.id === selected) || regions[0];

  return (
    <div className="grid min-h-64 grid-cols-[minmax(110px,0.8fr)_minmax(0,2fr)] gap-4 md:grid-cols-[240px_minmax(0,1fr)] md:gap-8">
      <div role="tablist" aria-label={ui.navDestinations} aria-orientation="vertical" className="max-h-[55vh] space-y-1 overflow-y-auto border-r border-line pr-3 md:pr-5">
        {regions.map((region, index) => (
          <button key={region.id} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active?.id === region.id} tabIndex={active?.id === region.id ? 0 : -1} onClick={() => setSelected(region.id)} onFocus={() => setSelected(region.id)} onMouseEnter={() => setSelected(region.id)} onKeyDown={(event) => {
            let next = index;
            if (event.key === 'ArrowDown') next = (index + 1) % regions.length;
            else if (event.key === 'ArrowUp') next = (index + regions.length - 1) % regions.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = regions.length - 1;
            else return;
            event.preventDefault();
            const button = event.currentTarget.parentElement?.children[next] as HTMLButtonElement;
            button?.focus();
          }} className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-left text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-primary md:px-4 md:text-base ${active?.id === region.id ? 'bg-destination-selected text-destination-ink' : 'text-body hover:bg-surface'}`}>
            {region.label}<ChevronRight size={16} className="shrink-0" aria-hidden="true" />
          </button>
        ))}
      </div>
      {regions.map((region, index) => (
        <div key={region.id} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={active?.id !== region.id} tabIndex={0} className="max-h-[55vh] overflow-y-auto">
          <h3 className="mb-5 font-heading text-2xl font-normal text-destination-ink md:text-3xl">{region.label}</h3>
          {region.destinations.length ? (
            <ul className="grid grid-cols-1 gap-3 pr-2 md:grid-cols-2 lg:grid-cols-5">
              {region.destinations.map((destination) => (
                <li key={destination._id}>
                  <Link href={`/destinations/${destination.slug}`} onClick={onNavigate} className="group block overflow-hidden rounded-2xl border border-destination-line bg-surface transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    <div className="relative aspect-[235/173] overflow-hidden">
                      <Image src={destination.heroImage || '/images/placeholder.svg'} alt={destination.title} fill sizes="(max-width: 767px) 50vw, (max-width: 1023px) 35vw, 180px" className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <span className="block px-3 py-3 text-sm font-medium leading-snug text-destination-ink md:text-base">{destination.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-muted">{ui.contentNoContent}</p>}
        </div>
      ))}
    </div>
  );
}
