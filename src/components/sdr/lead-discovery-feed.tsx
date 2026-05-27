"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductBadge } from "@/components/shared/product-badge";
import type { DiscoveryLead } from "@/lib/sdr/types";
import { cn } from "@/lib/utils";

const sourceColors: Record<string, string> = {
  LinkedIn: "bg-sky-50 text-sky-800 ring-sky-200",
  "Higher Ed News": "bg-slate-100 text-slate-700 ring-slate-200",
  "Conference List": "bg-violet-50 text-violet-800 ring-violet-200",
  Article: "bg-amber-50 text-amber-800 ring-amber-200",
  "Website Activity": "bg-brand-50 text-brand-800 ring-brand-200",
  "CRM Signal": "bg-orange-50 text-orange-800 ring-orange-200",
};

export function LeadDiscoveryFeed({ leads }: { leads: DiscoveryLead[] }) {
  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <article
          key={lead.id}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-slate-900">{lead.institutionName}</h3>
              <p className="text-xs text-slate-500">{lead.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium ring-1",
                  sourceColors[lead.discoverySource] ?? "bg-slate-100 text-slate-700"
                )}
              >
                {lead.discoverySource}
              </span>
              <Badge
                variant={
                  lead.confidenceScore >= 85
                    ? "success"
                    : lead.confidenceScore >= 75
                      ? "info"
                      : "warning"
                }
              >
                {lead.confidenceScore}%
              </Badge>
            </div>
          </div>

          <p className="mt-2 text-sm text-slate-700">{lead.whySelected}</p>

          <div className="mt-2 flex flex-wrap gap-1">
            {lead.buyingSignals.map((s, i) => (
              <span
                key={i}
                className="rounded-md bg-slate-50 px-2 py-0.5 text-xs text-slate-600 ring-1 ring-slate-100"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase text-slate-400">Products</span>
              {lead.recommendedProducts.map((p) => (
                <ProductBadge key={p} productId={p} />
              ))}
            </div>
            <p className="text-[10px] text-slate-400">{lead.sourceDetail}</p>
          </div>

          {lead.accountId && (
            <Link
              href={`/accounts/${lead.accountId}`}
              className="mt-2 inline-block text-xs font-medium text-brand-600 hover:underline"
            >
              Open in accounts →
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
