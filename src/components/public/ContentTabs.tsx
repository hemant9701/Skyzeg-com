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
      <div className="site-sticky-flush-header sticky z-10 border border-slate-200 border-b bg-white shadow-sm">
        <div className="grid grid-cols-2 gap-1 p-1 sm:flex sm:gap-0 sm:p-0 sm:overflow-x-auto sm:scrollbar-none">
          {tabs.map((tab) => {
            const isActive = active === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`relative flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-center text-[11px] font-medium leading-tight transition-colors focus-visible:outline-none sm:flex-shrink-0 sm:justify-start sm:rounded-none sm:px-4 sm:py-3 sm:text-sm ${
                  isActive ? 'bg-[#1C398E]/5 text-[#1C398E]' : 'text-[#64748B] hover:text-[#1C398E]'
                }`}
              >
                <span className="truncate">{tab.label}</span>
                {isActive && <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-[#1C398E] sm:inset-x-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        {activeTab.content ? (
          <div className="prose prose-slate max-w-none prose-p:my-3 prose-ul:my-2 prose-ol:my-2">
            <RichContent html={activeTab.content} />
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-[#64748B] shadow-sm sm:p-6">
            {labels.emptyMessage ?? 'No content available for this section yet.'}
          </div>
        )}
      </div>
    </div>
  );
}
