"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { AccountSummaryGrid } from "@/components/accounts/account-summary-grid";
import { AccountIndicators } from "@/components/shared/account-indicators";
import { DuplicateWarning } from "@/components/shared/duplicate-warning";
import { CustomerLifecycleTimeline } from "@/components/accounts/customer-lifecycle-timeline";
import { SdrAccountWorkspace } from "@/components/sdr/sdr-account-workspace";
import { getAccountOperationalSummary } from "@/lib/lifecycle/account-journey-summary";
import { getDiscoveryLeads } from "@/lib/sdr/mock-data";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { LifecycleBadge, CRMBadge } from "@/components/shared/status-badge";
import { ActionQueueItem } from "@/components/actions/action-queue-item";
import { useAppStore } from "@/hooks/use-app-store";
import type { Institution } from "@/lib/types";

export function AccountProfile({ account }: { account: Institution }) {
  const { actions: allActions, drafts: allDrafts } = useAppStore();
  const actions = allActions.filter((a) => a.accountId === account.id);
  const pendingActions = actions.filter((a) => a.approvalStatus === "pending");
  const drafts = allDrafts.filter((d) => d.accountId === account.id);
  const linkedLead = useMemo(
    () => getDiscoveryLeads().find((l) => l.accountId === account.id),
    [account.id]
  );

  return (
    <div className="space-y-4">
      <Link
        href="/accounts"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to accounts
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{account.name}</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {account.location} · {account.type.replace(/_/g, " ")}
            {account.enrollment
              ? ` · ${account.enrollment.toLocaleString()} students`
              : ""}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <LifecycleBadge status={account.lifecycleStatus} />
            <CRMBadge relationship={account.crmRelationship} />
          </div>
          <div className="mt-2">
            <AccountIndicators account={account} />
          </div>
        </div>
        {account.website && (
          <a
            href={account.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-brand-600 hover:underline"
          >
            Website <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {account.duplicateRisk && <DuplicateWarning risk={account.duplicateRisk} />}

      <AccountSummaryGrid account={account} />

      {linkedLead && (
        <p className="rounded-lg border border-brand-100 bg-brand-50/40 px-3 py-2 text-xs text-slate-700">
          <span className="font-medium text-brand-800">Discovery:</span>{" "}
          {linkedLead.whySelected}
          <span className="ml-2">
            <Badge variant="info" className="text-[10px]">
              {linkedLead.discoverySource} · {linkedLead.confidenceScore}%
            </Badge>
          </span>
        </p>
      )}

      <SdrAccountWorkspace account={account} />

      <CustomerLifecycleTimeline account={account} />

      <section>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">
          Actions & approvals
          {pendingActions.length > 0 && (
            <span className="ml-2 font-normal text-slate-500">
              ({pendingActions.length} pending)
            </span>
          )}
        </h2>
        <div className="space-y-2">
          {actions.length === 0 ? (
            <Card>
              <CardBody className="py-3">
                <p className="text-sm text-slate-500">
                  No queued actions for this account.
                </p>
              </CardBody>
            </Card>
          ) : (
            actions.map((a) => (
              <ActionQueueItem
                key={a.id}
                action={a}
                institutionName={account.name}
                compactReasoning
                hideInstitutionLink
              />
            ))
          )}
        </div>
        {drafts.length > 0 && (
          <p className="mt-2 text-xs text-slate-500">
            {drafts.length} draft{drafts.length > 1 ? "s" : ""} awaiting approval —{" "}
            {drafts.map((d, i) => (
              <span key={d.id}>
                {i > 0 && ", "}
                <Link
                  href={`/outreach-drafts?action=${d.actionId ?? d.id}`}
                  className="text-brand-600 hover:underline"
                >
                  {d.subject ?? "Draft"}
                </Link>
              </span>
            ))}
          </p>
        )}
      </section>
    </div>
  );
}
