import { Brain, CheckCircle2, HelpCircle, Shield, Sparkles } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AgentInsight } from "@/lib/types";

const confidenceVariant = {
  high: "success",
  medium: "warning",
  low: "muted",
} as const;

export function AIReasoningCard({
  insight,
  compact = false,
}: {
  insight: AgentInsight;
  compact?: boolean;
}) {
  const sections = [
    {
      key: "found",
      icon: Sparkles,
      title: "What the agent found",
      items: insight.whatWeFound,
      color: "text-brand-600",
    },
    {
      key: "matters",
      icon: HelpCircle,
      title: "Why it matters",
      items: insight.whyItMatters,
      color: "text-slate-600",
    },
    {
      key: "action",
      icon: Brain,
      title: "Recommended action",
      items: [insight.recommendedAction],
      color: "text-slate-800",
    },
    {
      key: "approval",
      icon: Shield,
      title: "Requires your approval",
      items: insight.humanApprovalRequired,
      color: "text-amber-800",
    },
  ];

  if (compact) {
    return (
      <div className="rounded-lg border border-brand-100 bg-gradient-to-br from-brand-50/80 to-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Brain className="h-4 w-4 text-brand-600" />
            AI copilot reasoning
          </span>
          <Badge variant={confidenceVariant[insight.confidence]}>
            {insight.confidence} confidence
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {sections.map((s) => (
            <div key={s.key}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {s.title}
              </p>
              <ul className="mt-1 space-y-1">
                {s.items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="border-brand-100 bg-gradient-to-br from-brand-50/30 to-white">
      <CardHeader
        title="AI copilot reasoning"
        description="Strategic recommendations — you stay in control of every outbound action."
        action={
          <Badge variant={confidenceVariant[insight.confidence]}>
            {insight.confidence} confidence
          </Badge>
        }
      />
      <CardBody className="space-y-5">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.key} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
                <Icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {s.title}
                </p>
                <ul className="mt-1.5 space-y-1.5">
                  {s.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm leading-relaxed text-slate-700"
                    >
                      {s.key === "approval" && (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                      )}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
