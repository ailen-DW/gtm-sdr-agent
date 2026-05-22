import { LIFECYCLE_LABELS, LIFECYCLE_PIPELINE } from "@/lib/constants";
import type { LifecycleStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const SKIP_DISPLAY: LifecycleStatus[] = ["do_not_contact"];

export function LifecycleStepper({ current }: { current: LifecycleStatus }) {
  if (SKIP_DISPLAY.includes(current)) {
    return (
      <p className="text-sm font-medium text-red-700">
        {LIFECYCLE_LABELS[current]}
      </p>
    );
  }

  const idx = LIFECYCLE_PIPELINE.indexOf(current);
  const windowStart = Math.max(0, idx - 2);
  const windowEnd = Math.min(LIFECYCLE_PIPELINE.length - 1, idx + 2);
  const visible = LIFECYCLE_PIPELINE.slice(windowStart, windowEnd + 1);

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-center gap-0">
        {visible.map((stage, i) => {
          const globalIdx = LIFECYCLE_PIPELINE.indexOf(stage);
          const isCurrent = stage === current;
          const isPast = globalIdx < idx;
          return (
            <div key={stage} className="flex items-center">
              <div
                className={cn(
                  "flex flex-col items-center px-2",
                  isCurrent && "scale-105"
                )}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold",
                    isCurrent
                      ? "bg-brand-600 text-white ring-4 ring-brand-100"
                      : isPast
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-400"
                  )}
                >
                  {globalIdx + 1}
                </div>
                <span
                  className={cn(
                    "mt-1.5 max-w-[72px] text-center text-[10px] leading-tight",
                    isCurrent
                      ? "font-semibold text-brand-700"
                      : isPast
                        ? "text-slate-600"
                        : "text-slate-400"
                  )}
                >
                  {LIFECYCLE_LABELS[stage]}
                </span>
              </div>
              {i < visible.length - 1 && (
                <div
                  className={cn(
                    "mb-5 h-0.5 w-6",
                    globalIdx < idx ? "bg-emerald-300" : "bg-slate-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Current stage: <span className="font-medium text-slate-700">{LIFECYCLE_LABELS[current]}</span>
      </p>
    </div>
  );
}
