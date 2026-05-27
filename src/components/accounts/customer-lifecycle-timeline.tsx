"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Check, Circle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAccountJourney } from "@/lib/lifecycle/mock-journey-data";

const LifecycleStagePanel = dynamic(
  () =>
    import("@/components/accounts/lifecycle-stage-panel").then(
      (mod) => mod.LifecycleStagePanel
    ),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Loading stage details…
      </div>
    ),
  }
);
import {
  CUSTOMER_JOURNEY_STAGES,
  type CustomerJourneyStageDetail,
  type CustomerJourneyStageId,
  type JourneyStageStatus,
} from "@/lib/lifecycle/journey-stages";
import type { Institution } from "@/lib/types";
import { cn } from "@/lib/utils";

function displayStatus(status: JourneyStageStatus): "completed" | "current" | "upcoming" {
  if (status === "completed") return "completed";
  if (status === "current" || status === "at_risk") return "current";
  return "upcoming";
}

const nodeStyles = {
  completed: {
    node: "border-emerald-600 bg-emerald-600 text-white",
    rail: "bg-emerald-500",
    text: "text-slate-800",
  },
  current: {
    node: "border-brand-600 bg-brand-600 text-white ring-4 ring-brand-100",
    rail: "bg-brand-500",
    text: "text-brand-900 font-semibold",
  },
  upcoming: {
    node: "border-slate-200 bg-white text-slate-400",
    rail: "bg-slate-200",
    text: "text-slate-400",
  },
};

export function CustomerLifecycleTimeline({ account }: { account: Institution }) {
  const journey = useMemo(() => getAccountJourney(account), [account]);
  const [selectedId, setSelectedId] = useState<CustomerJourneyStageId>(
    journey.currentStageId
  );

  useEffect(() => {
    setSelectedId(journey.currentStageId);
  }, [journey.currentStageId]);

  const selectedStage: CustomerJourneyStageDetail | undefined =
    journey.stages.find((s) => s.stageId === selectedId);

  const completedCount = journey.stages.filter(
    (s) => s.status === "completed"
  ).length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Customer lifecycle timeline
            </h2>
            <p className="mt-0.5 max-w-2xl text-sm text-slate-500">
              Single operational view across HubSpot, ClickUp, Gmail, and AI
              signals — organize the customer journey without replacing existing
              systems.
            </p>
            <div className="mt-3">
              <Badge variant="info" className="font-normal">
                Source of truth: CRM + Operational Intelligence
              </Badge>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="font-medium text-slate-900">
              Stage {completedCount + 1} of {CUSTOMER_JOURNEY_STAGES.length}
            </p>
            <p className="text-slate-500">
              {journey.stages.find((s) => s.stageId === journey.currentStageId)
                ?.label ?? "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-5">
        {/* Vertical stepper — primary navigation */}
        <div className="border-b border-slate-100 lg:col-span-2 lg:border-b-0 lg:border-r">
          <div className="max-h-[520px] overflow-y-auto px-3 py-4">
            <nav aria-label="Lifecycle stages">
              <ol className="space-y-0">
                {CUSTOMER_JOURNEY_STAGES.map((def, index) => {
                  const stage = journey.stages[index];
                  const display = displayStatus(stage.status);
                  const styles = nodeStyles[display];
                  const isSelected = selectedId === def.id;
                  const isLast = index === CUSTOMER_JOURNEY_STAGES.length - 1;

                  return (
                    <li key={def.id} className="relative flex gap-3">
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => setSelectedId(def.id)}
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                            styles.node,
                            isSelected && "scale-110"
                          )}
                          aria-pressed={isSelected}
                          aria-label={`${def.label}, ${stage.status}`}
                        >
                          {stage.status === "completed" ? (
                            <Check className="h-4 w-4" strokeWidth={3} />
                          ) : stage.status === "at_risk" ? (
                            <AlertTriangle className="h-3.5 w-3.5" />
                          ) : display === "current" ? (
                            <Circle className="h-2 w-2 fill-current" />
                          ) : (
                            <span className="text-[10px] font-bold">
                              {index + 1}
                            </span>
                          )}
                        </button>
                        {!isLast && (
                          <div
                            className={cn("my-0.5 w-0.5 flex-1 min-h-[20px]", styles.rail)}
                            aria-hidden
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedId(def.id)}
                        className={cn(
                          "mb-3 flex-1 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-slate-50",
                          isSelected && "bg-brand-50",
                          styles.text
                        )}
                      >
                        <p className="text-sm leading-snug">{def.label}</p>
                        <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                          {stage.responsibleOwner}
                        </p>
                        {stage.status === "at_risk" && (
                          <span className="mt-0.5 inline-block text-xs font-medium text-amber-700">
                            At risk
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-2">
            <p className="text-[11px] text-slate-500">
              <span className="mr-3 inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                Completed
              </span>
              <span className="mr-3 inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-brand-600" />
                Current
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full border border-slate-300 bg-white" />
                Upcoming
              </span>
            </p>
          </div>
        </div>

        {/* Stage detail panel */}
        <div className="lg:col-span-3">
          {selectedStage ? (
            <div className="p-4 lg:p-5">
              <LifecycleStagePanel stage={selectedStage} />
            </div>
          ) : (
            <p className="p-8 text-sm text-slate-500">Select a stage to view details.</p>
          )}
        </div>
      </div>

      {/* Compact horizontal overview — quick scan */}
      <div className="hidden border-t border-slate-100 px-4 py-4 md:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Journey overview
        </p>
        <div className="overflow-x-auto pb-1">
          <div className="relative flex min-w-[900px]">
            <div
              className="absolute left-[3%] right-[3%] top-[14px] h-0.5 bg-slate-200"
              aria-hidden
            />
            {CUSTOMER_JOURNEY_STAGES.map((def, index) => {
              const stage = journey.stages[index];
              const display = displayStatus(stage.status);
              const isSelected = selectedId === def.id;
              return (
                <button
                  key={def.id}
                  type="button"
                  onClick={() => setSelectedId(def.id)}
                  className="relative z-[1] flex flex-1 flex-col items-center px-0.5"
                  aria-label={def.label}
                >
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full border-2 text-[9px] font-bold flex items-center justify-center",
                      nodeStyles[display].node,
                      isSelected && "ring-2 ring-brand-300"
                    )}
                  >
                    {stage.status === "completed" ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-1 max-w-[64px] text-center text-[9px] leading-tight",
                      isSelected ? "font-semibold text-brand-700" : "text-slate-400"
                    )}
                  >
                    {def.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
