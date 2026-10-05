'use client';

import { useState } from 'react';
import { Compass, Route, ShieldCheck } from 'lucide-react';

interface WorkflowStep {
  title: string;
  body: string;
}

interface HomeWorkflowProps {
  steps: WorkflowStep[];
  runningLabel: string;
  stepLabel: string;
  ofLabel: string;
}

const stepIcons = [Compass, Route, ShieldCheck];

export default function HomeWorkflow({ steps, runningLabel, stepLabel, ofLabel }: HomeWorkflowProps) {
  const [activeStep, setActiveStep] = useState(0);

  if (steps.length === 0) return null;

  return (
    <div className="mx-auto max-w-6xl rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {runningLabel}
        </span>
        <span className="text-sm font-medium text-muted">
          {stepLabel} <span className="font-bold tabular-nums text-dark">{String(activeStep + 1).padStart(2, '0')}</span>{' '}
          {ofLabel} <span className="tabular-nums">{String(steps.length).padStart(2, '0')}</span>
        </span>
      </div>

      <ol className="mt-5 grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = stepIcons[index % stepIcons.length];
          const isDone = index < activeStep;
          const isActive = index === activeStep;

          return (
            <li
              key={`${index}-${step.title}`}
              className={`relative flex min-w-0 flex-col rounded-2xl border p-3 transition-colors sm:p-4 ${
                isActive
                  ? 'border-primary/30 bg-surface shadow-sm'
                  : 'border-line bg-white hover:bg-surface/70'
              }`}
            >
              <button
                type="button"
                className="flex w-full flex-col items-start gap-3 rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => setActiveStep(index)}
                aria-current={isActive ? 'step' : undefined}
                aria-expanded={isActive}
                aria-controls={`home-workflow-step-${index}-details`}
                suppressHydrationWarning
              >
                <span className="flex w-full items-center gap-3">
                  <span
                    className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isActive || isDone
                        ? 'border-primary bg-primary text-white'
                        : 'border-line bg-white text-muted'
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span
                    className={`text-xs font-bold tabular-nums tracking-wider ${
                      isActive ? 'text-primary' : 'text-muted'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {isDone && (
                    <span aria-hidden="true" className="ml-auto text-xs font-semibold text-primary">{'\u2713'}</span>
                  )}
                </span>
                <span className={`pr-1 text-sm font-semibold leading-snug sm:text-base ${isActive ? 'text-dark' : 'text-body'}`}>
                  {step.title}
                </span>
              </button>
              <div
                id={`home-workflow-step-${index}-details`}
                className={`flex-1 pt-3 ${isActive ? '' : 'hidden'}`}
              >
                <p className="text-sm leading-6 text-subtle">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <div aria-hidden="true" className="relative mx-2 mt-5 h-px bg-line">
        <span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-white transition-[left] duration-300"
          style={{ left: `${(activeStep / Math.max(steps.length - 1, 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
