"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ActionQueueItem } from "@/components/actions/action-queue-item";
import { Card, CardBody } from "@/components/ui/card";
import { useAppStore } from "@/hooks/use-app-store";

type Filter = "all" | "pending" | "approved" | "rejected";

export function ActionQueueView() {
  const { accounts, actions } = useAppStore();
  const [filter, setFilter] = useState<Filter>("pending");
  const pendingCount = actions.filter((a) => a.approvalStatus === "pending").length;

  const filtered = useMemo(() => {
    if (filter === "all") return actions;
    return actions.filter((a) => a.approvalStatus === filter);
  }, [actions, filter]);

  const tabs: { id: Filter; label: string }[] = [
    { id: "pending", label: "Pending your decision" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "all", label: "All" },
  ];

  return (
    <>
      <PageHeader
        title="Action Queue"
        description="Review AI recommendations with full reasoning. Approve, reject, or edit drafts — nothing sends automatically."
      />

      <Card className="mb-6 border-brand-100 bg-brand-50/30">
        <CardBody className="py-4 text-sm text-slate-700">
          <p>
            <span className="font-semibold">How this works:</span> Each card
            shows what the agent found, why it matters, the recommended action,
            and what requires your sign-off. Approved items still need a manual
            send from Outreach Drafts.
          </p>
          {pendingCount > 0 && (
            <p className="mt-2 font-medium text-brand-800">
              {pendingCount} recommendation{pendingCount !== 1 ? "s" : ""}{" "}
              waiting for you.
            </p>
          )}
        </CardBody>
      </Card>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab.id
                ? "bg-brand-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.label}
            {tab.id === "pending" && (
              <span className="ml-2 opacity-80">({pendingCount})</span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {filtered.length === 0 ? (
          <Card>
            <CardBody>
              <p className="text-sm text-slate-500">
                No actions in this view.
              </p>
            </CardBody>
          </Card>
        ) : (
          filtered.map((action) => {
            const account = accounts.find((a) => a.id === action.accountId);
            return (
              <ActionQueueItem
                key={action.id}
                action={action}
                institutionName={account?.name ?? "Unknown"}
              />
            );
          })
        )}
      </div>
    </>
  );
}
