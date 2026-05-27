"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { OutreachApprovalCard } from "@/components/sdr/outreach-approval-card";
import { SdrCompactQueue } from "@/components/sdr/sdr-compact-queue";
import { Card, CardBody } from "@/components/ui/card";
import { useAppStore } from "@/hooks/use-app-store";
import { buildSdrQueue } from "@/lib/sdr/mock-data";

type Filter = "all" | "pending" | "approved" | "rejected";

export function ActionQueueView() {
  const { accounts, actions, drafts } = useAppStore();
  const [filter, setFilter] = useState<Filter>("pending");
  const pendingCount = actions.filter((a) => a.approvalStatus === "pending").length;

  const queueItems = useMemo(
    () => buildSdrQueue(accounts, actions),
    [accounts, actions]
  );

  const filtered = useMemo(() => {
    if (filter === "all") return actions;
    return actions.filter((a) => a.approvalStatus === filter);
  }, [actions, filter]);

  const tabs: { id: Filter; label: string }[] = [
    { id: "pending", label: "Pending approval" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "all", label: "All" },
  ];

  return (
    <>
      <PageHeader
        title="Outreach Approval Center"
        description="Review email and LinkedIn drafts, approve sends, or request variations. Nothing goes out without you."
      />

      <section className="mb-6">
        <h2 className="mb-2 text-sm font-semibold text-slate-900">SDR action queue</h2>
        <SdrCompactQueue items={queueItems} />
      </section>

      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              filter === tab.id
                ? "bg-brand-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
            {tab.id === "pending" && pendingCount > 0 && (
              <span className="ml-1.5 opacity-90">({pendingCount})</span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardBody className="py-4">
              <p className="text-sm text-slate-500">No actions in this view.</p>
            </CardBody>
          </Card>
        ) : (
          filtered.map((action) => {
            const account = accounts.find((a) => a.id === action.accountId);
            return (
              <OutreachApprovalCard
                key={action.id}
                action={action}
                institutionName={account?.name ?? "Unknown"}
                drafts={drafts}
              />
            );
          })
        )}
      </div>
    </>
  );
}
