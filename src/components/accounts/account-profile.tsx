"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { AccountIndicators } from "@/components/shared/account-indicators";
import { AIReasoningCard } from "@/components/shared/ai-reasoning-card";
import { DuplicateWarning } from "@/components/shared/duplicate-warning";
import { LifecycleStepper } from "@/components/shared/lifecycle-stepper";
import { OutreachTimeline } from "@/components/shared/outreach-timeline";
import { ProductFitPanel } from "@/components/shared/product-fit-panel";
import { LifecycleBadge, CRMBadge } from "@/components/shared/status-badge";
import { ActionQueueItem } from "@/components/actions/action-queue-item";
import { buildAgentInsight } from "@/lib/agent/insights";
import { recommendNextAction } from "@/lib/agent/recommendations";
import { getOutreachHistory } from "@/lib/outreach-history";
import { useAppStore } from "@/hooks/use-app-store";
import type { Institution } from "@/lib/types";
import { formatDate, formatLabel } from "@/lib/utils";

export function AccountProfile({ account }: { account: Institution }) {
  const { actions: allActions, drafts: allDrafts } = useAppStore();
  const actions = allActions.filter((a) => a.accountId === account.id);
  const drafts = allDrafts.filter((d) => d.accountId === account.id);
  const agentPreview = recommendNextAction(account);
  const insight = buildAgentInsight(account, agentPreview.action);
  const timeline = getOutreachHistory(account);

  return (
    <div className="space-y-8">
      <Link
        href="/accounts"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to accounts
      </Link>

      {/* Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {account.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {account.location} · {account.type.replace(/_/g, " ")}
              {account.enrollment
                ? ` · ${account.enrollment.toLocaleString()} students`
                : ""}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <LifecycleBadge status={account.lifecycleStatus} />
              <CRMBadge relationship={account.crmRelationship} />
            </div>
            <div className="mt-3">
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

        <div className="mt-6 border-t border-slate-100 pt-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Lifecycle progress
          </p>
          <LifecycleStepper current={account.lifecycleStatus} />
        </div>
      </div>

      {account.duplicateRisk && (
        <DuplicateWarning risk={account.duplicateRisk} />
      )}

      <AIReasoningCard insight={insight} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader title="Institution summary" />
            <CardBody>
              <p className="text-sm leading-relaxed text-slate-600">
                {account.summary}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Intelligence signals"
              description="What the agent detected from public and CRM sources"
            />
            <CardBody className="space-y-4">
              {account.signals.length === 0 ? (
                <p className="text-sm text-slate-500">No signals yet.</p>
              ) : (
                account.signals.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-lg border border-slate-100 bg-slate-50/50 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="info">{formatLabel(s.category)}</Badge>
                      <span className="text-xs text-slate-400">
                        {formatDate(s.detectedAt)}
                      </span>
                    </div>
                    <p className="mt-2 font-medium text-slate-800">{s.title}</p>
                    <p className="text-sm text-slate-500">{s.summary}</p>
                  </div>
                ))
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="CRM & customer intelligence"
              description="Checked before any outreach recommendation"
            />
            <CardBody className="space-y-3">
              {account.crmRecords.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No CRM match — treated as net-new prospect.
                </p>
              ) : (
                account.crmRecords.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-slate-100 px-3 py-2.5 text-sm"
                  >
                    <span className="text-xs font-semibold uppercase text-slate-500">
                      {r.source}
                    </span>
                    <p className="mt-1 text-slate-700">{r.summary}</p>
                  </div>
                ))
              )}
            </CardBody>
          </Card>

          <OutreachTimeline events={timeline} />
        </div>

        <div className="space-y-6">
          <ProductFitPanel fit={account.productFit} />

          <Card>
            <CardHeader title="Key contacts" />
            <CardBody className="space-y-3">
              {account.contacts.map((c) => (
                <div
                  key={c.id}
                  className="rounded-lg border border-slate-100 p-3"
                >
                  <p className="font-medium text-slate-900">
                    {c.name}
                    {c.isPrimary && (
                      <Badge variant="info" className="ml-2">
                        Primary
                      </Badge>
                    )}
                  </p>
                  <p className="text-sm text-slate-500">{c.title}</p>
                  {c.email && (
                    <p className="mt-1 text-sm text-brand-600">{c.email}</p>
                  )}
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      <section>
        <SectionHeader
          title="Actions & approvals"
          description="Queued recommendations for this account — approve before anything is sent"
        />
        <div className="space-y-4">
          {actions.length === 0 ? (
            <Card>
              <CardBody>
                <p className="text-sm text-slate-500">
                  No queued actions. Agent suggests:{" "}
                  <span className="font-medium text-slate-700">
                    {agentPreview.action.title}
                  </span>
                </p>
              </CardBody>
            </Card>
          ) : (
            actions.map((a) => (
              <ActionQueueItem
                key={a.id}
                action={a}
                institutionName={account.name}
              />
            ))
          )}
        </div>
      </section>

      {drafts.length > 0 && (
        <Card>
          <CardHeader title="Outreach drafts" />
          <CardBody className="space-y-4">
            {drafts.map((d) => (
              <div key={d.id} className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase text-slate-500">
                  {d.channel} · {d.subject}
                </p>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-slate-700">
                  {d.body}
                </pre>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      {account.approvalHistory.length > 0 && (
        <Card>
          <CardHeader title="Your approval history" />
          <CardBody className="space-y-2">
            {account.approvalHistory.map((h) => (
              <div
                key={h.id}
                className="flex justify-between text-sm text-slate-600"
              >
                <span>
                  <span className="font-medium">{h.status}</span>
                  {h.reviewerNote && ` — ${h.reviewerNote}`}
                </span>
                <span className="text-slate-400">{formatDate(h.timestamp)}</span>
              </div>
            ))}
          </CardBody>
        </Card>
      )}
    </div>
  );
}
