"use client";

import Link from "next/link";
import {
  AlertCircle,
  Calendar,
  CheckSquare,
  Linkedin,
  Zap,
} from "lucide-react";
import type { SdrQueueCategory, SdrQueueItem } from "@/lib/sdr/types";
import { cn } from "@/lib/utils";

const categoryMeta: Record<
  SdrQueueCategory,
  { icon: typeof Zap; label: string }
> = {
  approval: { icon: CheckSquare, label: "Approvals" },
  follow_up: { icon: AlertCircle, label: "Follow-ups" },
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  high_priority: { icon: Zap, label: "Priority" },
  meeting_prep: { icon: Calendar, label: "Meeting prep" },
};

export function SdrCompactQueue({ items }: { items: SdrQueueItem[] }) {
  const grouped = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<SdrQueueCategory, SdrQueueItem[]>
  );

  if (items.length === 0) {
    return <p className="text-sm text-slate-500">Queue clear — no urgent items.</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {(Object.keys(categoryMeta) as SdrQueueCategory[]).map((cat) => {
        const list = grouped[cat];
        if (!list?.length) return null;
        const { icon: Icon, label } = categoryMeta[cat];
        return (
          <div
            key={cat}
            className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
          >
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Icon className="h-3.5 w-3.5" />
              {label}
              <span className="ml-auto rounded-full bg-slate-100 px-1.5 text-[10px]">
                {list.length}
              </span>
            </div>
            <ul className="space-y-1.5">
              {list.slice(0, 3).map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-slate-50",
                      item.priority === "high" && "ring-1 ring-amber-100"
                    )}
                  >
                    <p className="font-medium text-slate-800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
