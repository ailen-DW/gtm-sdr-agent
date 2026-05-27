"use client";

import { useState, type ReactNode } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Copy,
  FileText,
  Link2,
  ListTodo,
  Mail,
  Shield,
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
  OperationalTask,
  RiskCategory,
  SourceSystem,
  StageRiskBlocker,
} from "@/lib/lifecycle/journey-stage-types";
import { cn, formatDate } from "@/lib/utils";

const statusBadge = {
  completed: { variant: "success" as const, label: "Completed" },
  current: { variant: "info" as const, label: "Current stage" },
  upcoming: { variant: "muted" as const, label: "Upcoming" },
  at_risk: { variant: "danger" as const, label: "At risk" },
};

const taskStatusLabel = {
  pending: "Pending",
  in_progress: "In progress",
  done: "Done",
};

const sourceStyles: Record<SourceSystem, string> = {
  HubSpot: "bg-orange-50 text-orange-800 ring-orange-200",
  ClickUp: "bg-violet-50 text-violet-800 ring-violet-200",
  Gmail: "bg-red-50 text-red-800 ring-red-200",
  LinkedIn: "bg-sky-50 text-sky-800 ring-sky-200",
  Calendar: "bg-indigo-50 text-indigo-800 ring-indigo-200",
  Basecamp: "bg-lime-50 text-lime-900 ring-lime-200",
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
  embedded = false,
}: {
  stage: CustomerJourneyStageDetail;
  /** Render inside timeline column — no outer chrome */
  embedded?: boolean;
}) {
  const badge = statusBadge[stage.status];
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  const linkedSystems = Array.from(
    new Set([
      ...stage.sourceBadges,
      ...stage.sourceReferences.map((r) => r.system),
      ...stage.relatedDocuments.map((d) => d.system),
    ])
  );

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const shellClass = embedded
    ? ""
    : "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm";

  return (
    <div className={shellClass}>
      <header
        className={cn(
          "border-b border-slate-100 px-3 py-2.5",
          embedded ? "bg-white" : "bg-gradient-to-r from-slate-50 to-white px-4 py-3"
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{stage.label}</h3>
            <p className="text-xs text-slate-600">
              Owner: {stage.responsibleOwner} · {stage.owner}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="info" className="text-[10px]">
              {stage.responsibleOwner}
            </Badge>
            <Badge variant={badge.variant} className="text-[10px]">
              {badge.label}
            </Badge>
          </div>
        </div>
      </header>

      <div className="space-y-3 p-3">
        <div className="rounded-md border border-brand-200 bg-brand-50/40 px-3 py-2">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-brand-800">
            <UserCheck className="h-3 w-3" />
            Next recommended action
          </div>
          <p className="mt-1 text-sm font-medium text-slate-900">
            {stage.nextOwnerAction}
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <SectionCard>
            <SectionTitle icon={User} title="Current status" />
            <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
              {stage.summary}
            </p>
            {stage.completedAt && (
              <p className="mt-1 text-[10px] text-slate-500">
                Completed {formatDate(stage.completedAt)}
              </p>
            )}
          </SectionCard>

          <SectionCard>
            <SectionTitle icon={Mail} title="Pending client actions" />
            <ul className="mt-1.5 space-y-1">
              {stage.pendingClientActions.map((item, i) => (
                <li key={i} className="text-xs text-slate-700 before:mr-1 before:content-['•']">
                  {item}
                </li>
              ))}
            </ul>
          </SectionCard>

          <div className="lg:col-span-2">
            <InternalTasksCard
              tasks={stage.internalTasks}
              checked={checkedTasks}
              onToggle={toggleTask}
            />
          </div>

          <div className="lg:col-span-2">
            <RisksCard risks={stage.risks} />
          </div>

          <SectionCard className="lg:col-span-2">
            <SectionTitle icon={Video} title="Meeting summaries" />
            {stage.meetingSummaries.length === 0 ? (
              <p className="mt-1 text-xs text-slate-500">No meetings for this stage.</p>
            ) : (
              <ul className="mt-1.5 grid gap-2 sm:grid-cols-2">
                {stage.meetingSummaries.map((m, i) => (
                  <li
                    key={i}
                    className="rounded-md border border-slate-100 bg-slate-50/50 p-2"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-medium text-slate-900">{m.title}</p>
                      <SourceBadge system={m.source} compact />
                    </div>
                    {(m.date || m.attendees) && (
                      <p className="text-[10px] text-slate-500">
                        {m.date && formatDate(m.date)}
                        {m.attendees && ` · ${m.attendees}`}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-slate-600 line-clamp-3">{m.summary}</p>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard>
            <SectionTitle icon={Link2} title="Linked systems" />
            <div className="mt-1.5 flex flex-wrap gap-1">
              {linkedSystems.map((system) => (
                <SourceBadge key={system} system={system} compact />
              ))}
            </div>
            <ul className="mt-2 space-y-1.5">
              {stage.sourceReferences.map((ref, i) => (
                <li key={`ref-${i}`} className="text-xs">
                  <span className="font-medium text-slate-800">{ref.reference}</span>
                  <span className="text-slate-500"> · {ref.system}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard>
            <SectionTitle icon={FileText} title="Documents & references" />
            <ul className="mt-1.5 space-y-1">
              {stage.relatedDocuments.map((doc, i) => (
                <li key={i} className="text-xs text-slate-700">
                  <span className="font-medium">{doc.title}</span>
                  <span className="text-slate-500">
                    {" "}
                    · {doc.system} · {doc.reference}
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <div className="lg:col-span-2">
            <RelatedActivityCard activity={stage.relatedActivity} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InternalTasksCard({
  tasks,
  checked,
  onToggle,
}: {
  tasks: OperationalTask[];
  checked: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <SectionCard>
      <SectionTitle icon={ListTodo} title="Internal tasks" />
      <ul className="mt-1.5 space-y-1">
        {tasks.map((task) => {
          const done = checked.has(task.id) || task.status === "done";
          return (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => onToggle(task.id)}
                className={cn(
                  "flex w-full items-start gap-2 rounded-md border px-2 py-1.5 text-left transition-colors",
                  done
                    ? "border-emerald-200 bg-emerald-50/40"
                    : "border-slate-100 bg-white hover:bg-slate-50/50"
                )}
              >
                {done ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                )}
                <span
                  className={cn(
                    "flex-1 text-sm",
                    done ? "text-slate-500 line-through" : "text-slate-800"
                  )}
                >
                  {task.label}
                  {task.assignee && (
                    <span className="text-slate-400"> · {task.assignee}</span>
                  )}
                </span>
                <Badge
                  variant={
                    task.status === "done"
                      ? "success"
                      : task.status === "in_progress"
                        ? "info"
                        : "muted"
                  }
                >
                  {taskStatusLabel[task.status]}
                </Badge>
              </button>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}

function RisksCard({ risks }: { risks: StageRiskBlocker[] }) {
  return (
    <SectionCard>
      <SectionTitle icon={AlertCircle} title="Risks & blockers" />
      {risks.length === 0 ? (
        <p className="mt-2 flex items-center gap-2 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          No active risks for this stage.
        </p>
      ) : (
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
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
  const severityVariant: Record<ActionPriority, "danger" | "warning" | "muted"> = {
    high: "danger",
    medium: "warning",
    low: "muted",
  };

  return (
    <li className={cn("rounded-md border p-2", meta.accent)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-slate-600" />
          <span className="text-xs font-semibold uppercase text-slate-600">
            {meta.label}
          </span>
        </div>
        <Badge variant={severityVariant[risk.severity]}>{risk.severity}</Badge>
      </div>
      <p className="mt-1.5 text-sm font-medium text-slate-900">{risk.title}</p>
      <p className="mt-0.5 text-sm text-slate-600">{risk.description}</p>
    </li>
  );
}

function RelatedActivityCard({
  activity,
}: {
  activity: CustomerJourneyStageDetail["relatedActivity"];
}) {
  const items: { label: string; icon: typeof Video; data?: ActivitySnippet }[] = [
    { label: "Last meeting", icon: Video, data: activity.lastMeeting },
    { label: "Last email", icon: Mail, data: activity.lastEmail },
    { label: "Last CRM update", icon: Calendar, data: activity.lastCrmUpdate },
  ];

  return (
    <SectionCard>
      <SectionTitle icon={Clock} title="Recent activity" />
      <div className="mt-1.5 grid grid-cols-3 gap-2 text-[10px]">
        {items.map(({ label, data }) => (
          <div
            key={label}
            className={cn(
              "rounded border px-2 py-1.5",
              data ? "border-slate-100 bg-slate-50/50" : "border-dashed border-slate-200"
            )}
          >
            <p className="font-medium text-slate-500">{label}</p>
            {data ? (
              <>
                {data.date && (
                  <p className="text-slate-400">{formatDate(data.date)}</p>
                )}
                <p className="mt-0.5 line-clamp-2 text-slate-700">{data.summary}</p>
              </>
            ) : (
              <p className="text-slate-400">—</p>
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
        "rounded-md border border-slate-200 bg-white p-2.5",
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
  icon: typeof User;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-slate-500" />
      <h4 className="text-xs font-semibold text-slate-900">{title}</h4>
    </div>
  );
}
