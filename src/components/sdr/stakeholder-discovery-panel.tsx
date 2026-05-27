"use client";

import { Badge } from "@/components/ui/badge";
import type { DiscoveredStakeholder, StakeholderOutreachStatus } from "@/lib/sdr/types";
import { cn, formatLabel } from "@/lib/utils";

const statusVariant: Record<
  StakeholderOutreachStatus,
  "muted" | "warning" | "info" | "success"
> = {
  not_contacted: "muted",
  pending_connection: "warning",
  connected: "info",
  replied: "success",
  meeting_booked: "success",
};

export function StakeholderDiscoveryPanel({
  stakeholders,
}: {
  stakeholders: DiscoveredStakeholder[];
}) {
  if (stakeholders.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No stakeholders discovered yet. Run research from Prospect Discovery.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            <th className="pb-2 pr-3">Name</th>
            <th className="pb-2 pr-3">Role / Dept</th>
            <th className="pb-2 pr-3">LinkedIn</th>
            <th className="pb-2">HubSpot</th>
          </tr>
        </thead>
        <tbody>
          {stakeholders.map((s) => (
            <tr key={s.id} className="border-b border-slate-50">
              <td className="py-2 pr-3">
                <p className="font-medium text-slate-900">{s.name}</p>
              </td>
              <td className="py-2 pr-3 text-xs text-slate-600">
                {s.title}
                <span className="block text-slate-400">{s.department}</span>
              </td>
              <td className="py-2 pr-3">
                <Badge variant={statusVariant[s.linkedInStatus]} className="text-[10px]">
                  {formatLabel(s.linkedInStatus)}
                </Badge>
              </td>
              <td className="py-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    s.inHubSpot ? "text-emerald-700" : "text-amber-700"
                  )}
                >
                  {s.inHubSpot ? "In CRM" : "Not in CRM"}
                </span>
                {s.hubSpotNote && (
                  <p className="text-[10px] text-slate-400">{s.hubSpotNote}</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
