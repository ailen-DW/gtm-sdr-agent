"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { TodayPriorities } from "@/components/dashboard/today-priorities";
import { AccountsAttentionKpi } from "@/components/dashboard/accounts-attention-kpi";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { AccountCard } from "@/components/accounts/account-card";
import { ActionQueueItem } from "@/components/actions/action-queue-item";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/hooks/use-app-store";
import { getDashboardMetrics } from "@/lib/mock-data";
import { MOCK_MARKETING_INSIGHTS } from "@/lib/store/app-store";

export function DashboardView() {
  const { accounts, actions } = useAppStore();
  const metrics = getDashboardMetrics(accounts, actions);
  const pendingActions = actions.filter((a) => a.approvalStatus === "pending");
  const followUps = accounts.filter((a) => a.followUpDue);
  const duplicates = accounts.filter(
    (a) => a.duplicateRisk && a.duplicateRisk.severity !== "low"
  );
  const upsells = accounts.filter(
    (a) =>
      a.lifecycleStatus === "expansion_opportunity" ||
      a.crmRelationship === "expansion_candidate"
  );
  const reviewAccounts = accounts.filter(
    (a) =>
      a.lifecycleStatus === "needs_human_review" ||
      a.duplicateRisk?.severity === "high"
  );
  const recentProspects = accounts.filter((a) =>
    ["ready_for_outreach", "new_prospect", "researching"].includes(
      a.lifecycleStatus
    )
  );

  return (
    <>
      <PageHeader
        title="Pipeline Dashboard"
        description="Your command center for prospecting, approvals, and customer journey visibility. The AI recommends — you decide."
        action={
          <Link href="/action-queue">
            <Button>
              Approval queue ({pendingActions.length})
            </Button>
          </Link>
        }
      />

      <div className="mb-6 rounded-lg border border-brand-100 bg-brand-50/40 px-4 py-3 text-sm text-slate-700">
        <span className="font-medium text-brand-800">Human-in-the-loop:</span>{" "}
        No emails or CRM updates are sent without your explicit approval.
      </div>

      <TodayPriorities
        pendingCount={pendingActions.length}
        followUps={followUps}
        duplicates={duplicates}
        upsells={upsells}
      />

      <AccountsAttentionKpi count={metrics.accountsRequiringAttention} />

      <SectionHeader
        title="Pipeline snapshot"
        description="Counts across your book of business"
      />
      <MetricCards data={metrics} />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <SectionHeader
            title="Awaiting your approval"
            action={
              <Link
                href="/action-queue"
                className="text-sm text-brand-600 hover:underline"
              >
                Open queue
              </Link>
            }
          />
          <div className="space-y-4">
            {pendingActions.length === 0 ? (
              <Card>
                <CardBody>
                  <p className="text-sm text-slate-500">
                    Queue is clear — no pending decisions.
                  </p>
                </CardBody>
              </Card>
            ) : (
              pendingActions.slice(0, 2).map((action) => {
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
        </section>

        <section>
          <SectionHeader
            title="Needs review"
            description="Conflicts and prospects flagged for human judgment"
            action={
              <Link
                href="/accounts?filter=review"
                className="text-sm text-brand-600 hover:underline"
              >
                View all
              </Link>
            }
          />
          <div className="space-y-3">
            {reviewAccounts.length === 0 ? (
              <Card>
                <CardBody>
                  <p className="text-sm text-slate-500">Nothing flagged.</p>
                </CardBody>
              </Card>
            ) : (
              reviewAccounts.slice(0, 3).map((a) => (
                <AccountCard key={a.id} account={a} />
              ))
            )}
          </div>
        </section>
      </div>

      <section className="mt-10">
        <SectionHeader
          title="Ready for outreach"
          action={
            <Link
              href="/prospect-discovery"
              className="text-sm text-brand-600 hover:underline"
            >
              Discover prospects
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {recentProspects.length === 0 ? (
            <Card>
              <CardBody>
                <p className="text-sm text-slate-500">No prospects in this stage.</p>
              </CardBody>
            </Card>
          ) : (
            recentProspects.map((a) => <AccountCard key={a.id} account={a} />)
          )}
        </div>
      </section>

      <section className="mt-10">
        <Card>
          <CardHeader
            title="Marketing signals"
            description="Patterns from the field — inform campaigns and messaging"
          />
          <CardBody>
            <ul className="space-y-2">
              {MOCK_MARKETING_INSIGHTS.slice(0, 3).map((insight) => (
                <li key={insight.id} className="text-sm text-slate-600">
                  <span className="font-medium text-slate-900">
                    {insight.title}
                  </span>
                  <span className="text-slate-400">
                    {" "}
                    · {insight.frequency} mentions
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/marketing-insights"
              className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline"
            >
              Marketing insights →
            </Link>
          </CardBody>
        </Card>
      </section>
    </>
  );
}
