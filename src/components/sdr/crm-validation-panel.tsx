"use client";

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { CrmValidation, CrmValidationCheck } from "@/lib/sdr/types";
import { cn } from "@/lib/utils";

const resultMeta = {
  clear: {
    icon: CheckCircle2,
    className: "text-emerald-700",
    bg: "bg-emerald-50/80 border-emerald-100",
  },
  warning: {
    icon: AlertTriangle,
    className: "text-amber-700",
    bg: "bg-amber-50/80 border-amber-100",
  },
  block: {
    icon: XCircle,
    className: "text-red-700",
    bg: "bg-red-50/80 border-red-100",
  },
};

function CheckRow({ check }: { check: CrmValidationCheck }) {
  const meta = resultMeta[check.result];
  const Icon = meta.icon;
  return (
    <li
      className={cn(
        "flex items-start gap-2 rounded-md border px-2.5 py-2 text-xs",
        meta.bg
      )}
    >
      <Icon className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", meta.className)} />
      <div>
        <p className={cn("font-medium", meta.className)}>{check.label}</p>
        <p className="text-slate-600">{check.detail}</p>
      </div>
    </li>
  );
}

export function CrmValidationPanel({ validation }: { validation: CrmValidation }) {
  return (
    <div>
      {validation.duplicateRisk && (
        <p className="mb-2 text-xs font-medium text-amber-800">
          Duplicate risk flagged — resolve before outbound.
        </p>
      )}
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {validation.checks.map((c) => (
          <CheckRow key={c.id} check={c} />
        ))}
      </ul>
    </div>
  );
}
