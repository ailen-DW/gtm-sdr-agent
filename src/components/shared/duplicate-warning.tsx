"use client";

import { AlertTriangle } from "lucide-react";
import type { DuplicateRisk } from "@/lib/types";

export function DuplicateWarning({ risk }: { risk: DuplicateRisk }) {
  const isHigh = risk.severity === "high";
  return (
    <div
      className={`flex gap-3 rounded-xl border px-4 py-3 ${
        isHigh
          ? "border-red-200 bg-red-50"
          : "border-amber-200 bg-amber-50"
      }`}
      role="alert"
    >
      <AlertTriangle
        className={`h-5 w-5 shrink-0 ${isHigh ? "text-red-600" : "text-amber-600"}`}
      />
      <div>
        <p className="text-sm font-semibold text-slate-900">
          Duplicate outreach warning ({risk.severity})
        </p>
        <p className="mt-0.5 text-sm text-slate-600">{risk.message}</p>
        {risk.conflictingContacts && risk.conflictingContacts.length > 0 && (
          <p className="mt-2 text-xs text-slate-500">
            Contacts: {risk.conflictingContacts.join(", ")}
          </p>
        )}
        <p className="mt-2 text-xs font-medium text-slate-700">
          Recommended: coordinate with deal owner before any SDR outreach.
        </p>
      </div>
    </div>
  );
}
