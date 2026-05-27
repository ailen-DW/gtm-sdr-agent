"use client";

import { Check, Circle, Clock, MessageSquare, UserPlus } from "lucide-react";
import type { LinkedInWorkflowStep, LinkedInWorkflowStepStatus } from "@/lib/sdr/types";
import { cn } from "@/lib/utils";

const stepIcon = {
  suggested: MessageSquare,
  approved: Check,
  pending: Clock,
  accepted: UserPlus,
  completed: Check,
};

const stepStyle: Record<LinkedInWorkflowStepStatus, string> = {
  suggested: "border-slate-200 bg-white",
  approved: "border-brand-200 bg-brand-50/50",
  pending: "border-amber-200 bg-amber-50/50",
  accepted: "border-emerald-200 bg-emerald-50/50",
  completed: "border-emerald-300 bg-emerald-50",
};

export function LinkedInWorkflowPanel({ steps }: { steps: LinkedInWorkflowStep[] }) {
  if (steps.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No LinkedIn workflow for this account yet.
      </p>
    );
  }

  return (
    <ol className="space-y-2">
      {steps.map((step, index) => {
        const Icon = stepIcon[step.status];
        const isLast = index === steps.length - 1;
        return (
          <li key={step.id} className="relative flex gap-3">
            {!isLast && (
              <span
                className="absolute left-[11px] top-7 h-[calc(100%-4px)] w-0.5 bg-slate-200"
                aria-hidden
              />
            )}
            <span
              className={cn(
                "relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                stepStyle[step.status]
              )}
            >
              <Icon className="h-3 w-3 text-slate-600" />
            </span>
            <div
              className={cn(
                "mb-1 flex-1 rounded-md border px-3 py-2",
                stepStyle[step.status]
              )}
            >
              <p className="text-xs font-medium text-slate-900">{step.label}</p>
              {step.preview && (
                <p className="mt-1 text-xs italic text-slate-600 line-clamp-2">
                  &ldquo;{step.preview}&rdquo;
                </p>
              )}
              {step.date && (
                <p className="mt-0.5 text-[10px] text-slate-400">{step.date}</p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
