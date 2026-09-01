'use client';

import { useState } from 'react';

interface TripTabsProps {
  overview:         React.ReactNode;
  itinerary:        React.ReactNode;
  includesExcludes: React.ReactNode;
  policies:         React.ReactNode;
  hasItinerary:     boolean;
  hasPolicies:      boolean;
  labels?: {
    overview?: string;
    itinerary?: string;
    includes?: string;
    policies?: string;
  };
}

export default function TripTabs({
  overview, itinerary, includesExcludes, policies,
  hasItinerary, hasPolicies,
  labels = {},
}: TripTabsProps) {
  const tabs = [
    { id: 'overview',  label: labels.overview  ?? 'Overview',            icon: '📋', content: overview },
    { id: 'itinerary', label: labels.itinerary ?? 'Itinerary',           icon: '🗓️', content: itinerary },
    { id: 'includes',  label: labels.includes  ?? 'Includes & Excludes', icon: '✅', content: includesExcludes },
    { id: 'policies',  label: labels.policies  ?? 'Policies',            icon: '📜', content: policies },
  ].filter((t) => {
    if (t.id === 'itinerary' && !hasItinerary) return false;
    if (t.id === 'policies'  && !hasPolicies)  return false;
    return true;
  });

  const [active, setActive] = useState(tabs[0]?.id ?? 'overview');
  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div>
      <div className="site-sticky-flush-header sticky z-10 border border-slate-200 border-b bg-white shadow-sm">
        <div className="grid grid-cols-2 gap-1 p-1 sm:flex sm:gap-0 sm:p-0 sm:overflow-x-auto sm:scrollbar-none">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-center text-[11px] font-medium leading-tight transition-colors focus-visible:outline-none sm:flex-shrink-0 sm:justify-start sm:rounded-none sm:px-4 sm:py-3 sm:text-sm
                  ${isActive ? 'bg-[#1C398E]/5 text-[#1C398E]' : 'text-[#64748B] hover:text-[#1C398E]'}`}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
                {isActive && <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-[#1C398E] sm:inset-x-0" />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-6 sm:mt-8">{activeTab?.content}</div>
    </div>
  );
}
