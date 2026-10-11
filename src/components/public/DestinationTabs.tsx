'use client';

import { Children, useId, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DestinationTabs({ tabs, children, previousLabel, nextLabel, labelledBy = 'home-destinations-title' }: {
  tabs: { id: string; label: string }[];
  children: ReactNode;
  previousLabel: string;
  nextLabel: string;
  labelledBy?: string;
}) {
  const [active, setActive] = useState(0);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const id = useId();
  const track = useRef<HTMLDivElement | null>(null);
  const panels = Children.toArray(children);

  function updateScroll(element: HTMLDivElement) {
    setCanGoBack(element.scrollLeft > 1);
    setCanGoForward(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
  }

  return (
    <>
      <div className="relative mb-8 sm:mb-12">
        <div ref={(element) => {
          track.current = element;
          if (!element) return;
          const observer = new ResizeObserver(() => updateScroll(element));
          observer.observe(element);
          return () => observer.disconnect();
        }} onScroll={(event) => updateScroll(event.currentTarget)} role="tablist" aria-labelledby={labelledBy} className="flex gap-3 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab, index) => (
            <button key={tab.id} id={`${id}-tab-${index}`} role="tab" aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
              let next = index;
              if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
              else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
              else if (event.key === 'Home') next = 0;
              else if (event.key === 'End') next = tabs.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              const button = event.currentTarget.parentElement?.children[next] as HTMLButtonElement;
              button?.focus();
              button?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }} className={`shrink-0 rounded-xl border px-4 py-2.5 text-base font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-[18px] sm:text-xl ${active === index ? 'border-destination-selected bg-destination-selected text-destination-ink' : 'border-subtle/70 bg-surface text-subtle hover:bg-surface-container'}`}>
              {tab.label}
            </button>
          ))}
        </div>
        {canGoBack && <button type="button" aria-label={previousLabel} onClick={() => track.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="absolute left-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-destination-selected text-destination-ink shadow-md"><ChevronLeft aria-hidden="true" /></button>}
        {canGoForward && <button type="button" aria-label={nextLabel} onClick={() => track.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="absolute right-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-destination-selected text-destination-ink shadow-md"><ChevronRight aria-hidden="true" /></button>}
      </div>
      {panels.map((panel, index) => (
        <div key={tabs[index].id} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={active !== index} tabIndex={0}>{panel}</div>
      ))}
    </>
  );
}
