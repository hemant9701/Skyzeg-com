'use client';

import { useState } from 'react';
import RichContent from './RichContent';

interface ContentTabsProps {
  overview?: string;
  highlights?: string;
  thingsToDo?: string;
  travelTips?: string;
  labels?: {
    overview?: string;
    highlights?: string;
    thingsToDo?: string;
    travelTips?: string;
    emptyMessage?: string;
  };
}

export default function ContentTabs({
  overview,
  highlights,
  thingsToDo,
  travelTips,
  labels = {}
}: ContentTabsProps) {
  const tabs = [
    { id: 'overview', label: labels.overview ?? 'Overview', content: overview },
    { id: 'highlights', label: labels.highlights ?? 'Highlights', content: highlights },
    { id: 'thingsToDo', label: labels.thingsToDo ?? 'Things To Do', content: thingsToDo },
    { id: 'travelTips', label: labels.travelTips ?? 'Travel Tips', content: travelTips }
  ];

  const [active, setActive] = useState(tabs[0].id);
  const activeTab = tabs.find((tab) => tab.id === active) || tabs[0];

  return (
    <div>
      <div className="sticky top-[64px] z-10 border-b border-slate-200 bg-white shadow-sm">
        <div className="flex overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = active === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`relative flex flex-shrink-0 items-center gap-2 px-6 py-4 text-sm font-medium transition-colors focus-visible:outline-none ${
                  isActive ? 'text-[#1C398E]' : 'text-[#64748B] hover:text-[#1C398E]'
                }`}
              >
                {tab.label}
                {isActive && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#1C398E]" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        {activeTab.content ? (
          <div className="prose prose-slate max-w-none">
            <RichContent html={activeTab.content} />
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-[#64748B] shadow-sm">
            {labels.emptyMessage ?? 'No content available for this section yet.'}
          </div>
        )}
      </div>
    </div>
  );
}