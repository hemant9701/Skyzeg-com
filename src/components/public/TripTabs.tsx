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
      <div className="sticky top-[64px] z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="flex overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative flex flex-shrink-0 items-center gap-2 px-6 py-4 text-sm font-medium transition-colors focus-visible:outline-none
                  ${isActive ? 'text-[#1C398E]' : 'text-[#64748B] hover:text-[#1C398E]'}`}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                {tab.label}
                {isActive && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#1C398E]" />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8">{activeTab?.content}</div>
    </div>
  );
}
