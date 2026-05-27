"use client";

import { useState, type ReactNode } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Brain,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Copy,
  Database,
  Linkedin,
  Mail,
  Shield,
  Sparkles,
  User,
  UserCheck,
  Users,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CustomerJourneyStageDetail } from "@/lib/lifecycle/journey-stages";
import type {
  ActionPriority,
  ActivitySnippet,
  RiskCategory,
  SourceSystem,
  StageRecommendedAction,
  StageRiskBlocker,
} from "@/lib/lifecycle/journey-stage-types";
import { cn, formatDate } from "@/lib/utils";

const statusBadge = {
  completed: { variant: "success" as const, label: "Completed" },
  current: { variant: "info" as const, label: "Current stage" },
  upcoming: { variant: "muted" as const, label: "Upcoming" },
  at_risk: { variant: "danger" as const, label: "At risk" },
};

const priorityStyles: Record<
  ActionPriority,
  { badge: "danger" | "warning" | "muted"; label: string }
> = {
  high: { badge: "danger", label: "High" },
  medium: { badge: "warning", label: "Medium" },
  low: { badge: "muted", label: "Low" },
};

const sourceStyles: Record<SourceSystem, string> = {
  HubSpot: "bg-orange-50 text-orange-800 ring-orange-200",
  ClickUp: "bg-violet-50 text-violet-800 ring-violet-200",
  Gmail: "bg-red-50 text-red-800 ring-red-200",
  LinkedIn: "bg-sky-50 text-sky-800 ring-sky-200",
  Calendar: "bg-indigo-50 text-indigo-800 ring-indigo-200",
};

const riskMeta: Record<
  RiskCategory,
  { icon: typeof Users; label: string; accent: string }
> = {
  missing_stakeholders: {
    icon: Users,
    label: "Missing stakeholders",
    accent: "border-amber-200 bg-amber-50/80",
  },
  delayed_response: {
    icon: Clock,
    label: "Delayed response",
    accent: "border-orange-200 bg-orange-50/80",
  },
  security_concerns: {
    icon: Shield,
    label: "Security concerns",
    accent: "border-red-200 bg-red-50/80",
  },
  duplicate_risk: {
    icon: Copy,
    label: "Duplicate risk",
    accent: "border-rose-200 bg-rose-50/80",
  },
  other: {
    icon: AlertTriangle,
    label: "Other blocker",
    accent: "border-slate-200 bg-slate-50",
  },
};

