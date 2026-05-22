"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AccountCard } from "@/components/accounts/account-card";
import { useAppStore } from "@/hooks/use-app-store";
import { cn } from "@/lib/utils";

const FILTER_LABELS: Record<string, string> = {
  review: "Needs human review",
  duplicate: "Duplicate outreach risk",
  stalled: "Stalled opportunities",
  upsell: "Upsell & expansion",
  customer: "Customers",
  followup: "Follow-ups due",
};

export function AccountsList() {
  const { accounts } = useAppStore();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const filtered = useMemo(() => {
    switch (filter) {
      case "review":
        return accounts.filter(
          (a) => a.lifecycleStatus === "needs_human_review"
        );
      case "duplicate":
        return accounts.filter(
          (a) => a.duplicateRisk && a.duplicateRisk.severity !== "low"
        );
      case "stalled":
        return accounts.filter((a) => a.isStalled);
      case "upsell":
        return accounts.filter(
          (a) =>
            a.lifecycleStatus === "expansion_opportunity" ||
            a.crmRelationship === "expansion_candidate"
        );
      case "followup":
        return accounts.filter((a) => a.followUpDue);
      case "customer":
        return accounts.filter((a) =>
          ["customer", "implementation", "live"].includes(a.lifecycleStatus)
        );
      default:
        return accounts;
    }
  }, [accounts, filter]);

  const filters = [
    { id: null, label: "All" },
    { id: "review", label: "Review" },
    { id: "duplicate", label: "Duplicates" },
    { id: "followup", label: "Follow-ups" },
    { id: "upsell", label: "Upsell" },
    { id: "stalled", label: "Stalled" },
    { id: "customer", label: "Customers" },
  ];

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.id ?? "all"}
            href={f.id ? `/accounts?filter=${f.id}` : "/accounts"}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              (filter === f.id || (!filter && !f.id))
                ? "bg-brand-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <p className="mb-6 text-sm text-slate-500">
        {filtered.length} account{filtered.length !== 1 ? "s" : ""}
        {filter && FILTER_LABELS[filter]
          ? ` · ${FILTER_LABELS[filter]}`
          : " · full pipeline"}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((a) => (
          <AccountCard key={a.id} account={a} />
        ))}
      </div>
    </>
  );
}
