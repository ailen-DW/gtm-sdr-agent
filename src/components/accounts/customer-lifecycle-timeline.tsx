"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Check, Circle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAccountJourney } from "@/lib/lifecycle/mock-journey-data";
import {
  CUSTOMER_JOURNEY_STAGES,
  type CustomerJourneyStageDetail,
  type CustomerJourneyStageId,
  type JourneyStageStatus,
} from "@/lib/lifecycle/journey-stages";
import type { Institution } from "@/lib/types";
import { cn } from "@/lib/utils";

const LifecycleStagePanel = dynamic(
  () =>
    import("@/components/accounts/lifecycle-stage-panel").then(
      (mod) => mod.LifecycleStagePanel
    ),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 text-center text-sm text-slate-500">
        Loading stage details…
      </div>
    ),
  }
);

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
    node: "border-brand-600 bg-brand-600 text-white ring-2 ring-brand-100",
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

  const currentStage = journey.stages.find(
    (s) => s.stageId === journey.currentStageId
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Customer journey — operational control center
            </h2>
            <p className="mt-0.5 max-w-3xl text-xs text-slate-500">
              Select a stage to review status, tasks, risks, and linked systems.
              Summary above reflects the current stage.
            </p>
          </div>
          <Badge variant="info" className="shrink-0 text-[10px] font-normal">
            CRM + Operational Intelligence
          </Badge>
        </div>
        {currentStage && (
          <p className="mt-2 text-xs text-slate-600">
            <span className="font-medium text-slate-800">Workflow now:</span>{" "}
            {currentStage.nextOwnerAction}
          </p>
        )}
      </div>

      <div className="grid min-h-[480px] lg:grid-cols-[minmax(220px,28%)_1fr]">
        <aside className="flex flex-col border-b border-slate-100 bg-slate-50/60 lg:border-b-0 lg:border-r">
          <div className="flex-1 overflow-y-auto px-2 py-3 lg:max-h-[calc(100vh-280px)]">
            <nav aria-label="Lifecycle stages">
              <ol className="space-y-0">
                {CUSTOMER_JOURNEY_STAGES.map((def, index) => {
                  const stage = journey.stages[index];
                  const display = displayStatus(stage.status);
                  const styles = nodeStyles[display];
                  const isSelected = selectedId === def.id;
                  const isLast = index === CUSTOMER_JOURNEY_STAGES.length - 1;
                  const isCurrent = stage.stageId === journey.currentStageId;

                  return (
                    <li key={def.id} className="relative flex gap-2">
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => setSelectedId(def.id)}
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                            styles.node,
                            isSelected && "ring-2 ring-brand-300"
                          )}
                          aria-pressed={isSelected}
                          aria-label={`${def.label}, ${stage.status}`}
                        >
                          {stage.status === "completed" ? (
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          ) : stage.status === "at_risk" ? (
                            <AlertTriangle className="h-3 w-3" />
                          ) : display === "current" ? (
                            <Circle className="h-1.5 w-1.5 fill-current" />
                          ) : (
                            <span className="text-[9px] font-bold">{index + 1}</span>
                          )}
                        </button>
                        {!isLast && (
                          <div
                            className={cn("my-0.5 w-0.5 flex-1 min-h-[12px]", styles.rail)}
                            aria-hidden
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedId(def.id)}
                        className={cn(
                          "mb-2 min-h-[44px] flex-1 rounded-md px-2 py-1 text-left transition-colors hover:bg-white/80",
                          isSelected && "bg-white shadow-sm ring-1 ring-brand-200",
                          isCurrent && !isSelected && "bg-brand-50/50",
                          styles.text
                        )}
                      >
                        <p className="text-xs leading-snug">{def.label}</p>
                        <p className="text-[10px] text-slate-500">
                          {stage.responsibleOwner}
                        </p>
                        {stage.status === "at_risk" && (
                          <span className="text-[10px] font-medium text-amber-700">
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
          <div className="shrink-0 border-t border-slate-200 bg-slate-100/80 px-3 py-2">
            <p className="text-[10px] text-slate-500">
              <span className="mr-2 inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Done
              </span>
              <span className="mr-2 inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                Active
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full border border-slate-300 bg-white" />
                Next
              </span>
            </p>
          </div>
        </aside>

        <div className="min-h-[320px] overflow-y-auto bg-white lg:max-h-[calc(100vh-280px)]">
          {selectedStage ? (
            <LifecycleStagePanel stage={selectedStage} embedded />
          ) : (
            <p className="p-6 text-sm text-slate-500">Select a stage to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