export function LifecycleStagePanel({
  stage,
}: {
  stage: CustomerJourneyStageDetail;
}) {
  const badge = statusBadge[stage.status];
  const [checkedActions, setCheckedActions] = useState<Set<string>>(new Set());

  const toggleAction = (id: string) => {
    setCheckedActions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
              Stage detail
            </p>
            <h3 className="mt-1 text-xl font-semibold text-slate-900">
              {stage.label}
            </h3>
            <p className="mt-1.5 max-w-2xl text-xs text-slate-500">
              Executive view — mock intelligence from connected systems. Does
              not replace HubSpot, ClickUp, or Gmail.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info">{stage.responsibleOwner}</Badge>
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {stage.sourceBadges.map((system) => (
            <SourceBadge key={system} system={system} />
          ))}
        </div>
      </header>

      <div className="space-y-5 p-6">
        <div className="rounded-lg border border-brand-200 bg-brand-50/50 px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-800">
            <UserCheck className="h-3.5 w-3.5" />
            Next recommended owner action
          </div>
          <p className="mt-1.5 text-sm font-medium text-slate-900">
            {stage.nextOwnerAction}
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Accountable: {stage.responsibleOwner} · Assigned: {stage.owner} (
            {stage.ownerRole})
          </p>
        </div>

        <SectionCard>
          <SectionTitle icon={Sparkles} title="Current status" />
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {stage.summary}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm">
            <User className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="font-medium text-slate-900">{stage.owner}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600">{stage.ownerRole}</span>
            {stage.completedAt && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">
                  Completed {formatDate(stage.completedAt)}
                </span>
              </>
            )}
          </div>
        </SectionCard>

        <AiInsightsCard insight={stage.aiInsight} />

        <ActionsCard
          actions={stage.recommendedActions}
          checked={checkedActions}
          onToggle={toggleAction}
        />

        <RisksCard risks={stage.risks} />

        <RelatedActivityCard activity={stage.relatedActivity} />

        <SectionCard>
          <SectionTitle icon={Database} title="Source system references" />
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {stage.sourceReferences.map((ref, i) => (
              <li
                key={i}
                className="rounded-lg border border-slate-100 bg-slate-50/50 p-4"
              >
                <SourceBadge system={ref.system} />
                <p className="mt-2 text-sm font-medium text-slate-800">
                  {ref.reference}
                </p>
                <p className="mt-1 text-xs text-slate-500">{ref.note}</p>
                {ref.lastSynced && (
                  <p className="mt-2 text-xs text-slate-400">
                    Last synced {formatDate(ref.lastSynced)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard>
          <SectionTitle icon={Video} title="Meeting summaries" />
          {stage.meetingSummaries.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              No meetings logged for this stage yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {stage.meetingSummaries.map((m, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-slate-900">{m.title}</p>
                    <SourceBadge system={m.source} />
                  </div>
                  {(m.date || m.attendees) && (
                    <p className="mt-1 text-xs text-slate-500">
                      {m.date && formatDate(m.date)}
                      {m.date && m.attendees && " · "}
                      {m.attendees}
                    </p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {m.summary}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {stage.activityHistory.length > 0 && (
          <SectionCard>
            <SectionTitle icon={Calendar} title="Activity history" />
            <ul className="mt-4 space-y-3 border-l-2 border-brand-100 pl-4">
              {stage.activityHistory.map((a, i) => (
                <li key={i} className="relative text-sm">
                  <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-400 ring-1 ring-brand-200" />
                  <span className="text-xs text-slate-400">
                    {formatDate(a.timestamp)}
                    {a.source && (
                      <>
                        {" · "}
                        <span className="text-slate-500">{a.source}</span>
                      </>
                    )}
                  </span>
                  <p className="mt-0.5 text-slate-700">
                    {a.event}
                    {a.actor && (
                      <span className="text-slate-400"> · {a.actor}</span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}
      </div>
    </div>
  );
}

function AiInsightsCard({
  insight,
}: {
  insight: CustomerJourneyStageDetail["aiInsight"];
}) {
  const scoreColor =
    insight.confidenceScore >= 85
      ? "bg-emerald-500"
      : insight.confidenceScore >= 70
        ? "bg-brand-500"
        : "bg-amber-500";

  return (
    <SectionCard className="border-brand-100 bg-gradient-to-br from-brand-50/40 to-white">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SectionTitle icon={Brain} title="AI insights" />
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <span className="text-xs font-medium text-slate-500">Confidence</span>
          <span className="text-sm font-bold text-slate-900">
            {insight.confidenceScore}%
          </span>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full transition-all", scoreColor)}
          style={{ width: `${insight.confidenceScore}%` }}
        />
      </div>

      <div className="mt-5 space-y-4">
        <div className="rounded-lg border border-brand-100/80 bg-white/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Why this stage matters
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {insight.whyItMatters}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Signals detected
          </p>
          <ul className="mt-2 space-y-2">
            {insight.signalsDetected.map((signal, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-700"
              >
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

function ActionsCard({
  actions,
  checked,
  onToggle,
}: {
  actions: StageRecommendedAction[];
  checked: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <SectionCard>
      <SectionTitle icon={CheckCircle2} title="Recommended next actions" />
      {actions.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No actions for this stage.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {actions.map((action) => {
            const done = checked.has(action.id);
            const pri = priorityStyles[action.priority];
            return (
              <li key={action.id}>
                <button
                  type="button"
                  onClick={() => onToggle(action.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                    done
                      ? "border-emerald-200 bg-emerald-50/50"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50"
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  ) : (
                    <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" />
                  )}
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      done ? "text-slate-500 line-through" : "text-slate-800"
                    )}
                  >
                    {action.label}
                  </span>
                  <Badge variant={pri.badge}>{pri.label}</Badge>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </SectionCard>
  );
}

function RisksCard({ risks }: { risks: StageRiskBlocker[] }) {
  return (
    <SectionCard>
      <SectionTitle icon={AlertCircle} title="Risks & blockers" />
      {risks.length === 0 ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          No active risks flagged for this stage.
        </p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {risks.map((risk, i) => (
            <RiskItem key={i} risk={risk} />
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

function RiskItem({ risk }: { risk: StageRiskBlocker }) {
  const meta = riskMeta[risk.category];
  const Icon = meta.icon;
  const pri = priorityStyles[risk.severity];

  return (
    <li
      className={cn(
        "rounded-lg border p-4",
        meta.accent
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-slate-600" />
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            {meta.label}
          </span>
        </div>
        <Badge variant={pri.badge}>{pri.label}</Badge>
      </div>
      <p className="mt-2 text-sm font-medium text-slate-900">{risk.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">
        {risk.description}
      </p>
    </li>
  );
}

function RelatedActivityCard({
  activity,
}: {
  activity: CustomerJourneyStageDetail["relatedActivity"];
}) {
  const items: {
    key: string;
    label: string;
    icon: typeof Video;
    data?: ActivitySnippet;
  }[] = [
    { key: "meeting", label: "Last meeting", icon: Video, data: activity.lastMeeting },
    { key: "email", label: "Last email", icon: Mail, data: activity.lastEmail },
    {
      key: "linkedin",
      label: "Last LinkedIn",
      icon: Linkedin,
      data: activity.lastLinkedIn,
    },
    {
      key: "crm",
      label: "Last CRM update",
      icon: Database,
      data: activity.lastCrmUpdate,
    },
  ];

  return (
    <SectionCard>
      <SectionTitle icon={Clock} title="Related activity" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map(({ key, label, icon: Icon, data }) => (
          <div
            key={key}
            className={cn(
              "rounded-lg border p-4",
              data
                ? "border-slate-100 bg-white shadow-sm"
                : "border-dashed border-slate-200 bg-slate-50/50"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
              {data && <SourceBadge system={data.source} compact />}
            </div>
            {data ? (
              <>
                {data.date && (
                  <p className="mt-2 text-xs text-slate-400">
                    {formatDate(data.date)}
                  </p>
                )}
                <p className="mt-1 text-sm leading-relaxed text-slate-700">
                  {data.summary}
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-slate-400">No activity recorded</p>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function SourceBadge({
  system,
  compact,
}: {
  system: SourceSystem;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium ring-1",
        sourceStyles[system],
        compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs"
      )}
    >
      {system}
    </span>
  );
}

function SectionCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-5",
        className
      )}
    >
      {children}
    </section>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: typeof Brain;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
        <Icon className="h-4 w-4 text-slate-600" />
      </span>
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
    </div>
  );
}
